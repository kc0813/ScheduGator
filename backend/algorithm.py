from scheduAlgoClasses import findStaticMeetTime

def buildSchedule(sections, meetDict, reservedTimes):
    # 2D array for schedule, doesn't account for online classes
    rows = 14
    columns = 6
    schedule = [["" for i in range(columns)] for i in range(rows)]

    # build static schedule

    # add reserved timeslots - assume list of pairs w/ correct indices?
    for [i, j] in reservedTimes:
        schedule[i][j] = None

    # find static meeting periods and add to schedule?
    # check if meeting periods conflict w/ each other or reserved time slots
     
    # build dynamic schedule


    return schedule