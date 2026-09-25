import Student from '../models/Student.js';

const sendError = (res, error) => {
  if (error?.code === 11000) {
    return res.status(409).json({ message: 'Student ID already exists.' });
  }

  if (error?.name === 'ValidationError') {
    const message = Object.values(error.errors).map((item) => item.message).join(' ');
    return res.status(400).json({ message });
  }

  console.error(error);
  return res.status(500).json({ message: 'Something went wrong on the server.' });
};

export const getStudents = async (req, res) => {
  try {
    const { search = '', department, status } = req.query;
    const query = {};

    if (search.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { email: { $regex: search.trim(), $options: 'i' } },
        { studentId: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    if (department && department !== 'All') query.department = department;
    if (status && status !== 'All') query.status = status;

    const students = await Student.find(query).sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    sendError(res, error);
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json(student);
  } catch (error) {
    sendError(res, error);
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    sendError(res, error);
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json(student);
  } catch (error) {
    sendError(res, error);
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    sendError(res, error);
  }
};

export const getSummary = async (_req, res) => {
  try {
    const [total, active, inactive, departmentCounts] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ status: 'Active' }),
      Student.countDocuments({ status: 'Inactive' }),
      Student.aggregate([{ $group: { _id: '$department', count: { $sum: 1 } } }, { $sort: { count: -1 } }])
    ]);

    res.json({ total, active, inactive, departmentCounts });
  } catch (error) {
    sendError(res, error);
  }
};
