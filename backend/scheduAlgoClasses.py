class Section:
    """
    Section object for courses

    parameters:
        ID: section ID
        meetings: all time slots in this section [["day", "period"], ...]

    functions:
        isOnline: returns true if section has an online section

    """

    def __init__(self, ID: str, meetings: list):
        """
        parameters:
        ID: section ID
        meetings: all time slots in this section [["day", "period"], ...]
        """
        self.id = ID
        self.meetings = meetings
        if len.meetings == 0:
            self.online = True
        else:
            self.online = False

    def deleteTimeSlot(self, timeSlot: tuple):
        self.meetings.remove(timeSlot)

    def isOnline(self) -> bool:
        """
        Returns true if section has an online section
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

    def __init__(
        self, code: str, name: str, sections: list
    ):
        """
        parameters:
        code: course code
        name: course name
        sections: list of section objects (see section class)
        """
        self.code = code
        self.name = name
        self.sectList = sections
        self.meetTimes = self.genMeetTimes()
        self.staticMeetTime = self.findStaticMeetTime()
        self.hasOnlineSection = False

    def numSections(self) -> int:
        """
        Returns the number of sections for a course
        """
        return len(self.sections)

    def genMeetTimes(self) -> dict:
        """
        Returns a dictionary of lists. 
        Dictionary<["day", "period"],[(section indices)]> meetDict;

        The keys respresent a single time slot that at least one sections meets in. 
        Each list stores the indices of all Sections in sectList that meet during that time slot.
        """
        meetTimes = {}
        # meetDict[["M", 8]] = [1,2,3,4,5]
        for section in self.sections:
            meetKeys = section.meetings
            meetVal = section.id
            for key in meetKeys:
                meetTimes[key].append(meetVal)
        return meetTimes     


    # TODO test this because idk how __eq__ works
    def trimSections(self) -> list:
        """
        Returns a list of sections for a course that do not have the same meeting day and periods

        *Note: this will remove the later sections that have that have the same meeting day and
        period ex(if section 1 meets on m, p1 and section 2 meets on m, p1, section 2 will be
        removed)
        """
        newSections = []
        for section in self.sections:
            if section is not None:
                if section not in newSections:
                    newSections.append(section)
        return newSections

    # TODO Note that some courses have multiple classes with the different meeting days and periods
    # TODO test this
    def findStaticMeetTime(self, sections: list) -> list:
        """
        Runs through every time slot that has a section meeting at that time.
        
        If all classes meet at that time slot, put it in the staticMeetTimes list.
        Remove that time slot from all sections that met there 
        (since they all share it, might as well only consider it once using staticMeetTimes)

        If a section is now empty, remove it from the course.
        """
        staticMeetTimes = []
        for key in self.meetTimes: #for all time slots
            if len(self.meetTimes[key]) == len(sections): #if num sections at key == num total sections
                staticMeetTimes.append(key)               #add it to the staticMeetTimes

                for index in self.codemeetTimes[key]:     #Remove time slot from all sections
                    sections[index].deleteTimeSlot(key)

                    if len(sections[index].meetings) == 0:#check if the section is empty now
                        if self.hasOnlineSection:
                            sections.clear()
                            return staticMeetTimes
                        else:
                            sections.pop(index)
        #if we assume that one section being completely empty means all sections being empty
        #then instead use this in the if statement:
                        #sections.clear()
                        #return staticMeetTimes

        return staticMeetTimes

class Schedule:
    
    def __init__(
        self, template = {}
    ):
        self.template = template

    def addSection(self, section: Section, courseID):
        #Check for conflicts
        for [day, period] in section.meetings:
            if self.template[day][period] == "":
                #Add to template
                self.template[day][period] = courseID
            else:
                #raise an exception
                raise RuntimeError("Time conflict at: " + day + ", " + period)

        return self.template

    


