import type {
    Employee,
    EmployeeFilters,
    Department
} from '../types/employee';

// Search and filter employees
export function filterEmployees(
    employees: Employee[],
    filters: EmployeeFilters
): Employee[] {

    const search = filters.searchTerm.toLowerCase().trim();

    return employees.filter((employee: Employee) => {

        const matchesSearch =
            employee.name.toLowerCase().includes(search) ||
            employee.id.toLowerCase().includes(search) ||
            employee.department.toLowerCase().includes(search) ||
            employee.designation.toLowerCase().includes(search) ||
            employee.email.toLowerCase().includes(search);

        const matchesDepartment =
            filters.department === 'All Departments' ||
            employee.department === filters.department;

        const matchesStatus =
            filters.status === 'All Status' ||
            employee.status === filters.status;

        return matchesSearch && matchesDepartment && matchesStatus;

    });
}


// Calculate active employees
export function getActiveEmployees(
    employees: Employee[]
): number {

    return employees.filter(
        employee => employee.status === 'Active'
    ).length;

}


// Calculate department count
export function getDepartmentCount(
    employees: Employee[]
): number {

    return new Set(
        employees.map(employee => employee.department)
    ).size;

}


// Get unique departments
export function getDepartments(
    employees: Employee[]
): Department[] {

    return [...new Set(
        employees.map(employee => employee.department)
    )];

}


// Generate employee initials
export function getInitials(name: string): string {

    return name
        .split(' ')
        .map(part => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

}