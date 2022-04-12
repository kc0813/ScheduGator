from typing import List
from scheduAlgoClasses import Schedule, Section, Course
import copy as c


"""
    courses: list of all courses to be put into the schedule
    reservedTimes:  list of all time slots ["day", "period"],
                    that should be put in the static schedule
"""


def buildSchedules(courses: List[Course], reservedTimes: list):

    # 2D array for schedule, doesn't account for online classes
    rows = 14
    # columns = 6
    schedule = {
        "M": ["" for i in range(rows)],
        "T": ["" for i in range(rows)],
        "W": ["" for i in range(rows)],
        "R": ["" for i in range(rows)],
        "F": ["" for i in range(rows)],
        "S": ["" for i in range(rows)],
        "ONLINE": [],
    }
    template = Schedule(schedule)

    # 1) build static schedule

    # add reserved timeslots - assume list of pairs w/ correct indices?
    reserved = Section("reserved", reservedTimes)
    try:
        template.addSection(reserved)
    except RuntimeError as err:  # conflict with static times means impossible schedule
        print(err)
        return None

    # find static meeting periods and add to schedule?
    try:
        buildStaticSchedule(template, courses)
    except RuntimeError as err:
        print(err)
        return None

    # find sections that conflict with the static schedule and remove them
    delStaticConflict(template, courses)

    # 2) build dynamic schedule
    samples = dynamicScheduleBuilder(template, courses, 0)
    if samples == []:
        samples = None

    return samples


def buildStaticSchedule(template: Schedule, courses: List[Course]) -> Schedule:
    for course in courses:
        hasStaticSection = course.staticMeetSection != []
        hasOnlyOnline = course.hasOnlineSection and len(course.sections) == 1

        if hasStaticSection or hasOnlyOnline:
            toAdd = course.sections[0] if hasOnlyOnline else course.staticMeetSection

            try:
                template.addSection(toAdd, course.code)
            except RuntimeError as err:  # conflict with static times means impossible schedule
                print(err)
                return Schedule()

    return template


def delStaticConflict(staticSchedule: Schedule, courses: List[Course]):
    """
    Checks if a section conflicts with the static schedule
    Removes all sections that conflict with the static schedules
    """
    for course in courses:
        for section in course.sections:
            if staticSchedule.conflict(section):
                course.sections.remove(section)

    return courses


"""
    schedule: current schedule that's being worked on.
              Starts as static template at the very top level
    courses: list of all courses to be included in the schedule
    index: the level/course currently being added
    Return: list of all possible sample schedules
"""
# TODO account for online classes
# TODO actually test that this works


def dynamicScheduleBuilder(
    schedule: Schedule, courses: List[Course], index=0
) -> List[Schedule]:

    """
    Recursively build a schedule by "jumping into" the courses and adding a section from each course
    Makes a copy of the template and then tries to add a section to the copy
    If there are more courses to consider, call this function again, but with the new copy+section
    After making a schedule, jump back a up level and then consider another section from that course
    """
    samples = []
    nextSchedule = Schedule()
    # TODO if there's an online class, remove it's static section if it has one,
    # then add the online and continue
    for section in courses[index].sections:
        nextSchedule = c.deepcopy(schedule)
        #DOES THIS WORK THE WAY I WANT IT TO FOR ONLINE CLASSES?
        try:
            nextSchedule.addSection(section, courses[index].code)
        except RuntimeError:
            continue  # if we run into a temp. conflict, skip this section and move on

        # If it's not the last course to be added, go down a level
        # Else, it's a complete schedule, add it to samples[]
        if index < len(courses) - 1:
            samples += dynamicScheduleBuilder(
                c.deepcopy(nextSchedule), courses, index + 1
            )  # Call the function to add the sections of the next course ("the next level down")
        else:
            samples.append(c.deepcopy(nextSchedule))

    return samples
