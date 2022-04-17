from scheduAlgoClasses import Course, Section
import copy as c


def test_sections():
    # online section
    online = Section("0000", [])
    assert online.isOnline() is True
    # in-person
    sect1 = Section("1234", [("M", 2)])
    assert sect1.isOnline() is False
    assert sect1.meetings == [("M", 2)]
    assert sect1.deleteTimeSlot(("M", 2)) == []
    assert sect1.isOnline() is False


def test_trimOnline():
    # has only online section
    online = Section("0000", [])
    c1 = Course("TEST", "TEST", [online])
    assert c1.trimOnlineSections(c1.sections) == [online]

    section1 = Section("1234", [("M", 2), ("M", 3), ("W", 2), ("T", 5)])
    section2 = Section("12345", [("M", 2), ("M", 3), ("W", 2), ("T", 6)])
    section3 = Section("123456", [("M", 2), ("M", 3), ("W", 2), ("T", 7)])
    section4 = Section("4321", [("M", 2), ("M", 3), ("W", 2), ("T", 8)])

    # has online and in-person
    sectionsWO = [section1, section2, section3, section4, online]
    c2 = Course("TEST@", "TEST@", sectionsWO)
    assert c2.trimOnlineSections(c2.sections) == [
        online,
        section1,
        section2,
        section3,
        section4,
    ]

    # has only in-person
    sectionsNO = [section1, section2, section3, section4]
    c3 = Course("TEST@", "TEST@", sectionsNO)
    assert c3.trimOnlineSections(c3.sections) == sectionsNO


# TODO genMeetTimes


def test_findStaticMeetTime():

    # Only one section
    section1 = Section("1234", [("M", 2), ("M", 3), ("W", 2), ("T", 5)])
    c1 = Course("abc1234", "baba", [c.deepcopy(section1)])
    assert c1.staticMeetSection.meetings == section1.meetings
    assert c1.sections == []

    # Basic static meet time test
    section2 = Section("12345", [("M", 2), ("M", 3), ("W", 2), ("T", 6)])
    section3 = Section("123456", [("M", 2), ("M", 3), ("W", 2), ("T", 7)])
    section4 = Section("4321", [("M", 2), ("M", 3), ("W", 2), ("T", 8)])
    sections = [section2, section3, section4]
    c2 = Course("dum0000", "dummy", sections)
    assert c2.findStaticMeetTime().meetings == [("M", 2), ("M", 3), ("W", 2)]


def test_staticMeetOnline():
    # online only
    online = Section("5555", [])
    courseO = Course("ONL0000", "dummy", [online])
    assert courseO.findStaticMeetTime().meetings == []

    section1 = Section("1111", [("M", 2), ("M", 3), ("W", 2), ("T", 5)])
    section2 = Section("2222", [("M", 2), ("M", 3), ("W", 2), ("T", 6)])
    section3 = Section("3333", [("M", 2), ("M", 3), ("W", 2), ("T", 7)])
    section4 = Section("4444", [("M", 2), ("M", 3), ("W", 2), ("T", 8)])

    sections = [section1, online, section2, section3, section4]

    course = Course("dum0000", "dummy", sections)

    assert course.findStaticMeetTime().meetings == []


# TODO Schedule addSection() and conflict()
