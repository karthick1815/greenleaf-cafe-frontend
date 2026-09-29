import { useResource } from '../hooks/useResource';
import { formatCurrency } from '../utils/format';

export default function Menu() {
  const { items, loading, error } = useResource('menu');

  return (
    <section className="page-section">
      <h2>Our Menu</h2>

      {loading && <p style={{ textAlign: 'center', color: '#888' }}>Loading menu…</p>}
      {error && <p style={{ textAlign: 'center', color: '#c62828' }}>{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888' }}>No dishes on the menu yet.</p>
      )}

      <div className="grid">
        {items.map((item) => (
          <div className="card" key={item.id}>
            <div className="emoji">{item.image || '🍽️'}</div>
            <h3>{item.food_name}</h3>
            <p>{item.description}</p>
            <p className="price">{formatCurrency(item.price)} &middot; {item.category}</p>
            {item.available
              ? <span className="badge available">Available</span>
              : <span className="badge unavailable">Sold Out</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
