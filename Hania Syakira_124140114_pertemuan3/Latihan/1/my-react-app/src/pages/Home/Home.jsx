
import Header from '../../components/Header/Header';
import TaskForm from '../../components/TaskForm/TaskForm';
import TaskItem from '../../components/TaskItem/TaskItem';
import { useTasks } from '../../context/TaskContext';
import useWindowSize from '../../hooks/useWindowSize';
import './Home.css';

function Home() {
  const { tasks, addTask, deleteTask, toggleComplete, stats } = useTasks();
  const { width } = useWindowSize();

  const handleClearAll = () => {
    const confirmed = window.confirm(
      'Apakah kamu yakin ingin menghapus semua tugas?'
    );

    if (confirmed) {
      tasks.forEach((task) => deleteTask(task.id));
    }
  };

  return (
    <div className="home">
      <Header
        title="React Task Manager"
        description="Global State dengan Context API"
      />

      <main className="container">
        <div
          className={`screen-status ${width < 768 ? 'mobile' : 'desktop'}`}
        >
          {width < 768 ? 'Mode Layar Mobile' : 'Mode Layar Desktop'}
        </div>

        <div className="stats">
          <p>Total: <strong>{stats.total}</strong></p>
          <p>Selesai: <strong className="completed-count">{stats.completed}</strong></p>
          <p>Belum Selesai: <strong className="remaining-count">{stats.remaining}</strong></p>
          <p>Progress: <strong>{stats.completionRate.toFixed(0)}%</strong></p>
        </div>

        <button
          type="button"
          className="clear-button"
          onClick={handleClearAll}
          disabled={tasks.length === 0}
        >
          Hapus Semua Tugas
        </button>

        <TaskForm onAddTask={addTask} />

        <div className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-message">
              Belum ada tugas. Tambahkan tugas baru di atas!
            </p>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
