import './style.css';

import { employees } from './data/employees.ts';

import type {
    Employee,
    EmployeeFilters
} from './types/employee';

import {
    filterEmployees,
    getActiveEmployees,
    getDepartmentCount,
    getDepartments,
    getInitials
} from './utils/employeeUtils';


// Application state
let filters: EmployeeFilters = {
    searchTerm: '',
    department: 'All Departments',
    status: 'All Status'
};


// Main application
const app = document.querySelector<HTMLDivElement>('#app')!;


// Dashboard structure
app.innerHTML = `

<div class="dashboard">

    <aside class="sidebar">

        <div class="brand">
            <div class="brand-icon">T</div>
            <div>
                <h2>TeamConnect</h2>
                <span>People Directory</span>
            </div>
        </div>

        <div class="sidebar-section">
            <p class="sidebar-label">MENU</p>

            <a href="#" class="nav-item active">
                <span class="nav-icon">▦</span>
                Overview
            </a>

            <a href="#employees" class="nav-item">
                <span class="nav-icon">♙</span>
                Employees
            </a>

        </div>

        <div class="sidebar-bottom">

            <div class="help-card">
                <div class="help-icon">✦</div>
                <h4>TeamConnect</h4>
                <p>Bringing people and possibilities together.</p>
            </div>

            <div class="sidebar-footer">
                <div class="profile-avatar">LP</div>
                <div>
                    <strong>Lakshmi Priya</strong>
                    <span>Administrator</span>
                </div>
            </div>

        </div>

    </aside>


    <main class="main-content">

        <header class="topbar">

            <div>
                <span class="breadcrumb">Workspace / Directory</span>
                <h1>Employee Directory</h1>
            </div>

            <div class="topbar-right">
                <div class="today-label">PEOPLE & CULTURE</div>
                <div class="topbar-avatar">LP</div>
            </div>

        </header>


        <section class="welcome-section">

            <div>
                <p class="welcome-eyebrow">WELCOME TO TEAMCONNECT</p>
                <h2>People make everything possible.</h2>
                <p class="welcome-description">
                    Discover your colleagues, explore teams,
                    and stay connected with everyone.
                </p>
            </div>

            <div class="welcome-decoration">
                <span>✳</span>
                <span>✦</span>
                <span>✧</span>
            </div>

        </section>


        <section class="stats-grid">

            <div class="stat-card">
                <div class="stat-icon icon-brown">♙</div>
                <div>
                    <p>Total Employees</p>
                    <h2 id="total-count">0</h2>
                    <span>People in the directory</span>
                </div>
            </div>


            <div class="stat-card">
                <div class="stat-icon icon-green">✓</div>
                <div>
                    <p>Active Employees</p>
                    <h2 id="active-count">0</h2>
                    <span>Currently active</span>
                </div>
            </div>


            <div class="stat-card">
                <div class="stat-icon icon-orange">▦</div>
                <div>
                    <p>Departments</p>
                    <h2 id="department-count">0</h2>
                    <span>Different departments</span>
                </div>
            </div>

        </section>


        <section class="directory-section" id="employees">

            <div class="section-heading">

                <div>
                    <h2>Meet the Team</h2>
                    <p>Get to know the people behind our work.</p>
                </div>

                <span class="employee-badge" id="result-count">
                    10 Employees
                </span>

            </div>


            <div class="filter-bar">

                <div class="search-wrapper">
                    <span class="search-icon">⌕</span>

                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search by name, role, department or ID..."
                    >

                    <button id="clear-search" class="clear-search" aria-label="Clear search">
                        ×
                    </button>
                </div>


                <select id="department-filter" aria-label="Filter by department">
                    <option value="All Departments">All Departments</option>
                </select>


                <select id="status-filter" aria-label="Filter by employment status">

                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>

                </select>

            </div>


            <div class="employee-grid" id="employee-grid">

            </div>


            <div class="directory-footer">
                <span>Showing <strong id="showing-count">10</strong> employees</span>
                <span>TeamConnect · People First</span>
            </div>

        </section>


        <footer class="main-footer">
            © 2026 TeamConnect. Designed with people in mind.
        </footer>

    </main>

</div>


<div class="modal-overlay" id="employee-modal">

    <div class="modal-card">

        <button class="modal-close" id="modal-close" aria-label="Close details">
            ×
        </button>

        <div id="modal-content"></div>

    </div>

</div>

`;


// DOM elements
const searchInput =
    document.querySelector<HTMLInputElement>('#search-input')!;

const departmentFilter =
    document.querySelector<HTMLSelectElement>('#department-filter')!;

const statusFilter =
    document.querySelector<HTMLSelectElement>('#status-filter')!;

const employeeGrid =
    document.querySelector<HTMLDivElement>('#employee-grid')!;

const modal =
    document.querySelector<HTMLDivElement>('#employee-modal')!;

const modalContent =
    document.querySelector<HTMLDivElement>('#modal-content')!;


// Populate department dropdown
function populateDepartmentFilter(): void {

    const departments = getDepartments(employees);

    departments.forEach((department) => {

        const option = document.createElement('option');

        option.value = department;
        option.textContent = department;

        departmentFilter.appendChild(option);

    });

}


// Update dashboard statistics
function updateStatistics(): void {

    document.querySelector('#total-count')!.textContent =
        String(employees.length);

    document.querySelector('#active-count')!.textContent =
        String(getActiveEmployees(employees));

    document.querySelector('#department-count')!.textContent =
        String(getDepartmentCount(employees));

}


// Create employee cards
function createEmployeeCard(employee: Employee): string {

    const statusClass = employee.status
        .toLowerCase()
        .replace(' ', '-');

    return `

        <article class="employee-card" data-id="${employee.id}">

            <div class="card-top">

                <div class="employee-avatar">
                    ${getInitials(employee.name)}
                </div>

                <span class="status-badge ${statusClass}">
                    <span class="status-dot"></span>
                    ${employee.status}
                </span>

            </div>


            <div class="employee-information">

                <span class="employee-id">${employee.id}</span>

                <h3>${employee.name}</h3>

                <p class="employee-designation">
                    ${employee.designation}
                </p>

                <div class="employee-department">
                    ${employee.department}
                </div>

            </div>


            <div class="card-divider"></div>


            <div class="employee-contact">

                <div>
                    <span class="detail-icon">✉</span>
                    <span>${employee.email}</span>
                </div>

                <div>
                    <span class="detail-icon">⌖</span>
                    <span>${employee.location}</span>
                </div>

            </div>


            <button class="view-details" data-id="${employee.id}">
                View Profile <span>→</span>
            </button>

        </article>

    `;

}


// Render employee list
function renderEmployees(): void {

    const filteredEmployees = filterEmployees(employees, filters);

    employeeGrid.innerHTML = filteredEmployees.length > 0
        ? filteredEmployees.map(createEmployeeCard).join('')
        : `
            <div class="empty-state">
                <div>⌕</div>
                <h3>No employees found</h3>
                <p>Try changing your search or filters.</p>
            </div>
        `;


    document.querySelector('#result-count')!.textContent =
        `${filteredEmployees.length} Employees`;

    document.querySelector('#showing-count')!.textContent =
        String(filteredEmployees.length);

    document.querySelector<HTMLButtonElement>('#clear-search')!.style.display =
        filters.searchTerm ? 'block' : 'none';

}


// Display employee details
function showEmployeeDetails(employeeId: string): void {

    const employee = employees.find(
        (item) => item.id === employeeId
    );

    if (!employee) return;

    modalContent.innerHTML = `

        <div class="profile-modal">

            <div class="modal-avatar">
                ${getInitials(employee.name)}
            </div>

            <span class="employee-id">${employee.id}</span>

            <h2>${employee.name}</h2>

            <p class="modal-designation">${employee.designation}</p>

            <span class="status-badge ${
                employee.status.toLowerCase().replace(' ', '-')
            }">
                <span class="status-dot"></span>
                ${employee.status}
            </span>

            <div class="modal-details">

                <div>
                    <span>Department</span>
                    <strong>${employee.department}</strong>
                </div>

                <div>
                    <span>Email Address</span>
                    <strong>${employee.email}</strong>
                </div>

                <div>
                    <span>Location</span>
                    <strong>${employee.location}</strong>
                </div>

                <div>
                    <span>Employment Type</span>
                    <strong>${employee.employmentType}</strong>
                </div>

                ${employee.muid ? `
                    <div>
                        <span>μLearn ID</span>
                        <strong>${employee.muid}</strong>
                    </div>
                ` : ''}

            </div>

        </div>

    `;

    modal.classList.add('show');

}


// Search functionality
searchInput.addEventListener('input', () => {

    filters.searchTerm = searchInput.value;

    renderEmployees();

});


// Department filtering
departmentFilter.addEventListener('change', () => {

    filters.department = departmentFilter.value;

    renderEmployees();

});


// Status filtering
statusFilter.addEventListener('change', () => {

    filters.status = statusFilter.value;

    renderEmployees();

});


// Clear search
document.querySelector('#clear-search')!.addEventListener('click', () => {

    searchInput.value = '';

    filters.searchTerm = '';

    renderEmployees();

});


// Employee card click handling
employeeGrid.addEventListener('click', (event: MouseEvent) => {

    const target = event.target as HTMLElement;

    const button = target.closest<HTMLButtonElement>('.view-details');

    if (button) {

        const employeeId = button.dataset.id;

        if (employeeId) {
            showEmployeeDetails(employeeId);
        }

    }

});


// Close modal
document.querySelector('#modal-close')!.addEventListener('click', () => {

    modal.classList.remove('show');

});


// Close modal when clicking outside
modal.addEventListener('click', (event: MouseEvent) => {

    if (event.target === modal) {
        modal.classList.remove('show');
    }

});


// Close modal using Escape key
document.addEventListener('keydown', (event: KeyboardEvent) => {

    if (event.key === 'Escape') {
        modal.classList.remove('show');
    }

});


// Initialise application
populateDepartmentFilter();

updateStatistics();

renderEmployees();