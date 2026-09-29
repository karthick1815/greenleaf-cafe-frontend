import { useState } from 'react';
import { useResource } from '../hooks/useResource';
import { formatCurrency } from '../utils/format';
import { useToast } from '../components/ToastContext';

export default function Order() {
  const { items: menu } = useResource('menu');
  const { items: orders, loading, create } = useResource('orders');
  const showToast = useToast();

  const availableMenu = menu.filter((m) => m.available);

  const [form, setForm] = useState({ customer_name: '', phone: '', foodId: '', quantity: 1 });

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const item = menu.find((m) => String(m.id) === String(form.foodId));
    if (!item) {
      showToast('Please choose a food item');
      return;
    }
    const quantity = Math.max(1, Number(form.quantity) || 1);
    try {
      await create({
        customer_name: form.customer_name.trim(),
        phone: form.phone.trim(),
        food_name: item.food_name,
        quantity,
        price: item.price * quantity,
        status: 'Pending'
      });
      showToast('Order placed!');
      setForm({ customer_name: '', phone: '', foodId: '', quantity: 1 });
    } catch (err) {
      showToast(err.message);
    }
  }

  return (
    <>
      <section className="page-section">
        <h2>Place an Order</h2>
        <form className="stack" onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            type="text" placeholder="Your Name" required
            value={form.customer_name}
            onChange={(e) => setField('customer_name', e.target.value)}
          />

          <label>Phone</label>
          <input
            type="tel" placeholder="Your Phone Number" required
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
          />

          <label>Food Item</label>
          <select required value={form.foodId} onChange={(e) => setField('foodId', e.target.value)}>
            <option value="" disabled>Select a dish</option>
            {availableMenu.map((m) => (
              <option key={m.id} value={m.id}>{m.food_name} — {formatCurrency(m.price)}</option>
            ))}
          </select>

          <label>Quantity</label>
          <input
            type="number" min="1" required
            value={form.quantity}
            onChange={(e) => setField('quantity', e.target.value)}
          />

          <button type="submit" className="btn">Place Order</button>
        </form>
      </section>

      <section className="page-section">
        <h2>Track Orders</h2>
        <div style={{ maxWidth: 800, margin: 'auto' }}>
          <table>
            <thead>
              <tr><th>Order #</th><th>Name</th><th>Food</th><th>Qty</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {loading && <tr className="empty-row"><td colSpan={6}>Loading…</td></tr>}
              {!loading && orders.length === 0 && (
                <tr className="empty-row"><td colSpan={6}>No orders yet.</td></tr>
              )}
              {!loading && orders.slice().reverse().map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.customer_name}</td>
                  <td>{o.food_name}</td>
                  <td>{o.quantity}</td>
                  <td>{formatCurrency(o.price)}</td>
                  <td><span className={`badge ${o.status.toLowerCase()}`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
