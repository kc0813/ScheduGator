from scheduAlgoClasses import Schedule, Section, Course

"""
    courses: list of all courses to be put into the schedule
    reservedTimes: list of all time slots ["day", "period"], that should be put in the static schedule       
"""
def buildSchedule(courses: list, reservedTimes: list):

    # 2D array for schedule, doesn't account for online classes
    rows = 14
    columns = 6
    schedule = {
        "M": ["" for i in range(rows)],
        "T": ["" for i in range(rows)],
        "W": ["" for i in range(rows)],
        "R": ["" for i in range(rows)],
        "F": ["" for i in range(rows)],
        "S": ["" for i in range(rows)],
    }
    template = Schedule(schedule)
    reserved = Section("reserved", reservedTimes)
    # build static schedule
    # add reserved timeslots - assume list of pairs w/ correct indices?
    try:
        template.addSection(reserved)
    except RuntimeError as err: #conflict with static times means impossible schedule
        print(err)
        return None

    # find static meeting periods and add to schedule?
    for course in courses:
        if course.staticMeetTime != []:
            try:
                template.addSection(course.staticMeetTime)
            except RuntimeError as err: #conflict with static times means impossible schedule
                print(err)
                return None
     
    # build dynamic schedule


    return schedule

