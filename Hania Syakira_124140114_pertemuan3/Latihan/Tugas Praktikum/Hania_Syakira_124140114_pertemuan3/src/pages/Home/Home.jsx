
import { useMemo, useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import './Home.css';

function Home() {
  const {
    books,
    addBook,
    updateBook,
    deleteBook,
    stats,
  } = useBooks();

  const [editingBook, setEditingBook] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState('');

  const filteredBooks = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === 'semua' ||
        book.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [books, search, statusFilter]);

  function handleSubmit(bookData) {
    if (editingBook) {
      updateBook(editingBook.id, bookData);
      setNotice('Perubahan buku berhasil disimpan.');
    } else {
      addBook(bookData);
      setNotice('Buku berhasil ditambahkan.');
    }

    setEditingBook(null);
    setShowForm(false);
  }

  function handleEdit(book) {
    setEditingBook(book);
    setShowForm(true);
    setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancel() {
    setEditingBook(null);
    setShowForm(false);
  }

  function handleDelete(id) {
    const book = books.find((item) => item.id === id);
    if (!book) return;

    const confirmed = window.confirm(
      `Yakin ingin menghapus buku "${book.title}"?`
    );

    if (confirmed) {
      deleteBook(id);

      if (editingBook?.id === id) {
        setEditingBook(null);
        setShowForm(false);
      }

      setNotice('Buku berhasil dihapus.');
    }
  }

  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            PERSONAL LIBRARY
          </p>

          <h1>Semua Buku, Satu Tempat.</h1>

          <p className="hero-description">
            Kelola koleksi bacaanmu, catat buku yang sedang
            dibaca, dan simpan daftar buku yang ingin kamu miliki.
          </p>

          <button
            type="button"
            className="button hero-button"
            onClick={() => {
              setEditingBook(null);
              setShowForm((previous) => !previous);
              setNotice('');
            }}
          >
            {showForm ? 'Tutup Formulir' : '+ Tambah Buku'}
          </button>
        </div>

        <div className="hero-illustration" aria-hidden="true">
          <span>📚</span>
        </div>
      </section>

      {notice && (
        <p className="notice-message" role="status">
          {notice}
        </p>
      )}

      <section className="stats-grid" aria-label="Ringkasan koleksi">
        <article className="mini-stat">
          <span className="mini-stat-icon">📚</span>
          <div>
            <p>Total Buku</p>
            <strong>{stats.total}</strong>
          </div>
        </article>

        <article className="mini-stat">
          <span className="mini-stat-icon">✓</span>
          <div>
            <p>Sudah Dimiliki</p>
            <strong>{stats.owned}</strong>
          </div>
        </article>

        <article className="mini-stat">
          <span className="mini-stat-icon">📖</span>
          <div>
            <p>Sedang Dibaca</p>
            <strong>{stats.reading}</strong>
          </div>
        </article>

        <article className="mini-stat">
          <span className="mini-stat-icon">♡</span>
          <div>
            <p>Ingin Dibeli</p>
            <strong>{stats.wishlist}</strong>
          </div>
        </article>
      </section>

      {showForm && (
        <section className="form-section">
          <BookForm
            key={editingBook?.id ?? 'new-book'}
            initialBook={editingBook}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </section>
      )}

      <section className="collection-section">
        <div className="collection-heading">
          <div>
            <p className="eyebrow">YOUR COLLECTION</p>
            <h2>Koleksi Buku</h2>
          </div>

          <span className="result-count">
            {filteredBooks.length} buku
          </span>
        </div>

        <BookFilter
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <BookList
          books={filteredBooks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}

export default Home;
