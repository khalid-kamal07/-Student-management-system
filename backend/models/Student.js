import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true, trim: true, uppercase: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    department: {
      type: String,
      required: true,
      enum: ['Computer Science', 'Software Engineering', 'Business', 'Design', 'Data Science']
    },
    semester: { type: Number, required: true, min: 1, max: 8 },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    joinDate: { type: Date, required: true },
    address: { type: String, default: '', trim: true }
  },
  { timestamps: true }
);

export default mongoose.model('Student', studentSchema);
