import { request } from './client';

/**
 * Builds a full CRUD client for a REST resource, matching the
 * GET/POST/PUT/DELETE endpoints described in the project spec:
 *   GET    /resource        -> getAll
 *   GET    /resource/:id    -> getById
 *   POST   /resource        -> create
 *   PUT    /resource/:id    -> update
 *   DELETE /resource/:id    -> remove
 */
export function createResourceApi(resource) {
  return {
    getAll: () => request(`/${resource}`),
    getById: (id) => request(`/${resource}/${id}`),
    create: (data) => request(`/${resource}`, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    update: (id, data) => request(`/${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    remove: (id) => request(`/${resource}/${id}`, {
      method: 'DELETE'
    })
  };
}

export const menuApi = createResourceApi('menu');
export const ordersApi = createResourceApi('orders');
export const reservationsApi = createResourceApi('reservations');
export const employeesApi = createResourceApi('employees');
export const reviewsApi = createResourceApi('reviews');
export const contactsApi = createResourceApi('contacts');
