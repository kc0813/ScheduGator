from scheduAlgoClasses import Schedule, Section, Course

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

    return samples


"""
    schedule: current schedule that's being worked on.
              Starts as static template at the very top level
    courses: list of all courses to be included in the schedule
    index: the level/course currently being added
    Returns: list of all possiblesample schedules
"""
# TODO account for online classes
# TODO actually test that this works


def dynamicScheduleBuilder(
    schedule: Schedule, courses: list[Course], index = 0
) -> list[Schedule]:

    samples = []
    for section in courses[index].sections:
        try:
            schedule.addSection(section, courses[index].code)
        except RuntimeError:  # what to do if there's a temporary conflict? Nothing?
            pass

        if index < len(courses) - 1:
            samples += dynamicScheduleBuilder(schedule, courses, index + 1)
        else:
            samples.append(schedule)
   
 
    return samples


