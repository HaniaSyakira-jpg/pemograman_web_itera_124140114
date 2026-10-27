import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

const EMPTY_FORM = {
  title: '',
  author: '',
  status: 'milik',
  notes: '',
};

function BookForm({ initialBook, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialBook) {
      setForm({
        title: initialBook.title ?? '',
        author: initialBook.author ?? '',
        status: initialBook.status ?? 'milik',
        notes: initialBook.notes ?? '',
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setError('');
  }, [initialBook]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    if (error) setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    const title = form.title.trim();
    const author = form.author.trim();

    if (!title || !author) {
      setError('Judul dan nama penulis wajib diisi.');
      return;
    }

    onSubmit({
      title,
      author,
      status: form.status,
      notes: form.notes.trim(),
    });

    setForm(EMPTY_FORM);
    setError('');
  }

  return (
    <section className="form-card">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            {initialBook ? 'PERBARUI KOLEKSI' : 'KOLEKSI PRIBADI'}
          </p>
          <h2>{initialBook ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Judul Buku *</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Masukkan judul buku"
            aria-invalid={Boolean(error && !form.title.trim())}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Nama Penulis *</label>
          <input
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Masukkan nama penulis"
            aria-invalid={Boolean(error && !form.author.trim())}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status Buku</label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="milik">Sudah Dimiliki</option>
            <option value="baca">Sedang Dibaca</option>
            <option value="beli">Ingin Dibeli</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Catatan (opsional)</label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Tambahkan catatan tentang buku..."
            rows="3"
          />
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <div className="form-actions">
          <button type="submit" className="button button-primary">
            {initialBook ? 'Simpan Perubahan' : 'Tambah Buku'}
          </button>

          {initialBook && (
            <button
              type="button"
              className="button button-secondary"
              onClick={onCancel}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

BookForm.propTypes = {
  initialBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
    notes: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

BookForm.defaultProps = {
  initialBook: null,
  onCancel: () => {},
};

export default BookForm;