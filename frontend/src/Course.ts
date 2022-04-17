export interface Course {
    code: string
    courseId: string
    description: string
    name: string
    openSeats: any
    prerequisites: string
    sections: Section[]
}

export function isCourseEqual(c1: Course, c2: Course): boolean {
    return c1.courseId === c2.courseId
}

export interface Section {
    EEP: string
    LMS: string
    acadCareer: string
    addEligible: string
    classNumber: number
    courseFee: number
    credits: number
    credits_max: number
    credits_min: number
    dNote: string
    deptCode: number
    deptName: string
    display: string
    dropaddDeadline: string
    endDate: string
    finalExam: string
    genEd: any
    grWriting: string
    gradBasis: string
    instructors: { name: string }[]
    lateFlag: string
    meetTimes: MeetTime[]
    note: string
    number: string
    pastDeadline: boolean
    rotateTitle: string
    sectWeb: string
    startDate: string
}

export interface MeetTime {
    meetBldgCode: string
    meetBuilding: string
    meetDays: string[]  
    meetNo: number
    meetPeriodBegin: string
    meetPeriodEnd: string
    meetRoom: string
    meetTimeBegin: string
    meetTimeEnd: string
}

export interface Schedule {
    template: Template
}

export interface Template {
    M: string[],
    T: string[],
    W: string[],
    R: string[],
    F: string[],
    S: string[],
    ONLINE: string[],
}