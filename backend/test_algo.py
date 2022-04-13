from scheduAlgoClasses import Course, Section, Schedule
from typing import List
import copy as c
import algorithm as algo

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


def test_basicDynamicBuild():

    BDBTemp = c.deepcopy(template)

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

    baseTemplate = c.deepcopy(template)
    testTemp = c.deepcopy(template)
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


# Use only for debugging
def printSchedule(schedules: List[Schedule]):

    for s in schedules:
        print("-------------------------------")
        for day in s.template:
            print(day)
            print(s.template[day])
