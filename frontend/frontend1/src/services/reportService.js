import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import axios from 'axios';

export const generateBooksReport = async(books) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('📚 Books Report', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 25);

    const tableData = books.map((book) => [
        book.title,
        book.author,
        book.category,
        book.isbn || 'N/A',
        book.totalCopies,
        book.availableCopies,
    ]);

    autoTable(doc, {
        head: [
            ['Title', 'Author', 'Category', 'ISBN', 'Total', 'Available']
        ],
        body: tableData,
        startY: 35,
    });

    doc.save('books_report.pdf');
};

export const generateUsersReport = async(users) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('👥 Users Report', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 25);

    const tableData = users.map((user) => [
        user.name,
        user.email,
        user.role === 'admin' ? '🔐 Admin' : '👨‍🎓 Student',
        new Date(user.createdAt).toLocaleDateString(),
    ]);

    autoTable(doc, {
        head: [
            ['Name', 'Email', 'Role', 'Joined Date']
        ],
        body: tableData,
        startY: 35,
    });

    doc.save('users_report.pdf');
};

export const generateIssuesReport = async(issues) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('🔄 Issues Report', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 25);

    const tableData = issues.map((issue) => [
        issue.userId?.name || 'N/A',
        issue.bookId?.title || 'N/A',
        new Date(issue.issueDate).toLocaleDateString(),
        new Date(issue.dueDate).toLocaleDateString(),
        issue.status === 'issued' ? '📤 Issued' : '✅ Returned',
    ]);

    autoTable(doc, {
        head: [
            ['Student', 'Book', 'Issue Date', 'Due Date', 'Status']
        ],
        body: tableData,
        startY: 35,
    });

    doc.save('issues_report.pdf');
};

export const generateFinesReport = async(fines) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('💰 Fines Report', 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 25);

    const tableData = fines.map((fine) => [
        fine.userId?.name || 'N/A',
        fine.bookId?.title || 'N/A',
        fine.daysOverdue,
        `₹${fine.totalFine}`,
        fine.status === 'pending' ? '⏳ Pending' : '✅ Paid',
    ]);

    autoTable(doc, {
        head: [
            ['Student', 'Book', 'Days Overdue', 'Fine Amount', 'Status']
        ],
        body: tableData,
        startY: 35,
    });

    doc.save('fines_report.pdf');
};

// Excel Export Functions
export const exportBooksToExcel = (books) => {
    const worksheet = XLSX.utils.json_to_sheet(
        books.map((book) => ({
            Title: book.title,
            Author: book.author,
            Category: book.category,
            ISBN: book.isbn || 'N/A',
            'Total Copies': book.totalCopies,
            'Available Copies': book.availableCopies,
        }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Books');
    XLSX.writeFile(workbook, 'books_report.xlsx');
};

export const exportUsersToExcel = (users) => {
    const worksheet = XLSX.utils.json_to_sheet(
        users.map((user) => ({
            Name: user.name,
            Email: user.email,
            Role: user.role === 'admin' ? 'Admin' : 'Student',
            'Joined Date': new Date(user.createdAt).toLocaleDateString(),
        }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'users_report.xlsx');
};

export const exportIssuesToExcel = (issues) => {
    const worksheet = XLSX.utils.json_to_sheet(
        issues.map((issue) => ({
            Student: issue.userId .name || 'N/A',
            Book: issue.bookId?.title || 'N/A',
            'Issue Date': new Date(issue.issueDate).toLocaleDateString(),
            'Due Date': new Date(issue.dueDate).toLocaleDateString(),
            Status: issue.status === 'issued' ? 'Issued' : 'Returned',
        }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Issues');
    XLSX.writeFile(workbook, 'issues_report.xlsx');
};

export const exportFinesToExcel = (fines) => {
    const worksheet = XLSX.utils.json_to_sheet(
        fines.map((fine) => ({
            Student: fine.userId?.name || 'N/A',
            Book: fine.bookId?.title || 'N/A',
            'Days Overdue': fine.daysOverdue,
            'Fine Amount': fine.totalFine,
            Status: fine.status === 'pending' ? 'Pending' : 'Paid',
        }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fines');
    XLSX.writeFile(workbook, 'fines_report.xlsx');
};