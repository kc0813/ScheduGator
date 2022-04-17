from typing import List, Dict
import copy as c

# TODO clean up the code and make sure types are consistent.
#      Make this as easy to read as possible


class Section:
    """
    Section object for courses

    parameters:
        ID: section ID
        meetings: all time slots in this section [("day", period), ...]

    functions:
        isOnline: returns true if section has an online section
        deleteTimeSlot: Removes a timeslot from self.meetings

    Overloads:
        __eq__: checks that id and meetings are equal
        __str__: to string

    """

    def __init__(self, sectionID: str, meetings: List[tuple]):
        """
        parameters:
        ID: section ID
        meetings: all time slots in this section
        """
        self.sectionID = sectionID
        self.meetings = meetings
        self.online = True if len(meetings) == 0 else False

    def deleteTimeSlot(self, timeSlot: tuple):
        """
        removes a given time slot from the section (given as a tuple)
        """
        try:
            self.meetings.remove(timeSlot)
        except Exception:
            # Exception handling functionality
            pass

        return self.meetings

    def isOnline(self) -> bool:
        """
        Returns true if section is an online section
        """
        return self.online

    def __eq__(self, __o: object) -> bool:
        """
        Returns true if section has the same meeting day and period
        """
        return self.meetings == __o.meetings and self.sectionID == __o.sectionID

    def __str__(self) -> str:
        """
        Returns string of section
        """
        return "id: {} | meetings: {}".format(self.sectionID, self.meetings)

    __repr__ = __str__


class Course:
    """
    Course object for a schedule

    parameters:
        code: course code
        name: course name
        sections: list of section objects (see section class)

    functions:
        trimOnlineSections: Removes all but one online section from a course, if it has any
        genMeetTimes: generates meetDict to be used to find static meet times
        findStaticMeetTime: Returns a section of all static meet times

    """

    def __init__(self, code: str, name: str, sections: List[Section]):
        """
        code: course code
        name: course name
        sections: list of section objects (see section class)
        meetTimes: Dict[(Time Slot), List[int]]
                   At each time slot (key value), stores a list of indicies for
                   all sections that meet at that time slot
        staticMeetSection: A Section of time slots that are shared by ALL sections in the course
        """
        self.code = code
        self.name = name
        self.hasOnlineSection = False
        self.sections = self.trimOnlineSections(sections)
        self.meetTimes: Dict[List[int]] = (
            {} if self.hasOnlineSection else self.genMeetTimes()
        )
        self.staticMeetSection: Section = (
            Section("static", [])
            if self.hasOnlineSection
            else self.findStaticMeetTime()
        )

    """
        sections: list of all sections to trim from
    """

    def trimOnlineSections(self, sections: List[Section]) -> List[Section]:
        """
        Checks for online sections and changes hasOnlineSection accordingly

        Trims all online sections and adds a single online section
        to the start of sections if necessary
        """
        for section in sections:
            if section.isOnline():
                self.hasOnlineSection = True
                sectionID = section.sectionID

        sections = [s for s in sections if not s.isOnline()]

        if self.hasOnlineSection:
            sections.insert(0, Section(sectionID, []))

        return sections

    def genMeetTimes(self) -> Dict[tuple, List[int]]:
        """
        Generates a dictionary of lists.
        Dict[("day", period), [(section indices)]

        The keys respresent a single time slot that at least one sections meets in.
        Each list stores the indices of all Sections in *sections* that meet during that time slot.
        """
        meetTimes: Dict[tuple, List[int]] = {}
        index = 0

        for section in self.sections:
            meetKeys = section.meetings
            for key in meetKeys:
                try:
                    meetTimes[key].append(index)
                except KeyError:
                    meetTimes[key] = [index]
            index += 1
        return meetTimes

    def findStaticMeetTime(self) -> Section:
        """
        Runs through every time slot that has a section meeting at that time (see genMeetTimes())

        If all classes meet at that time slot, put it in the staticMeetTimes list.
        Remove that time slot from all sections that met there
        (since they all share those time slots,
         might as well only consider them once using staticMeetTimes)

        If a section is now empty, remove it from the course.
        """
        staticTimes = []
        # for all time slots
        for key in self.meetTimes:
            # if num sections at key == num total sections
            if len(self.meetTimes[key]) == len(self.sections):
                staticTimes.append(key)  # add it to the staticTimes
                # Remove time slot from all sections
                offset = 0
                for index in self.meetTimes[key]:
                    try:
                        self.sections[index].deleteTimeSlot(key)
                    except Exception:
                        # this is here to avoid trying to delete something that's not there
                        pass

                    # check if the section is empty, if so, remove it from the list.
                    if len(self.sections[index - offset].meetings) == 0:
                        self.sections.pop(index - offset)
                        # pass
                    offset += 1

        staticMeetSection = Section("static", staticTimes)
        return staticMeetSection


"""
    Schedule object for creating sample schedules

    parameters:
        template: The representation of the schedule itself
                Creates an empty base template by default
                Stored as a Dictionary of lists, accessed by the days of the week (or "ONLINE")

    functions:
        addSection: adds a section to the schedule
        conflict: checks if a section conflicts with the current schedule

"""
rows = 14  # number of periods in the schedule


class Schedule:
    def __init__(
        self,
        template: Dict[str, List[str]] = {
            "M": ["" for i in range(rows)],
            "T": ["" for i in range(rows)],
            "W": ["" for i in range(rows)],
            "R": ["" for i in range(rows)],
            "F": ["" for i in range(rows)],
            "S": ["" for i in range(rows)],
            "ONLINE": [],
        },
    ):
        self.template = template

    """
        section: section to be added to the Schedule
        courseID: the course code for the course that the section belongs to
    """

    def addSection(self, section: Section, courseID: str):
        """
        Online sections can just be added w/o conflicts

        For other sections, create a copy of the schedule and try to add to that
        If successful, update template to include the section
        """
        if section.isOnline() and self.template["ONLINE"].count(courseID) == 0:
            self.template["ONLINE"].append(courseID)
        else:
            temporary = c.deepcopy(self.template)
            # Check for conflicts
            for (day, period) in section.meetings:
                if temporary[day][period-1] == "":
                    temporary[day][period-1] = courseID
                else:
                    # conflict detected
                    raise RuntimeError(
                        "Static time conflict adding ",
                        courseID,
                        "at (",
                        day,
                        ", ",
                        str(period),
                        "), | Already scheduled: ",
                        self.template[day][period-1],
                    )

            self.template = temporary

        return self.template

    """
        section: the section to be checked for conflicts
    """

    def conflict(self, section: Section) -> bool:
        """
        Returns if the given section conflicts with the current schedule
        """
        # Check for conflicts
        for (day, period) in section.meetings:
            if self.template[day][period] == "":
                pass
            else:
                # conflict detected
                print("Time conflict at: " + day + ", " + str(period))
                return True
        return False

    def __eq__(self, __o: object) -> bool:
        """
        Returns true if section has the same meeting day and period
        """
        return self.template == __o.template
