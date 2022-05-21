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
        self.code = self.validateCode(code)
        self.sections = sections

    def validateCode(self) -> str:
        """
        Return the code if it is valid, otherwise throw an error
        """
        # check the length of the course code is 7 or 8
        if len(self.code) != 7 and len(self.code) != 8:
            raise ValueError("Course code must be 7 or 8 characters")
        # check the code matches the regex
        ret = re.search(r"/\w{3}\d{4}[lc]?/gi", self.code).group(0)
        if ret != self.code:
            raise ValueError(
                "Course code must be in the format of 'ABC123' or 'ABC123l'"
            )
        return self.code
