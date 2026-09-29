import { useEffect, useState } from 'react';

function buildInitialValues(fields, record) {
  const values = {};
  fields.forEach((f) => {
    if (record && record[f.key] !== undefined) values[f.key] = record[f.key];
    else values[f.key] = f.default ?? (f.type === 'checkbox' ? false : '');
  });
  return values;
}

export default function ResourceModal({ open, title, fields, record, onSave, onClose }) {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (open) setValues(buildInitialValues(fields, record));
  }, [open, fields, record]);

  if (!open) return null;

  function setField(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {};
    fields.forEach((f) => {
      payload[f.key] = f.type === 'number' ? Number(values[f.key]) || 0 : values[f.key];
    });
    onSave(payload);
  }

  return (
    <div className="modal-backdrop open">
      <div className="modal">
        <button type="button" className="modal-close" onClick={onClose}>&times;</button>
        <h3>{title}</h3>
        <form className="stack" onSubmit={handleSubmit}>
          {fields.map((f) => {
            if (f.type === 'select') {
              return (
                <div key={f.key}>
                  <label>{f.label}</label>
                  <select value={values[f.key] ?? ''} onChange={(e) => setField(f.key, e.target.value)}>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              );
            }
            if (f.type === 'checkbox') {
              return (
                <label key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="checkbox"
                    style={{ width: 'auto' }}
                    checked={!!values[f.key]}
                    onChange={(e) => setField(f.key, e.target.checked)}
                  />
                  {f.label}
                </label>
              );
            }
            if (f.type === 'textarea') {
              return (
                <div key={f.key}>
                  <label>{f.label}</label>
                  <textarea value={values[f.key] ?? ''} onChange={(e) => setField(f.key, e.target.value)} />
                </div>
              );
            }
            return (
              <div key={f.key}>
                <label>{f.label}</label>
                <input
                  type={f.type}
                  value={values[f.key] ?? ''}
                  onChange={(e) => setField(f.key, e.target.value)}
                />
              </div>
            );
          })}
          <button type="submit" className="btn">Save</button>
        </form>
      </div>
    </div>
  );
}
