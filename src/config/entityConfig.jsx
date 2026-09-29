import { formatCurrency, starString } from '../utils/format';

export const ENTITY_CONFIG = {
  menu: {
    title: 'Food Item',
    fields: [
      { key: 'food_name', label: 'Food Name', type: 'text' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'price', label: 'Price', type: 'number' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Image (emoji)', type: 'text', default: '🍽️' },
      { key: 'available', label: 'Available', type: 'checkbox', default: true }
    ],
    columns: [
      { label: 'Name', render: (r) => r.food_name },
      { label: 'Category', render: (r) => r.category },
      { label: 'Price', render: (r) => formatCurrency(r.price) },
      {
        label: 'Status',
        render: (r) => (
          <span className={`badge ${r.available ? 'available' : 'unavailable'}`}>
            {r.available ? 'Available' : 'Sold Out'}
          </span>
        )
      }
    ]
  },
  orders: {
    title: 'Order',
    fields: [
      { key: 'customer_name', label: 'Customer Name', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'food_name', label: 'Food', type: 'text' },
      { key: 'quantity', label: 'Quantity', type: 'number', default: 1 },
      { key: 'price', label: 'Total Price', type: 'number' },
      { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'Preparing', 'Completed'], default: 'Pending' }
    ],
    columns: [
      { label: 'Customer', render: (r) => r.customer_name },
      { label: 'Food', render: (r) => r.food_name },
      { label: 'Qty', render: (r) => r.quantity },
      { label: 'Total', render: (r) => formatCurrency(r.price) },
      { label: 'Status', render: (r) => <span className={`badge ${r.status.toLowerCase()}`}>{r.status}</span> }
    ]
  },
  reservations: {
    title: 'Booking',
    fields: [
      { key: 'customer_name', label: 'Customer Name', type: 'text' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'booking_date', label: 'Date', type: 'date' },
      { key: 'booking_time', label: 'Time', type: 'time' },
      { key: 'guests', label: 'Guests', type: 'number', default: 2 }
    ],
    columns: [
      { label: 'Customer', render: (r) => r.customer_name },
      { label: 'Date', render: (r) => r.booking_date },
      { label: 'Time', render: (r) => r.booking_time },
      { label: 'Guests', render: (r) => r.guests }
    ]
  },
  employees: {
    title: 'Employee',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'designation', label: 'Designation', type: 'text' },
      { key: 'salary', label: 'Salary', type: 'number' },
      { key: 'phone', label: 'Phone', type: 'text' }
    ],
    columns: [
      { label: 'Name', render: (r) => r.name },
      { label: 'Designation', render: (r) => r.designation },
      { label: 'Salary', render: (r) => formatCurrency(r.salary) },
      { label: 'Phone', render: (r) => r.phone }
    ]
  },
  reviews: {
    title: 'Review',
    fields: [
      { key: 'customer_name', label: 'Customer Name', type: 'text' },
      { key: 'rating', label: 'Rating (1-5)', type: 'number', default: 5 },
      { key: 'review', label: 'Review', type: 'textarea' }
    ],
    columns: [
      { label: 'Customer', render: (r) => r.customer_name },
      { label: 'Rating', render: (r) => <span className="stars">{starString(r.rating)}</span> },
      { label: 'Review', render: (r) => r.review }
    ]
  },
  contacts: {
    title: 'Message',
    readonly: true,
    columns: [
      { label: 'Name', render: (r) => r.name },
      { label: 'Email', render: (r) => r.email },
      { label: 'Message', render: (r) => r.message },
      { label: 'Date', render: (r) => r.created_date }
    ]
  }
};
