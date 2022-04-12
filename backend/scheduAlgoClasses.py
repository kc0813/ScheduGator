from typing import List, Dict

# TODO clean up the code and make sure types are consistent.
#      Make this as easy to read as possible


class Section:
    """
    Section object for courses

    parameters:
        ID: section ID
        meetings: all time slots in this section [["day", "period"], ...]

    functions:
        isOnline: returns true if section has an online section

    """

    def __init__(self, ID: str, meetings: List[tuple]):
        """
        parameters:
        ID: section ID
        meetings: all time slots in this section [["day", "period"], ...]
        """
        self.id = ID
        self.meetings = meetings
        self.online = False

        if len(meetings) == 0:
            self.online = True


    def deleteTimeSlot(self, timeSlot: tuple):
        self.meetings.remove(timeSlot)

    def isOnline(self) -> bool:
        """
        Returns true if section is an online section
        """
        return self.online

    #    def __eq__(self, __o: object) -> bool:
    #        """
    #        Returns true if section has the same meeting day and period
    #        """
    #        return self.meetings == __o.meetings

    def __str__(self) -> str:
        """
        Returns string of section
        """
        return "id: {} meetings: {}".format(self.id, self.meetings)

    __repr__ = __str__


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

    def __init__(self, code: str, name: str, sections: List[Section]):
        """
        parameters:
        code: course code
        name: course name
        sections: list of section objects (see section class)
        """
        self.code = code
        self.name = name
        self.hasOnlineSection = False
        self.sections = self.trimOnlineSections(sections) 
        self.meetTimes: Dict[List[int]] = {} 
        self.staticMeetSection = Section("static", []) 

        if not self.hasOnlineSection:
            self.meetTimes = self.genMeetTimes() 
            self.staticMeetSection = self.findStaticMeetTime()

    def trimOnlineSections(self, sections:List[Section]):
        numOnline = sections.count(Section(self.code, []))
        if numOnline > 0:
            self.hasOnlineSection = True
            for i in range(numOnline):
                sections.remove(Section(self.code, []))
            sections.insert(0, Section(self.code, []))

        return sections

    def genMeetTimes(self) -> Dict[tuple, List[int]]:
        """
        Returns a dictionary of lists.
        Dictionary[("day", period),[(section indices)]> meetDict;

        The keys respresent a single time slot that at least one sections meets in.
        Each list stores the indices of all Sections in *sections* that meet during that time slot.
        """
        meetTimes: Dict[tuple, List[int]] = {}
        index = 0
        # meetDict[["M", 8]] = [1,2,3,4,5]
        for section in self.sections:
            meetKeys = section.meetings
            for key in meetKeys:
                try:
                    meetTimes[tuple(key)].append(index)
                except KeyError:
                    meetTimes[tuple(key)] = [index]
            index += 1
        return meetTimes

    # TODO Note that some courses have multiple classes with the different meeting days and periods
    # TODO test this
    def findStaticMeetTime(self) -> Section:
        """
        Runs through every time slot that has a section meeting at that time.

        If all classes meet at that time slot, put it in the staticMeetTimes list.
        Remove that time slot from all sections that met there
        (since they all share it, might as well only consider it once using staticMeetTimes)

        If a section is now empty, remove it from the course.
        """
        staticTimes = []
        for key in self.meetTimes:  # for all time slots
            if len(self.meetTimes[key]) == len(
                self.sections
            ):  # if num sections at key == num total sections
                staticTimes.append(key)  # add it to the staticTimes

                for index in self.meetTimes[key]:  # Remove time slot from all sections
                    try:
                        self.sections[index].deleteTimeSlot(key)
                    except Exception:
                        # this is here to avoid trying to delete something that's not there
                        pass

                    if (
                        len(self.sections[index].meetings) == 0
                    ):  # check if the section is empty now
                        if self.hasOnlineSection:
                            self.sections.clear()
                            return staticTimes
                        else:
                            self.sections.pop(index)

        staticMeetSection = Section("static", staticTimes)

        return staticMeetSection


class Schedule:
    def __init__(self, template: Dict[str, list[str]] ={}):
        self.template= template

    # TODO find a way to do this w/o 2 for loops?
    # TODO account for adding online classes
    def addSection(self, section: Section, courseID: str):
        # Check for conflicts

        if section.isOnline():
            self.template["ONLINE"].append(courseID)
        else:
            for (day, period) in section.meetings:
                if self.template[day][period] == "":
                    pass
                else:
                    # conflict detected
                    raise RuntimeError("Static time conflict adding ", courseID, "at (", day, ", ", str(period), "), | Already scheduled: ", self.template[day][period])
            for (day, period) in section.meetings:
                # Add to template
                self.template[day][period] = courseID

        return self.template

    def removeSection(self, section: Section):
        for (day, period) in section.meetings:
            self.template[day][period] = ""

        return self.template
    def conflict(self, section: Section) -> bool:
        # Check for conflicts
        for (day, period) in section.meetings:
            if self.template[day][period] == "":
                pass
            else:
                # conflict detected
                print("Time conflict at: " + day + ", " + str(period))
                return True
        return False
