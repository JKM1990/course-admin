export interface Technology {
    _id:         string;
    name:        string;
    description: string;
    difficulty:  number;
    courses:     Course[];
}

export interface Course {
    code: string;
    name: string;
}

export interface CourseDocument {
    _id: string;
    code: string;
    name: string;
}

export interface TechRosterData {
    technologies: Technology[];
    courses: CourseDocument[];
}

// Prop interfaces
export interface AddTechnologyProps {
    courses: Course[];
}

export interface EditTechnologyProps {
    technology: Technology;
    courses: CourseDocument[];
}