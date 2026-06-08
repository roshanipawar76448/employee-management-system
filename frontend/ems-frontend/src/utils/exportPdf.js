import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPDF = (employees) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Employee Management System', 14, 15);
  autoTable(doc, {
    startY: 25,
    head: [['Name', 'Email', 'Department', 'Designation', 'Salary']],
    body: employees.map(e => [
      `${e.firstName} ${e.lastName}`,
      e.email,
      e.department,
      e.designation,
      `₹${e.salary}`
    ]),
    styles: { fontSize: 10 },
    headStyles: { fillColor: [99, 102, 241] },
  });
  doc.save('employees.pdf');
};