from scheduAlgoClasses import Course, Section, Schedule
import algorithm as algo

def test_basicDynamicBuild():
    rows = 14
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

    section1 = Section("one", [("M", 1), ("M", 2), ("W", 3)])
    section2 = Section("two", [("M", 1), ("M", 2), ("W", 4)])

    section3 = Section("three", [("M", 3)])
    section4 = Section("four", [("M", 4)])
    section5 = Section("five", [("M", 5)])

    section6 = Section("six", [("W", 3)])
    section7 = Section("seven", [("W", 4)])
    section8 = Section("eight", [("W", 6)])

    sect1 = [section1, section2]
    c1 = Course("ONE", "test1", sect1)
    sect2 = [section3, section4, section5]
    c2 = Course("TWO", "test2", sect2)
    sect3 = [section6, section7, section8]
    c3 = Course("THREE", "test3", sect3)

    schedules = (algo.dynamicScheduleBuilder(template, [c1, c2, c3]))
    print(len(schedules))
    for s in schedules:
        print(s.template)

    assert False