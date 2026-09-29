import { useState } from 'react';
import { useResource } from '../hooks/useResource';
import { useToast } from '../components/ToastContext';
import { starString } from '../utils/format';

const emptyForm = { customer_name: '', rating: 5, review: '' };

export default function Review() {
  const { items: reviews, loading, create, update, remove } = useResource('reviews');
  const showToast = useToast();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form, rating: Number(form.rating) };
    try {
      if (editingId) {
        await update(editingId, payload);
        showToast('Review updated');
      } else {
        await create(payload);
        showToast('Review added — thanks!');
      }
      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      showToast(err.message);
    }
  }

  function startEdit(r) {
    setEditingId(r.id);
    setForm({ customer_name: r.customer_name, rating: r.rating, review: r.review });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    if (!confirm('Delete this review?')) return;
    try {
      await remove(id);
      showToast('Review deleted');
      if (editingId === id) { setEditingId(null); setForm(emptyForm); }
    } catch (err) {
      showToast(err.message);
    }
  }

  return (
    <>
      <section className="page-section">
        <h2>Write a Review</h2>
        <form className="stack" onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input type="text" placeholder="Your Name" required value={form.customer_name} onChange={(e) => setField('customer_name', e.target.value)} />
          <label>Rating</label>
          <select value={form.rating} onChange={(e) => setField('rating', e.target.value)}>
            <option value="5">★★★★★ (5)</option>
            <option value="4">★★★★☆ (4)</option>
            <option value="3">★★★☆☆ (3)</option>
            <option value="2">★★☆☆☆ (2)</option>
            <option value="1">★☆☆☆☆ (1)</option>
          </select>
          <label>Review</label>
          <textarea placeholder="Tell us about your experience" required value={form.review} onChange={(e) => setField('review', e.target.value)} />
          <button type="submit" className="btn">{editingId ? 'Save Changes' : 'Add Review'}</button>
        </form>
      </section>

      <section className="page-section">
        <h2>What Our Customers Say</h2>
        {loading && <p style={{ textAlign: 'center', color: '#888' }}>Loading reviews…</p>}
        {!loading && reviews.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888' }}>No reviews yet — be the first!</p>
        )}
        <div className="grid">
          {reviews.slice().reverse().map((r) => (
            <div className="card" key={r.id}>
              <div className="stars">{starString(r.rating)}</div>
              <h3>{r.customer_name}</h3>
              <p>{r.review}</p>
              <div className="table-actions" style={{ justifyContent: 'center', marginTop: 12 }}>
                <button className="btn small outline" onClick={() => startEdit(r)}>Edit</button>
                <button className="btn small danger" onClick={() => handleDelete(r.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
