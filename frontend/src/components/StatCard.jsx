import { ArrowUpRight, GraduationCap, UserCheck, UserMinus, Users } from 'lucide-react';

const icons = { total: Users, active: UserCheck, inactive: UserMinus, departments: GraduationCap };

export default function StatCard({ type, label, value, helper }) {
  const Icon = icons[type] || Users;

  return (
    <div className="stat-card">
      <div className={`stat-icon ${type}`}><Icon size={20} /></div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{helper}</small>
      </div>
      <ArrowUpRight className="stat-arrow" size={17} />
    </div>
  );
}
