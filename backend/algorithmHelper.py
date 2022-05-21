import re
from typing import List


class Section:
    """
    A section is defined by the times it meets.
    "M1" means Monday period 1, "T2" means Tuesday period 2, etc.
    """

    def __init__(self, times: List[str]):
        self.times = times


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


def commonTimes(sections: List["Section"]) -> List[str]:
    """
    Returns a list of times that are in all of the sections
    """
    times = sections[0].times
    for section in sections[1:]:
        times = [time for time in times if time in section.times]
    return times
