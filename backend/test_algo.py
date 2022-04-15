from scheduAlgoClasses import Course, Section, Schedule
from typing import List
import copy as c
import algorithm as algo


def test_basicDynamicBuild():

    BDBTemp = Schedule()

    section1 = Section("one", [("M", 1), ("M", 2), ("W", 3)])
    section2 = Section("two", [("M", 1), ("M", 2), ("W", 4)])
    sect1 = [section1, section2]

    section3 = Section("three", [("M", 3)])
    section4 = Section("four", [("M", 4)])
    section5 = Section("five", [("M", 5)])
    sect2 = [section3, section4, section5]

    section6 = Section("six", [("W", 3)])
    section7 = Section("seven", [("W", 4)])
    section8 = Section("eight", [("W", 6)])
    sect3 = [section6, section7, section8]

    c1 = Course("ONE", "test1", sect1)
    c2 = Course("TWO", "test2", sect2)
    c3 = Course("THREE", "test3", sect3)

    assert len(algo.dynamicScheduleBuilder(BDBTemp, [c1, c2, c3])) == 12


def test_delStaticConflict():

    baseTemplate = Schedule()
    testTemp = Schedule()
    section1 = Section("one", [("M", 3), ("W", 3), ("F", 3), ("T", 4)])
    section2 = Section("two", [("M", 3), ("W", 3), ("F", 3), ("T", 6)])
    section3 = Section("three", [("M", 3), ("W", 3), ("F", 3), ("T", 5)])
    sect1 = [section1, section2, section3]

    section4 = Section("four", [("T", 3), ("T", 4), ("R", 4), ("W", 3)])
    section5 = Section("five", [("T", 3), ("T", 4), ("R", 4), ("W", 5)])
    sect2 = [section4, section5]

    section6 = Section("six", [("M", 4), ("W", 4), ("F", 4), ("R", 4)])
    section7 = Section("seven", [("M", 4), ("W", 4), ("F", 4), ("R", 5)])
    section8 = Section("eight", [("M", 4), ("W", 4), ("F", 4), ("R", 6)])
    sect3 = [section6, section7, section8]

    c1 = Course("ONE", "test1", sect1)
    c2 = Course("TWO", "test2", sect2)
    c3 = Course("THREE", "test3", sect3)

    testTemp.addSection(c1.staticMeetSection, "ONE")
    testTemp.addSection(c2.staticMeetSection, "TWO")
    testTemp.addSection(c3.staticMeetSection, "THREE")

    assert (
        algo.buildStaticSchedule(baseTemplate, [c1, c2, c3]).template
        == testTemp.template
    )

    courses = algo.delStaticConflict(baseTemplate, [c1, c2, c3])

    assert len(courses[0].sections) == 2
    assert len(courses[1].sections) == 1
    assert len(courses[2].sections) == 2


def test_HenryFallSchedule():
    cap3027 = Course(
        "CAP3027", "Intro to Dig. Arts and Sciences", [Section("11413", [])]
    )
    eel3872 = Course(
        "EEL3872", "Artificial Intelligence Fundamentals", [Section("23981", [])]
    )
    cis4301 = Course(
        "CIS4301",
        "Information and Databases Systems 1",
        [Section(11173, [("M", 4), ("W", 4), ("F", 4)])],
    )
    template = Schedule()

    template.addSection(cis4301.staticMeetSection, cis4301.code)
    template.addSection(cap3027.sections[0], cap3027.code)
    template.addSection(eel3872.sections[0], eel3872.code)

    s1 = Section("27362", [("T", 8), ("T", 9), ("R", 9), ("W", 11)])
    s2 = Section("12345", [("T", 8), ("T", 9), ("R", 9), ("W", 10)])
    s3 = Section("43121", [("T", 8), ("T", 9), ("R", 9), ("W", 3)])
    s4 = Section("54321", [("T", 8), ("T", 9), ("R", 9), ("W", 7)])
    s5 = Section("09876", [("T", 8), ("T", 9), ("R", 9), ("W", 8)])
    s6 = Section("78906", [("T", 8), ("T", 9), ("R", 9), ("W", 9)])
    s7 = Section("10101", [("T", 8), ("T", 9), ("R", 9), ("W", 10)])
    s8 = Section("23459", [("T", 8), ("T", 9), ("R", 9), ("W", 4)])
    sections = [s1, s2, s3, s4, s5, s6, s7, s8]

    schedulesList: List[Schedule] = []
    for s in sections:
        temp = c.deepcopy(template)
        try:
            temp.addSection(s, "COP4600")
            schedulesList.append(temp)
        except Exception as e:
            print(e)

    cop4600 = Course("COP4600", "Operating Systems", sections)
    sampleList = algo.buildSchedules([cap3027, eel3872, cis4301, cop4600], [])

    assert sampleList[0] == schedulesList[0]


# Use only for debugging
def printSchedules(schedules: List[Schedule]):

    for s in schedules:
        print("-------------------------------")
        for day in s.template:
            print(day[0], ": ", s.template[day])
