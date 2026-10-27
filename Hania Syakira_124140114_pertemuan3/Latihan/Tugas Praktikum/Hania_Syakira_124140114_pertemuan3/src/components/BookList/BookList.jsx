import PropTypes from 'prop-types';
import './BookList.css';

const STATUS_LABELS = {
  milik: 'Sudah Dimiliki',
  baca: 'Sedang Dibaca',
  beli: 'Ingin Dibeli',
};

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📚</div>
        <h3>Belum ada buku ditemukan</h3>
        <p>Tambahkan buku baru atau ubah kata pencarian dan filter.</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <article className="book-card" key={book.id}>
          <div className="book-cover" aria-hidden="true">
            <span>BOOK</span>
            <strong>{book.title.charAt(0).toUpperCase()}</strong>
          </div>

          <div className="book-details">
            <div className="book-title-row">
              <h3>{book.title}</h3>
              <span className={`status-badge status-${book.status}`}>
                {STATUS_LABELS[book.status]}
              </span>
            </div>

            <p className="book-author">Oleh {book.author}</p>

            {book.notes && (
              <p className="book-notes">{book.notes}</p>
            )}

            <div className="book-actions">
              <button
                type="button"
                className="text-button"
                onClick={() => onEdit(book)}
                aria-label={`Edit ${book.title}`}
              >
                Edit
              </button>

              <button
                type="button"
                className="text-button text-danger"
                onClick={() => onDelete(book.id)}
                aria-label={`Hapus ${book.title}`}
              >
                Hapus
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
      notes: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;