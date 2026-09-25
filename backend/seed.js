import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Student from './models/Student.js';

dotenv.config();

const students = [
  { studentId: 'STU-1001', name: 'Ayesha Khan', email: 'ayesha.khan@example.com', phone: '0300 1234567', department: 'Computer Science', semester: 6, status: 'Active', joinDate: '2024-09-02', address: 'Clifton, Karachi' },
  { studentId: 'STU-1002', name: 'Hamza Ali', email: 'hamza.ali@example.com', phone: '0312 7654321', department: 'Software Engineering', semester: 4, status: 'Active', joinDate: '2025-02-12', address: 'Gulshan-e-Iqbal, Karachi' },
  { studentId: 'STU-1003', name: 'Sara Ahmed', email: 'sara.ahmed@example.com', phone: '0333 2221188', department: 'Business', semester: 3, status: 'Active', joinDate: '2025-03-08', address: 'PECHS, Karachi' },
  { studentId: 'STU-1004', name: 'Usman Raza', email: 'usman.raza@example.com', phone: '0345 8899012', department: 'Data Science', semester: 7, status: 'Inactive', joinDate: '2023-09-01', address: 'North Nazimabad, Karachi' },
  { studentId: 'STU-1005', name: 'Maham Noor', email: 'maham.noor@example.com', phone: '0301 5550134', department: 'Design', semester: 2, status: 'Active', joinDate: '2025-09-03', address: 'DHA, Karachi' },
  { studentId: 'STU-1006', name: 'Zain Malik', email: 'zain.malik@example.com', phone: '0321 1112233', department: 'Computer Science', semester: 5, status: 'Active', joinDate: '2024-09-04', address: 'Johar, Karachi' }
];

try {
  await mongoose.connect(process.env.MONGODB_URI);
  await Student.deleteMany({});
  await Student.insertMany(students);
  console.log('Demo students inserted.');
} catch (error) {
  console.error(error.message);
} finally {
  await mongoose.disconnect();
}
