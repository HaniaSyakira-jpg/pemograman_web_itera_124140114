import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from './BookFilter';

describe('BookFilter', () => {
  test('menampilkan input pencarian dan pilihan status', () => {
    render(
      <BookFilter
        search=""
        onSearchChange={vi.fn()}
        statusFilter="semua"
        onStatusChange={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Cari Buku')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter Status')).toBeInTheDocument();
  });

  test('memanggil fungsi ketika kata pencarian berubah', () => {
    const onSearchChange = vi.fn();

    render(
      <BookFilter
        search=""
        onSearchChange={onSearchChange}
        statusFilter="semua"
        onStatusChange={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText('Cari Buku'), {
      target: { value: 'Laskar Pelangi' },
    });

    expect(onSearchChange).toHaveBeenCalledWith('Laskar Pelangi');
  });

  test('memanggil fungsi ketika filter status berubah', () => {
    const onStatusChange = vi.fn();

    render(
      <BookFilter
        search=""
        onSearchChange={vi.fn()}
        statusFilter="semua"
        onStatusChange={onStatusChange}
      />
    );

    fireEvent.change(screen.getByLabelText('Filter Status'), {
      target: { value: 'baca' },
    });

    expect(onStatusChange).toHaveBeenCalledWith('baca');
  });
});