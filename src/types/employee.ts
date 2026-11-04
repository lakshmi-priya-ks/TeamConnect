// Employment type alias
export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract';

// Employment status type alias
export type EmploymentStatus = 'Active' | 'On Leave' | 'Inactive';

// Department type alias
export type Department =
    | 'Engineering'
    | 'Design'
    | 'Marketing'
    | 'Human Resources'
    | 'Finance'
    | 'Computer Science';

// Employee interface
export interface Employee {
    id: string;
    name: string;
    designation: string;
    department: Department;
    email: string;
    location: string;
    employmentType: EmploymentType;
    status: EmploymentStatus;
    avatar: string;
    muid?: string;
}

// Search filter interface
export interface EmployeeFilters {
    searchTerm: string;
    department: string;
    status: string;
}