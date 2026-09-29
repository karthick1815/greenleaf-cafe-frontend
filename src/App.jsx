import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/ToastContext';
import PublicLayout from './components/PublicLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Reserve from './pages/Reserve';
import Review from './pages/Review';
import Contact from './pages/Contact';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import CrudPanel from './components/CrudPanel';

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/review" element={<Review />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="menu" element={<CrudPanel resource="menu" />} />
            <Route path="orders" element={<CrudPanel resource="orders" />} />
            <Route path="reservations" element={<CrudPanel resource="reservations" />} />
            <Route path="employees" element={<CrudPanel resource="employees" />} />
            <Route path="reviews" element={<CrudPanel resource="reviews" />} />
            <Route path="contacts" element={<CrudPanel resource="contacts" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

function NotFound() {
  return (
    <section className="page-section" style={{ textAlign: 'center' }}>
      <h2>404 — Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </section>
  );
}
