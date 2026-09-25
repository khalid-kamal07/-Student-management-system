import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const departments = ['Computer Science', 'Software Engineering', 'Business', 'Design', 'Data Science'];

const emptyStudent = {
  studentId: '', name: '', email: '', phone: '', department: 'Computer Science', semester: 1,
  status: 'Active', joinDate: new Date().toISOString().slice(0, 10), address: ''
};

export default function StudentModal({ open, student, onClose, onSave, saving }) {
  const [form, setForm] = useState(emptyStudent);
  const [error, setError] = useState('');

  useEffect(() => {
    if (student) {
      setForm({ ...student, joinDate: student.joinDate?.slice(0, 10) || '' });
    } else {
      setForm(emptyStudent);
    }
    setError('');
  }, [student, open]);

  if (!open) return null;

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.name.trim() || !form.studentId.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please complete all required fields.');
      return;
    }
    try {
      await onSave({ ...form, semester: Number(form.semester) });
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save this student.');
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <span className="eyebrow">{student ? 'Edit record' : 'New record'}</span>
            <h2>{student ? 'Update student' : 'Add student'}</h2>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><X size={19} /></button>
        </div>

        <form onSubmit={submit}>
          <div className="form-grid">
            <label>Student ID *<input name="studentId" value={form.studentId} onChange={update} placeholder="STU-1001" /></label>
            <label>Full name *<input name="name" value={form.name} onChange={update} placeholder="Ayesha Khan" /></label>
            <label>Email address *<input type="email" name="email" value={form.email} onChange={update} placeholder="ayesha@example.com" /></label>
            <label>Phone number *<input name="phone" value={form.phone} onChange={update} placeholder="0300 1234567" /></label>
            <label>Department *
              <select name="department" value={form.department} onChange={update}>{departments.map((d) => <option key={d}>{d}</option>)}</select>
            </label>
            <label>Semester *
              <select name="semester" value={form.semester} onChange={update}>{Array.from({ length: 8 }, (_, i) => <option key={i + 1} value={i + 1}>Semester {i + 1}</option>)}</select>
            </label>
            <label>Status *
              <select name="status" value={form.status} onChange={update}><option>Active</option><option>Inactive</option></select>
            </label>
            <label>Join date *<input type="date" name="joinDate" value={form.joinDate} onChange={update} /></label>
            <label className="full">Address<textarea name="address" value={form.address} onChange={update} rows="3" placeholder="Student address" /></label>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary" disabled={saving}>{saving ? 'Saving...' : student ? 'Save changes' : 'Add student'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
