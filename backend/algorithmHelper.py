import re
from typing import List, Mapping, Set


class Section:
    """
    A section is defined by the times it meets.
    "M1" means Monday period 1, "T2" means Tuesday period 2, etc.
    """

    def __init__(self, times: List[str]):
        self.times = times

    def __str__(self) -> str:
        return "[" + ", ".join(self.times) + "]"

    def __repr__(self) -> str:
        return str(self)


class Course:
    """
    A course is defined by its code and sections
    """

    def __init__(self, code: str, sections: List[Section]):
        """
        code: course code
        sections: list of Sections (see Section class)
        """
        self.validateCode(code)
        self.sections = sections

    def validateCode(self, code: str) -> None:
        """
        sets the code to the given code if it is valid
        """
        # check the length of the course code is 7 or 8
        if len(code) != 7 and len(code) != 8:
            raise ValueError("Course code must be 7 or 8 characters")
        # check the code matches has 3 letters followed by 4 numbers ignore case
        if not re.match(r"[A-Z]{3}[0-9]{4}", code, re.IGNORECASE):
            raise ValueError("Course code must be 3 letters followed by 4 numbers")
        # check the code ends in l or c if the length is 8
        if len(code) == 8 and not (code[-1].lower() == "l" or code[-1].lower() == "c"):
            raise ValueError("Course code must end with l or c")
        self.code = code

    def __eq__(self, __o: object) -> bool:
        """
        equality operator
        """
        return self.code == __o.code

    def __repr__(self) -> str:
        """
        string representation
        """
        return self.code

    def __str__(self) -> str:
        """
        string representation
        """
        return f"code: {self.code}\nsections: {self.sections}"


class ScheduleBoard:
    """
    A scheduleBoard contains all possible schedules for the given courses
    """

    def __init__(self, courses: Set[Course]):
        self.courses = courses
        self.timeTables = self.buildBoard()

    def emptyTable(self) -> Mapping[str, Mapping[str, str]]:
        """
        creates an empty table for the 6 days of the week and 14 periods
        """
        return map(
            {
                "M": map(),
                "T": map(),
                "W": map(),
                "R": map(),
                "F": map(),
                "O": map(),
            }
        )

    def addCourse(
        self, tables: List[Mapping[str, Mapping[str, str]]], course: Course
    ) -> None:
        """
        adds the course to the given tables
        """
        i = 0
        for section in course.sections:
            try:
                table = tables[i]
                i += 1
            except IndexError:
                table = self.emptyTable()
            for time in section.times:
                # make sure the time is not already taken,
                # otherwise empty the table and skip to the next section
                if time not in table or time == "o":
                    table[time[0].upper()][time[1:]] = course.code
                else:
                    table = self.emptyTable()
                    break
            # if the table is not empty, add it to the list of potential tables
            if table != self.emptyTable():
                self.timeTables.append(table)

    def buildBoard(self) -> List[Mapping[str, Mapping[str, str]]]:
        """
        builds the schedule board
        """
        self.timeTables = []
        for course in self.courses:
            self.addCourse(self.timeTables, course)

    def __str__(self) -> str:
        # TODO
        return str(self.timeTables)


def commonTimes(sections: List["Section"]) -> List[str]:
    """
    Returns a list of times that are in all of the sections
    """
    times = sections[0].times
    for section in sections[1:]:
        times = [time for time in times if time in section.times]
    return times


if __name__ == "__main__":
    # test the print functions
    section = Section(["M1", "T2", "W3", "R4", "F5", "O6"])
    print(f"section: {section}")
    print("---------------------------------")
    secList = [section]
    print(f"section list: {secList}")
    print("---------------------------------")
    course = Course("CAP3027", [section])
    print(f"course: {course}")
    print("---------------------------------")
    couList = [course]
    print(f"course list: {couList}")
    print("---------------------------------")
