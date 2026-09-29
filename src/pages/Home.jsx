import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h2>Fresh Food, Friendly Service</h2>
          <p>Enjoy delicious meals and refreshing drinks in a comfortable atmosphere.</p>
          <div className="hero-actions">
            <button className="btn" onClick={() => navigate('/menu')}>View Menu</button>
            <button className="btn secondary" onClick={() => navigate('/reserve')}>Book a Table</button>
          </div>
        </div>
      </section>

      <section className="page-section about">
        <h2>About Us</h2>
        <p>
          Green Leaf Cafe is a family-owned local business serving healthy
          breakfasts, lunches, coffee, and desserts. We focus on quality,
          freshness, and customer satisfaction.
        </p>
      </section>

      <section className="page-section services">
        <h2>Our Services</h2>
        <div className="cards">
          <div className="card">
            <h3>Breakfast</h3>
            <p>Fresh sandwiches, pancakes, and healthy meals.</p>
          </div>
          <div className="card">
            <h3>Coffee &amp; Drinks</h3>
            <p>Premium coffee, juices, smoothies, and tea.</p>
          </div>
          <div className="card">
            <h3>Take Away</h3>
            <p>Quick and easy takeaway service for busy customers.</p>
          </div>
        </div>
      </section>

      <section className="info">
        <div className="hours">
          <h2>Business Hours</h2>
          <p>Monday - Friday : 8:00 AM - 8:00 PM</p>
          <p>Saturday : 9:00 AM - 9:00 PM</p>
          <p>Sunday : 10:00 AM - 6:00 PM</p>
        </div>
        <div className="location">
          <h2>Location</h2>
          <p>123 Main Street</p>
          <p>Rajapalayam, Tamil Nadu</p>
          <p>India - 626117</p>
        </div>
      </section>
    </>
  );
}
