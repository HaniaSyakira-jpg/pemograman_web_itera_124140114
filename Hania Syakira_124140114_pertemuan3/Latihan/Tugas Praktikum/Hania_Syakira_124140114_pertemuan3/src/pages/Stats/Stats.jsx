import { Link } from 'react-router-dom';
import { useBooks } from '../../context/BookContext';
import './Stats.css';

function Stats() {
  const { books, stats } = useBooks();

  const categories = [
    {
      key: 'milik',
      title: 'Sudah Dimiliki',
      count: stats.owned,
      description: 'Buku yang sudah ada dalam koleksimu.',
      color: 'owned',
    },
    {
      key: 'baca',
      title: 'Sedang Dibaca',
      count: stats.reading,
      description: 'Buku yang sedang kamu baca.',
      color: 'reading',
    },
    {
      key: 'beli',
      title: 'Ingin Dibeli',
      count: stats.wishlist,
      description: 'Buku yang ingin kamu miliki nanti.',
      color: 'wishlist',
    },
  ];

  return (
    <div className="stats-page">
      <header className="stats-page-header">
        <p className="eyebrow">YOUR READING JOURNEY</p>
        <h1>Statistik Koleksi</h1>
        <p>Pantau koleksi buku dan progres membaca dalam satu halaman.</p>
      </header>

      <section className="stats-overview">
        <article className="overview-card overview-main">
          <p>Total Buku dalam Koleksi</p>
          <strong>{stats.total}</strong>
          <span>Buku tercatat di perpustakaan pribadimu</span>
        </article>

        <article className="overview-card">
          <p>Persentase Buku Dimiliki</p>
          <strong>{stats.ownershipRate}%</strong>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Persentase buku yang dimiliki"
            aria-valuenow={stats.ownershipRate}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-fill"
              style={{ width: `${stats.ownershipRate}%` }}
            />
          </div>
        </article>
      </section>

      <section className="category-section">
        <h2>Rincian Status Buku</h2>

        <div className="category-grid">
          {categories.map((category) => {
            const percentage = stats.total > 0
              ? Math.round((category.count / stats.total) * 100)
              : 0;

            return (
              <article
                className={`category-card ${category.color}`}
                key={category.key}
              >
                <div className="category-card-top">
                  <h3>{category.title}</h3>
                  <strong>{category.count}</strong>
                </div>

                <p>{category.description}</p>

                <div
                  className="progress-track"
                  role="progressbar"
                  aria-label={`Persentase ${category.title}`}
                  aria-valuenow={percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="category-percentage">
                  {percentage}% dari seluruh buku
                </span>
              </article>
            );
          })}
        </div>
      </section>

      <section className="recent-books">
        <h2>Buku Terbaru</h2>

        {books.length === 0 ? (
          <p className="no-recent-books">
            Belum ada buku. Mulai bangun koleksimu sekarang.
          </p>
        ) : (
          <ul>
            {[...books].reverse().slice(0, 5).map((book) => (
              <li key={book.id}>
                <div>
                  <strong>{book.title}</strong>
                  <span>{book.author}</span>
                </div>
                <span className={`status-badge status-${book.status}`}>
                  {book.status === 'milik'
                    ? 'Sudah Dimiliki'
                    : book.status === 'baca'
                      ? 'Sedang Dibaca'
                      : 'Ingin Dibeli'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Link className="button button-primary stats-back-button" to="/">
        Kembali ke Koleksi
      </Link>
    </div>
  );
}

export default Stats;