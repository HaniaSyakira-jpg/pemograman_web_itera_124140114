import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';

describe('BookForm', () => {
  test('menampilkan formulir tambah buku', () => {
    render(<BookForm onSubmit={vi.fn()} />);

    expect(
      screen.getByRole('heading', { name: 'Tambah Buku Baru' })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Judul Buku/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nama Penulis/)).toBeInTheDocument();
  });

  test('menampilkan pesan jika judul dan penulis kosong', () => {
    render(<BookForm onSubmit={vi.fn()} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Tambah Buku' })
    );

    expect(
      screen.getByRole('alert')
    ).toHaveTextContent('Judul dan nama penulis wajib diisi.');
  });

  test('mengirim data buku yang valid', () => {
    const handleSubmit = vi.fn();

    render(<BookForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/Judul Buku/), {
      target: { value: 'Laskar Pelangi' },
    });

    fireEvent.change(screen.getByLabelText(/Nama Penulis/), {
      target: { value: 'Andrea Hirata' },
    });

    fireEvent.change(screen.getByLabelText('Status Buku'), {
      target: { value: 'baca' },
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Tambah Buku' })
    );

    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      status: 'baca',
      notes: '',
    });
  });

  test('menampilkan data buku ketika mode edit', () => {
    const book = {
      id: 'book-1',
      title: 'Bumi',
      author: 'Tere Liye',
      status: 'milik',
      notes: 'Novel favorit',
    };

    render(
      <BookForm
        initialBook={book}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/Judul Buku/)).toHaveValue('Bumi');
    expect(screen.getByLabelText(/Nama Penulis/)).toHaveValue('Tere Liye');

    expect(
      screen.getByRole('button', { name: 'Simpan Perubahan' })
    ).toBeInTheDocument();
  });
});