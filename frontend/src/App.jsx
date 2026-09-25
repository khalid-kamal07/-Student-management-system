import { useEffect, useMemo, useState } from 'react';
import {
  Bell, ChevronDown, Edit3, Eye, Filter, GraduationCap, LayoutDashboard,
  MoreHorizontal, Plus, Search, Settings, Trash2, Users, X
} from 'lucide-react';
import { studentApi } from './api';
import StatCard from './components/StatCard';
import StudentDetails from './components/StudentDetails';
import StudentModal from './components/StudentModal';

const departments = ['All', 'Computer Science', 'Software Engineering', 'Business', 'Design', 'Data Science'];

const initials = (name) => name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
const formatDate = (date) => new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));

export default function App() {
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState({ total: 0, active: 0, inactive: 0, departmentCounts: [] });
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [details, setDetails] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const [{ data }, summaryResponse] = await Promise.all([
        studentApi.getAll({ search, department, status }),
        studentApi.summary()
      ]);
      setStudents(data);
      setSummary(summaryResponse.data);
    } catch (error) {
      setNotice({ type: 'error', text: error?.response?.data?.message || 'Could not connect to the API. Check your backend and MongoDB.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadStudents, 250);
    return () => clearTimeout(timer);
  }, [search, department, status]);

  const departmentCount = useMemo(() => summary.departmentCounts?.length || 0, [summary.departmentCounts]);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (student) => { setEditing(student); setModalOpen(true); };

  const saveStudent = async (data) => {
    setSaving(true);
    try {
      if (editing) await studentApi.update(editing._id, data);
      else await studentApi.create(data);
      setModalOpen(false);
      setNotice({ type: 'success', text: editing ? 'Student record updated.' : 'Student added successfully.' });
      await loadStudents();
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await studentApi.remove(deleteTarget._id);
      setDeleteTarget(null);
      setNotice({ type: 'success', text: 'Student record deleted.' });
      await loadStudents();
    } catch (error) {
      setNotice({ type: 'error', text: error?.response?.data?.message || 'Could not delete the student.' });
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><GraduationCap size={21} /></div>
          <div><strong>Student<span>Hub</span></strong><small>Management</small></div>
        </div>

        <nav className="nav-list">
          <div className="nav-label">Workspace</div>
          <button className="nav-item active"><LayoutDashboard size={18} /> Dashboard</button>
          <button className="nav-item" onClick={() => document.getElementById('students-table')?.scrollIntoView({ behavior: 'smooth' })}><Users size={18} /> Students</button>
          <button className="nav-item"><GraduationCap size={18} /> Departments</button>
          <div className="nav-label lower">System</div>
          <button className="nav-item"><Settings size={18} /> Settings</button>
        </nav>

        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon">?</div>
            <div><strong>Need help?</strong><span>Check your project README</span></div>
          </div>
          <div className="profile-mini">
            <div className="avatar small">KK</div>
            <div><strong>Admin</strong><span>Administrator</span></div>
            <MoreHorizontal size={18} />
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand"><GraduationCap size={20} /> StudentHub</div>
          <div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>Dashboard</strong></div>
          <div className="top-actions"><button className="icon-btn"><Bell size={19} /><i /></button><div className="top-user"><div className="avatar small">KK</div><span>Admin</span><ChevronDown size={15} /></div></div>
        </header>

        <div className="content">
          <section className="welcome-row">
            <div><span className="eyebrow">Overview</span><h1>Student dashboard</h1><p>Manage student records, monitor status, and keep everything organized.</p></div>
            <button className="btn primary add-btn" onClick={openCreate}><Plus size={18} /> Add student</button>
          </section>

          {notice && <div className={`toast ${notice.type}`}><span>{notice.text}</span><button onClick={() => setNotice(null)}><X size={16} /></button></div>}

          <section className="stats-grid">
            <StatCard type="total" label="Total students" value={summary.total} helper="All registered records" />
            <StatCard type="active" label="Active students" value={summary.active} helper="Currently enrolled" />
            <StatCard type="inactive" label="Inactive students" value={summary.inactive} helper="Not currently active" />
            <StatCard type="departments" label="Departments" value={departmentCount} helper="Across your campus" />
          </section>

          <section className="panel" id="students-table">
            <div className="panel-head">
              <div><h2>Student records</h2><p>{students.length} record{students.length === 1 ? '' : 's'} matching your filters</p></div>
              <div className="table-tools">
                <div className="search-box"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." /><kbd>⌘ K</kbd></div>
                <select className="filter-select" value={department} onChange={(e) => setDepartment(e.target.value)}><option disabled>Department</option>{departments.map((item) => <option key={item}>{item}</option>)}</select>
                <select className="filter-select status-filter" value={status} onChange={(e) => setStatus(e.target.value)}><option>All</option><option>Active</option><option>Inactive</option></select>
                <button className="filter-btn"><Filter size={16} /> Filter</button>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead><tr><th>Student</th><th>Student ID</th><th>Department</th><th>Semester</th><th>Status</th><th>Joined</th><th className="action-head">Actions</th></tr></thead>
                <tbody>
                  {loading ? <LoadingRows /> : students.length ? students.map((student) => (
                    <tr key={student._id}>
                      <td><div className="student-cell"><div className="avatar">{initials(student.name)}</div><div><strong>{student.name}</strong><span>{student.email}</span></div></div></td>
                      <td><span className="student-id">{student.studentId}</span></td>
                      <td><span className="department-text">{student.department}</span></td>
                      <td><span className="semester-chip">{student.semester}</span></td>
                      <td><span className={`status-pill ${student.status.toLowerCase()}`}><i />{student.status}</span></td>
                      <td className="date-cell">{formatDate(student.joinDate)}</td>
                      <td><div className="row-actions"><button title="View" onClick={() => setDetails(student)}><Eye size={16} /></button><button title="Edit" onClick={() => openEdit(student)}><Edit3 size={16} /></button><button title="Delete" className="danger" onClick={() => setDeleteTarget(student)}><Trash2 size={16} /></button></div></td>
                    </tr>
                  )) : <tr><td colSpan="7"><div className="empty-state"><Users size={30} /><strong>No students found</strong><span>Try another search or add your first student.</span><button className="btn primary" onClick={openCreate}>Add student</button></div></td></tr>}
                </tbody>
              </table>
            </div>
            <div className="panel-foot"><span>Showing <strong>{students.length}</strong> records</span><span>StudentHub · CRUD enabled</span></div>
          </section>
        </div>
      </main>

      <StudentModal open={modalOpen} student={editing} onClose={() => setModalOpen(false)} onSave={saveStudent} saving={saving} />
      <StudentDetails student={details} onClose={() => setDetails(null)} />
      {deleteTarget && <DeleteModal student={deleteTarget} onCancel={() => setDeleteTarget(null)} onConfirm={confirmDelete} />}
    </div>
  );
}

function LoadingRows() {
  return Array.from({ length: 5 }, (_, index) => <tr key={index} className="skeleton-row">{Array.from({ length: 7 }, (_, cell) => <td key={cell}><span /></td>)}</tr>);
}

function DeleteModal({ student, onCancel, onConfirm }) {
  const [deleting, setDeleting] = useState(false);
  const confirm = async () => { setDeleting(true); await onConfirm(); setDeleting(false); };
  return <div className="modal-backdrop"><div className="confirm-card"><div className="danger-icon"><Trash2 size={21} /></div><h2>Delete student?</h2><p>This will permanently remove <strong>{student.name}</strong> and their record.</p><div className="modal-actions"><button className="btn secondary" onClick={onCancel}>Cancel</button><button className="btn danger-btn" onClick={confirm} disabled={deleting}>{deleting ? 'Deleting...' : 'Delete record'}</button></div></div></div>;
}
