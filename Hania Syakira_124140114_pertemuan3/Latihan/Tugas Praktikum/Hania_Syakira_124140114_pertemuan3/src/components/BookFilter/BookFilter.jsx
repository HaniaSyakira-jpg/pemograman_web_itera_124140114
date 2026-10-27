import PropTypes from 'prop-types';
import './BookFilter.css';

function BookFilter({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) {
  return (
    <section className="filter-panel">
      <div className="filter-search">
        <label htmlFor="book-search">Cari Buku</label>
        <input
          id="book-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari judul atau penulis..."
        />
      </div>

      <div className="filter-status">
        <label htmlFor="status-filter">Filter Status</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="semua">Semua Status</option>
          <option value="milik">Sudah Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>
    </section>
  );
}

BookFilter.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.oneOf([
    'semua',
    'milik',
    'baca',
    'beli',
  ]).isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default BookFilter;