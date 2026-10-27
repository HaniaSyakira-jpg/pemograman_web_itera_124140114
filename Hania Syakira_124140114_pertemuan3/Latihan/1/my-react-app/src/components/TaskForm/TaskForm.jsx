
import { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAddTask(trimmedTitle);
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Masukkan tugas baru..."
        aria-label="Nama tugas"
      />

      <button type="submit">Tambah Tugas</button>
    </form>
  );
}

export default TaskForm;
