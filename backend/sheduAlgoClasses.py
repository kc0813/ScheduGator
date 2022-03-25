class Course:
    """
    Course object for a schedule

    parameters:
        code: course code
        name: course name
        sections: list of section objects (see section class)

    functions:
        numSections: returns the number of sections for a course
        hasOnlineSection: returns true if course has an online section
        meetDict: returns a list of dictionaries with the meeting days and times for a course
    """

    def __init__(
        self, code: str, name: str, sections: list, meetingDays: str, period: str
    ):
        self.code = code
        self.name = name
        self.sections = sections
        self.meetingDays = meetingDays
        self.period = period

    def numSections(self) -> int:
        """
        Returns the number of sections for a course
        """
        return len(self.sections)

    def hasOnlineSection(self) -> bool:
        """
        Returns true if course has an online section
        """
        for section in self.sections:
            if section.isOnline():
                return True
        return False

    def meetDict(self) -> list:
        """
        Returns a list of dictionaries with the meeting days and times for a course
        """
        return [[section.day, section.period] for section in self.sections]

    # TODO test this because idk how __eq__ works
    def trimSections(self) -> list:
        """
        Returns a list of sections for a course that do not have the same meeting day and periods

        *Note: this will remove the later sections that have that have the same meeting day and
        period ex(if section 1 meets on m, p1 and section 2 meets on m, p1, section 2 will be
        removed)
        """
        return set([section for section in self.sections])

    def setNull(self, indices: list):
        """
        sets section indices to null
        """
        for i in indices:
            self.sections[i] = None


class Section:
    """
    Section object for courses

    parameters:
        ID: section ID
        name: section name
        day: meeting day
        period: meeting period

    functions:

    """

    def __init__(self, ID: str, name: str, day: str, period: str, online: bool):
        self.id = ID
        self.name = name
        self.day = day
        self.period = period
        self.online = online

    def isOnline(self) -> bool:
        """
        Returns true if section has an online section
        """
        return self.online

    def __eq__(self, __o: object) -> bool:
        """
        Returns true if section has the same meeting day and period
        """
        return self.day == __o.day and self.period == __o.period


# TODO Note that some courses have multiple classes with the different meeting days and periods
def findStaticMeetTime(sections: list) -> list:
    """
    Finds the the common meeting time for a list of sections
    """

    pass
