from typing import List
from scheduAlgoClasses import Schedule, Section, Course
import copy as c
from enum import IntEnum

# TODO add try catches for all possible places an error could be thrown
"""
    courses: list of all courses to be put into the schedule
    reservedTimes:  list of all time slots that should be put in the static schedule
                    list[("day", period), ...]
"""


def wrapCourses(func) -> List[Course]:
    """
    Wraps the function
    and converts courses to a list of course objects
    """

    class PERIOD(IntEnum):
        """
        Enum for periods
        """

        E1 = 12
        E2 = 13
        E3 = 14

    def wrapper(*args, **kwargs):
        # wraps courses and sections in Course objects
        if len(args[0]) > 0 and type(args[0][0]) is Course:
            return func(args[0], *args[1:], **kwargs)

        wrappedCourses = []
        for course in args[0]:
            sections = []
            for sectDict in course["sections"]:
                meetTimes = []
                for meeting in sectDict["meetTimes"]:
                    meetStart = meeting["meetPeriodBegin"]
                    if meetStart[0] == "E":
                        meetStart = PERIOD[meetStart]
                    else:
                        meetStart = int(meetStart)
                    meetEnd = meeting["meetPeriodEnd"]
                    if meetEnd[0] == "E":
                        meetEnd = PERIOD[meetEnd]
                    else:
                        meetEnd = int(meetEnd)
                    periods = [i for i in range(meetStart, meetEnd + 1)]
                    for meetDay in meeting["meetDays"]:
                        for period in periods:
                            meetTimes.append((meetDay, period))
                try:
                    sections.append(Section(sectDict["classNumber"], meetTimes))
                except KeyError:
                    # throw an error if the section is missing a key
                    raise KeyError(
                        "list of sections in courses is formatted incorrectly"
                    )
            try:
                wrappedCourses.append(
                    Course(
                        code=course["code"],
                        name=course["name"],
                        sections=sections,
                    )
                )
            except KeyError:
                # throw an error if the course is missing a key
                raise KeyError("list of courses is formatted incorrectly")

        timeSlots = []
        if len(args[1]) > 0:
            for slot in args[1]:
                timeSlots.append((slot["day"], slot["period"] + 1))
        return func(wrappedCourses, timeSlots, *args[2:], **kwargs)

    return wrapper


@wrapCourses
def buildSchedules(courses: list, reservedTimes: list) -> List[Schedule]:
    """
    Builds a static schedule of times the user has reserved and
    class times that cannot be changed between sample schedules.
    This is used as a template for all sample schedules

    Combs through and removes all sections that conflict with the static schedule.

    Recursively brute force to find all valid combinations of sections for a sample schedule.
    """
    if len(courses) == 0:
        return []

    template = Schedule()
    # 1) build static schedule

    # Add reserved timeslots
    if len(reservedTimes) > 0:
        try:
            template.addSection(Section("reserved", reservedTimes), "reserved")
        except RuntimeError:
            # conflict with static times means impossible schedule
            # May need a more proper response to handle this error
            # print(err)
            return []

    # Add static meeting times of courses
    try:
        buildStaticSchedule(template, courses)
    except RuntimeError:
        # conflict with static times means impossible schedule
        # May need a more proper response to handle this error
        # print(err)
        return []

    # Find sections that conflict with the static schedule and remove them
    delStaticConflict(template, courses)

    # 2) build dynamic schedule
    samples: List[Schedule] = [template]
    if len(courses) != 0:
        samples = dynamicScheduleBuilder(template, courses, 0)

    return samples


"""
    template: The empty starting template of a schedule
    courses: List of all courses to be added to the schedule
"""


def buildStaticSchedule(template: Schedule, courses: List[Course]) -> Schedule:
    """
    Builds the static schedules that's used as a template for all sample schedules

    Runs through all courses
    Checks if a course has a static meet time or has only an online section

    If it does, then add it to the static schedule
    If there's ever a conflict, it's impossible to make a schedule, so return an empty default
    """
    # tentative
    courseIndex = []
    index = 0
    for course in courses:
        hasStaticSection = course.staticMeetSection.meetings != []
        hasOnlyOne = len(course.sections) == 1

        if hasOnlyOne:
            courseIndex.append(index)

        # overlap in coverage with hasStaticSection,
        # but hasOnlyOne covers a course that has only an online section
        if hasStaticSection or hasOnlyOne:
            toAdd = course.staticMeetSection

            try:
                template.addSection(toAdd, course.code)
            except RuntimeError as err:
                # conflict with static times means impossible schedule
                # print(err)
                raise err

        index += 1

    offset = 0
    for index in courseIndex:
        courses.remove(courses[index - offset])
        offset += 1
    return template


"""
    staticSchedule: The static template for all sample schedules
    courses: list of all courses to be added to the schedule
"""


def delStaticConflict(staticSchedule: Schedule, courses: List[Course]):
    """
    Checks if a section conflicts with the static schedule
    Removes all sections that conflict with the static schedules
    """
    for course in courses:
        for section in course.sections:
            if staticSchedule.conflict(section):
                try:
                    course.sections.remove(section)
                except Exception:
                    # here just in case, shouldn't ever get to the point where it throws one
                    pass

    return courses


"""
    schedule: current schedule that's being worked on.
              Starts as a static template at the very top level
    courses: list of all courses to be included in the schedule
    index: the level/course currently being added, starts with index = 0 at the top level
"""


def dynamicScheduleBuilder(
    schedule: Schedule, courses: List[Course], index=0
) -> List[Schedule]:

    """
    Returns a list of all possible sample schedules

    Recursively build a schedule by "jumping into" the courses and adding a section from each course
    Makes a copy of the template and then tries to add a section to the copy

    If there are more courses to consider, call this function again,
    but with the new section added to the schedule
    After making a schedule, jump back a up level and then consider another section from that course
    """
    samples = []
    nextSchedule = Schedule()

    if len(courses[index].sections) == 0 and index < len(courses) - 1:
        samples += dynamicScheduleBuilder(c.deepcopy(schedule), courses, index + 1)
    else:
        # for all sections in this course
        for section in courses[index].sections:

            nextSchedule = c.deepcopy(schedule)
            # try to add a section
            try:
                nextSchedule.addSection(section, courses[index].code)
            except RuntimeError:
                # if we run into a conflict, skip this section and move on
                # (conflict could be temporary, ie. with a section that's not static)
                # print(re)
                continue

            # If it's not the last course to be added, go down a level
            # (last level is at index = len(courses) - 1)
            # Else, it's a complete schedule, add it to samples[]
            if index < len(courses) - 1:
                samples += dynamicScheduleBuilder(
                    c.deepcopy(nextSchedule), courses, index + 1
                )
            else:
                samples.append(c.deepcopy(nextSchedule))

    return samples
