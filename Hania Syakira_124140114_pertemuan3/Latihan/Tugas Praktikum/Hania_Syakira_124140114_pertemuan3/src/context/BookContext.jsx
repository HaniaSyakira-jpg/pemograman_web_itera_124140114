import {
  createContext,
  useContext,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import useBookStats from '../hooks/useBookStats';

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage(
    'personal-books',
    []
  );

  const addBook = useCallback((bookData) => {
    const newBook = {
      ...bookData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setBooks((previousBooks) => [
      ...previousBooks,
      newBook,
    ]);
  }, [setBooks]);

  const updateBook = useCallback((id, bookData) => {
    setBooks((previousBooks) =>
      previousBooks.map((book) =>
        book.id === id ? { ...book, ...bookData } : book
      )
    );
  }, [setBooks]);

  const deleteBook = useCallback((id) => {
    setBooks((previousBooks) =>
      previousBooks.filter((book) => book.id !== id)
    );
  }, [setBooks]);

  const stats = useBookStats(books);

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        updateBook,
        deleteBook,
        stats,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useBooks() {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error(
      'useBooks harus digunakan di dalam BookProvider'
    );
  }

  return context;
}