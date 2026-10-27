
import Header from '../../components/Header/Header';
import { useTasks } from '../../context/TaskContext';
import './About.css';

function About() {
  const { stats } = useTasks();

  return (
    <div className="about">
      <Header
        title="Tentang Task Manager"
        description="Aplikasi Manajemen Tugas Praktikum Pemrograman Web"
      />

      <main className="container">
        <div className="about-content">
          <h2>Tentang Aplikasi</h2>

          <p>
            Aplikasi Task Manager ini dibangun menggunakan React modern
            dengan functional components, React Hooks, Custom Hooks,
            Context API, dan React Router.
          </p>

          <h3>Fitur Unggulan:</h3>
          <ul>
            <li>Manajemen tugas: tambah, tandai selesai, dan hapus</li>
            <li>Penyimpanan tugas melalui localStorage</li>
            <li>Navigasi tanpa refresh halaman</li>
            <li>Statistik tugas yang diperbarui secara otomatis</li>
          </ul>

          <div className="about-task-stats">
            Saat ini Anda memiliki total{' '}
            <strong>{stats.total}</strong> tugas yang tersimpan di sistem.
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
