
import PropTypes from 'prop-types';
import './TaskItem.css';

function TaskItem({ task, onDelete, onToggleComplete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />

        <span>{task.title}</span>
      </label>

      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
      >
        Hapus
      </button>
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TaskItem;
