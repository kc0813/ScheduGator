from scheduAlgoClasses import Course, Section, Schedule


def test_trimSections():
    # section1 = Section("1", "M", "1", False)
    # section2 = Section("2", "M", "1", False)
    # section3 = Section("3", "M", "1", False)
    # section4 = Section("4", "T", "1", False)
    # section5 = Section("5", "T", "2", False)
    # sections = [section1, section2, section3, section4, section5]

    # course = Course("1", "graphing", sections, "", "")

    # assert course.trimSections() == [section1, section4, section5]
    pass


def test_findStaticMeetTime():
    section1 = Section("one", [("M", 2), ("M", 3), ("W", 2), ("T", 5)])
    section2 = Section("two", [("M", 2), ("M", 3), ("W", 2), ("T", 6)])
    section3 = Section("three", [("M", 2), ("M", 3), ("W", 2), ("T", 7)])
    section4 = Section("four", [("M", 2), ("M", 3), ("W", 2), ("T", 8)])
    sections = [section1, section2, section3, section4]

    course = Course("dum0000", "dummy", sections)

    assert course.findStaticMeetTime().meetings == [("M", 2), ("M", 3), ("W", 2)]

def test_staticMeetOnline():
    section1 = Section("one", [("M", 2), ("M", 3), ("W", 2), ("T", 5)])
    section2 = Section("two", [("M", 2), ("M", 3), ("W", 2), ("T", 6)])
    section3 = Section("three", [("M", 2), ("M", 3), ("W", 2), ("T", 7)])
    section4 = Section("four", [("M", 2), ("M", 3), ("W", 2), ("T", 8)])
    section5 = Section("five", [])
    sections = [section1, section2, section3, section4, section5]

    course = Course("dum0000", "dummy", sections)

    assert course.findStaticMeetTime().meetings == []