from scheduAlgoClasses import Course, Section


def test_trimSections():
    section1 = Section("1", "M", "1", False)
    section2 = Section("2", "M", "1", False)
    section3 = Section("3", "M", "1", False)
    section4 = Section("4", "T", "1", False)
    section5 = Section("5", "T", "2", False)
    sections = [section1, section2, section3, section4, section5]

    course = Course("1", "graphing", sections, "", "")

    assert course.trimSections() == [section1, section4, section5]


def test_findStaticMeetTime():
    pass
