import { useState } from 'react';
import { useResource } from '../hooks/useResource';
import { ENTITY_CONFIG } from '../config/entityConfig';
import ResourceModal from './ResourceModal';
import { useToast } from './ToastContext';

export default function CrudPanel({ resource }) {
  const cfg = ENTITY_CONFIG[resource];
  const { items, loading, error, create, update, remove } = useResource(resource);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const showToast = useToast();

  function openAdd() {
    setEditingRecord(null);
    setModalOpen(true);
  }

  function openEdit(record) {
    setEditingRecord(record);
    setModalOpen(true);
  }

  async function handleSave(payload) {
    try {
      if (editingRecord) {
        await update(editingRecord.id, payload);
        showToast('Updated');
      } else {
        await create(payload);
        showToast('Added');
      }
      setModalOpen(false);
    } catch (e) {
      showToast(e.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this record?')) return;
    try {
      await remove(id);
      showToast('Deleted');
    } catch (e) {
      showToast(e.message);
    }
  }

  return (
    <section className="admin-panel active">
      <div className="panel-header">
        <h2>{cfg.title} Management</h2>
        {!cfg.readonly && (
          <button className="btn small" onClick={openAdd}>+ Add {cfg.title}</button>
        )}
      </div>

      {error && <p style={{ color: '#c62828', marginBottom: 14 }}>{error}</p>}

      <table>
        <thead>
          <tr>
            {cfg.columns.map((c) => <th key={c.label}>{c.label}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr className="empty-row"><td colSpan={cfg.columns.length + 1}>Loading…</td></tr>
          )}
          {!loading && items.length === 0 && (
            <tr className="empty-row"><td colSpan={cfg.columns.length + 1}>No records yet.</td></tr>
          )}
          {!loading && items.slice().reverse().map((row) => (
            <tr key={row.id}>
              {cfg.columns.map((c) => <td key={c.label}>{c.render(row)}</td>)}
              <td className="table-actions">
                {!cfg.readonly && (
                  <button className="btn small outline" onClick={() => openEdit(row)}>Edit</button>
                )}
                <button className="btn small danger" onClick={() => handleDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!cfg.readonly && (
        <ResourceModal
          open={modalOpen}
          title={(editingRecord ? 'Edit ' : 'Add ') + cfg.title}
          fields={cfg.fields}
          record={editingRecord}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}
