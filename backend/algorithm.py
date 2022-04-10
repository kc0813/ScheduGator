from scheduAlgoClasses import Schedule, Section, Course
import copy as c

"""
    courses: list of all courses to be put into the schedule
    reservedTimes:  list of all time slots ["day", "period"],
                    that should be put in the static schedule
"""


def buildSchedules(courses: list[Course], reservedTimes: list):

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
        "Online": [],
    }
    template = Schedule(schedule)
    reserved = Section("reserved", reservedTimes)
    # build static schedule
    # add reserved timeslots - assume list of pairs w/ correct indices?
    try:
        template.addSection(reserved)
    except RuntimeError as err:  # conflict with static times means impossible schedule
        print(err)
        return None

    # find static meeting periods and add to schedule?
    for course in courses:
        if course.staticMeetTime != []:
            try:
                template.addSection(course.staticMeetTime)
            except RuntimeError as err:  # conflict with static times means impossible schedule
                print(err)
                return None

    # find sections that conflict with the static schedule and remove them

    # build dynamic schedule
    samples = dynamicScheduleBuilder(template, courses, 0)
    if samples == []:
        samples = None

    return samples


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
    schedule: Schedule, courses: list[Course], index=0
) -> list[Schedule]:

    """
    Recursively runs through each section in a course at courses[index]
    Makes a copy of the template and then tries to add a section to the copy
    If there are more courses to consider, call this function again, but with the new copy+section
    After making a schedule, jump back a up level and then consider another section from that course
    """
    samples = []
    nextSchedule = Schedule()

    for section in courses[index].sections:
        nextSchedule = c.deepcopy(schedule)
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
