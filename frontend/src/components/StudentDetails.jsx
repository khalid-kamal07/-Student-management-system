import { CalendarDays, Mail, MapPin, Phone, UserRound, X } from 'lucide-react';

const formatDate = (date) => new Intl.DateTimeFormat('en', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(date));

export default function StudentDetails({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="details-card">
        <div className="details-hero">
          <button className="icon-btn light" onClick={onClose} aria-label="Close"><X size={19} /></button>
          <div className="profile-avatar">{student.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</div>
          <span className={`status-pill ${student.status.toLowerCase()}`}>{student.status}</span>
          <h2>{student.name}</h2>
          <p>{student.studentId} · {student.department}</p>
        </div>
        <div className="details-body">
          <div className="detail-item"><Mail size={18} /><div><span>Email</span><strong>{student.email}</strong></div></div>
          <div className="detail-item"><Phone size={18} /><div><span>Phone</span><strong>{student.phone}</strong></div></div>
          <div className="detail-item"><GraduationIcon /><div><span>Semester</span><strong>Semester {student.semester}</strong></div></div>
          <div className="detail-item"><CalendarDays size={18} /><div><span>Joined</span><strong>{formatDate(student.joinDate)}</strong></div></div>
          <div className="detail-item full"><MapPin size={18} /><div><span>Address</span><strong>{student.address || 'No address provided'}</strong></div></div>
        </div>
        <div className="details-footer"><UserRound size={16} /> Student record</div>
      </div>
    </div>
  );
}

function GraduationIcon() {
  return <span className="mini-graduation">⌂</span>;
}
