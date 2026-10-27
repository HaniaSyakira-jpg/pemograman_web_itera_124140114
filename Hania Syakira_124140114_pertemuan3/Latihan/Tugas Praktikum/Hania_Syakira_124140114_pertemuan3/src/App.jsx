import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function Navigation() {
  return (
    <header className="app-header">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">📚</span>
          <span>BookSpace</span>
        </Link>

        <nav className="main-nav" aria-label="Navigasi utama">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Koleksi Buku
          </NavLink>

          <NavLink
            to="/stats"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Statistik
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

Navigation.propTypes = {};

function NotFound() {
  return (
    <main className="not-found">
      <span aria-hidden="true">🔎</span>
      <h1>Halaman Tidak Ditemukan</h1>
      <p>Halaman yang kamu cari tidak tersedia.</p>
      <Link to="/" className="button button-primary">
        Kembali ke Beranda
      </Link>
    </main>
  );
}

NotFound.propTypes = {};

function App() {
  return (
    <BrowserRouter>
      <BookProvider>
        <div className="app-shell">
          <Navigation />

          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer className="app-footer">
            <p>
              BookSpace · Perpustakaan Pribadi
            </p>
            <span>Kelola buku, bangun kebiasaan membaca.</span>
          </footer>
        </div>
      </BookProvider>
    </BrowserRouter>
  );
}

App.propTypes = {};

export default App;