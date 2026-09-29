import { useResource } from '../../hooks/useResource';

export default function Dashboard() {
  const { items: menu } = useResource('menu');
  const { items: orders } = useResource('orders');
  const { items: reservations } = useResource('reservations');
  const { items: employees } = useResource('employees');
  const { items: reviews } = useResource('reviews');
  const { items: contacts } = useResource('contacts');

  const stats = [
    { num: menu.length, label: 'Menu Items' },
    { num: orders.filter((o) => o.status !== 'Completed').length, label: 'Active Orders' },
    { num: reservations.length, label: 'Reservations' },
    { num: employees.length, label: 'Employees' },
    { num: reviews.length, label: 'Reviews' },
    { num: contacts.length, label: 'Messages' }
  ];

  return (
    <section className="admin-panel active">
      <div className="panel-header"><h2>Dashboard</h2></div>
      <div className="stat-cards">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="num">{s.num}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
