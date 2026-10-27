import { useMemo } from 'react';

function useBookStats(books) {
  return useMemo(() => {
    const owned = books.filter(
      (book) => book.status === 'milik'
    ).length;

    const reading = books.filter(
      (book) => book.status === 'baca'
    ).length;

    const wishlist = books.filter(
      (book) => book.status === 'beli'
    ).length;

    return {
      total: books.length,
      owned,
      reading,
      wishlist,
      ownershipRate: books.length > 0
        ? Math.round((owned / books.length) * 100)
        : 0,
    };
  }, [books]);
}

export default useBookStats;