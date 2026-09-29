import { useState } from 'react';
import { useResource } from '../hooks/useResource';
import { useToast } from '../components/ToastContext';
import { todayISO } from '../utils/format';

const emptyForm = { name: '', email: '', message: '' };

export default function Contact() {
  const { create } = useResource('contacts');
  const showToast = useToast();
  const [form, setForm] = useState(emptyForm);

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await create({ ...form, created_date: todayISO() });
      showToast('Message sent — thank you!');
      setForm(emptyForm);
    } catch (err) {
      showToast(err.message);
    }
  }

  return (
    <section className="page-section contact">
      <h2>Contact Us</h2>
      <p><strong>Phone:</strong> +91 98765 43210</p>
      <p><strong>Email:</strong> greenleaf@gmail.com</p>

      <form className="stack" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setField('name', e.target.value)} />
        <label>Email</label>
        <input type="email" placeholder="Your Email" required value={form.email} onChange={(e) => setField('email', e.target.value)} />
        <label>Message</label>
        <textarea placeholder="Your Message" required value={form.message} onChange={(e) => setField('message', e.target.value)} />
        <button type="submit" className="btn">Send Message</button>
      </form>
    </section>
  );
}
