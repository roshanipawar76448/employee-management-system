import * as XLSX from 'xlsx';

export const exportToExcel = (employees) => {
  const data = employees.map(e => ({
    'First Name': e.firstName,
    'Last Name': e.lastName,
    'Email': e.email,
    'Department': e.department,
    'Designation': e.designation,
    'Salary': e.salary,
    'Phone': e.phone,
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Employees');
  XLSX.writeFile(wb, 'employees.xlsx');
};