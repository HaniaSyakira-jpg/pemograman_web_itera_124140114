
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('Komponen TaskItem', () => {
  const dummyTask = {
    id: 1,
    title: 'Belajar React Testing',
    completed: false,
  };

  let mockDelete;
  let mockToggle;

  beforeEach(() => {
    mockDelete = jest.fn();
    mockToggle = jest.fn();
  });

  test('merender judul tugas dengan benar', () => {
    render(
      <TaskItem
        task={dummyTask}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    );

    expect(
      screen.getByText('Belajar React Testing')
    ).toBeInTheDocument();
  });

  test('memanggil onToggleComplete saat checkbox diklik', () => {
    render(
      <TaskItem
        task={dummyTask}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  test('memanggil onDelete saat tombol hapus diklik', () => {
    render(
      <TaskItem
        task={dummyTask}
        onDelete={mockDelete}
        onToggleComplete={mockToggle}
      />
    );

    const deleteButton = screen.getByRole('button', {
      name: /hapus/i,
    });

    fireEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});
