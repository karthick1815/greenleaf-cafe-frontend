import { useState } from 'react';
import { useResource } from '../hooks/useResource';
import { useToast } from '../components/ToastContext';
import { todayISO } from '../utils/format';

const emptyForm = { customer_name: '', phone: '', booking_date: '', booking_time: '', guests: 2 };

export default function Reserve() {
  const { items: reservations, loading, create, update, remove } = useResource('reservations');
  const showToast = useToast();

  const [form, setForm] = useState(emptyForm);
  const [lookupPhone, setLookupPhone] = useState('');
  const [activePhone, setActivePhone] = useState('');
  const [editing, setEditing] = useState(null); // reservation object being edited, or null

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleBook(e) {
    e.preventDefault();
    try {
      await create({
        customer_name: form.customer_name.trim(),
        phone: form.phone.trim(),
        booking_date: form.booking_date,
        booking_time: form.booking_time,
        guests: Number(form.guests) || 1
      });
      showToast('Table booked!');
      setForm(emptyForm);
    } catch (err) {
      showToast(err.message);
    }
  }

  async function handleCancel(id) {
    if (!confirm('Cancel this booking?')) return;
    try {
      await remove(id);
      showToast('Booking cancelled');
    } catch (err) {
      showToast(err.message);
    }
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    try {
      await update(editing.id, {
        booking_date: editing.booking_date,
        booking_time: editing.booking_time,
        guests: Number(editing.guests) || 1
      });
      showToast('Booking updated');
      setEditing(null);
    } catch (err) {
      showToast(err.message);
    }
  }

  const visibleReservations = (activePhone
    ? reservations.filter((r) => r.phone === activePhone)
    : reservations
  ).slice().reverse();

  return (
    <>
      <section className="page-section">
        <h2>Book a Table</h2>
        <form className="stack" onSubmit={handleBook}>
          <label>Name</label>
          <input type="text" placeholder="Your Name" required value={form.customer_name} onChange={(e) => setField('customer_name', e.target.value)} />
          <label>Phone</label>
          <input type="tel" placeholder="Your Phone Number" required value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
          <label>Date</label>
          <input type="date" required min={todayISO()} value={form.booking_date} onChange={(e) => setField('booking_date', e.target.value)} />
          <label>Time</label>
          <input type="time" required value={form.booking_time} onChange={(e) => setField('booking_time', e.target.value)} />
          <label>Guests</label>
          <input type="number" min="1" required value={form.guests} onChange={(e) => setField('guests', e.target.value)} />
          <button type="submit" className="btn">Book Table</button>
        </form>
      </section>

      <section className="page-section">
        <h2>My Bookings</h2>
        <p style={{ textAlign: 'center', color: '#777', fontSize: 13, marginBottom: 16 }}>
          Enter the phone number you booked with to find, update, or cancel a booking.
        </p>
        <div style={{ maxWidth: 400, margin: '0 auto 24px', display: 'flex', gap: 10 }}>
          <input type="tel" placeholder="Phone number" value={lookupPhone} onChange={(e) => setLookupPhone(e.target.value)} />
          <button className="btn small" style={{ whiteSpace: 'nowrap' }} onClick={() => setActivePhone(lookupPhone.trim())}>Find</button>
        </div>

        <div style={{ maxWidth: 800, margin: 'auto' }}>
          <table>
            <thead><tr><th>Name</th><th>Date</th><th>Time</th><th>Guests</th><th>Actions</th></tr></thead>
            <tbody>
              {loading && <tr className="empty-row"><td colSpan={5}>Loading…</td></tr>}
              {!loading && visibleReservations.length === 0 && (
                <tr className="empty-row"><td colSpan={5}>{activePhone ? 'No bookings found for that number.' : 'No bookings yet.'}</td></tr>
              )}
              {!loading && visibleReservations.map((r) => (
                <tr key={r.id}>
                  <td>{r.customer_name}</td>
                  <td>{r.booking_date}</td>
                  <td>{r.booking_time}</td>
                  <td>{r.guests}</td>
                  <td className="table-actions">
                    <button className="btn small outline" onClick={() => setEditing({ ...r })}>Update</button>
                    <button className="btn small danger" onClick={() => handleCancel(r.id)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className={`modal-backdrop ${editing ? 'open' : ''}`}>
        {editing && (
          <div className="modal">
            <button type="button" className="modal-close" onClick={() => setEditing(null)}>&times;</button>
            <h3>Update Booking</h3>
            <form className="stack" onSubmit={handleSaveEdit}>
              <label>Date</label>
              <input type="date" required value={editing.booking_date} onChange={(e) => setEditing({ ...editing, booking_date: e.target.value })} />
              <label>Time</label>
              <input type="time" required value={editing.booking_time} onChange={(e) => setEditing({ ...editing, booking_time: e.target.value })} />
              <label>Guests</label>
              <input type="number" min="1" required value={editing.guests} onChange={(e) => setEditing({ ...editing, guests: e.target.value })} />
              <button type="submit" className="btn">Save Changes</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
