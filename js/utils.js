/**
      Utility functions 
 */

/**
 Get a book cover image URL or return a placeholder
              ------   Book object from Google Books API
               ------Image URL or empty string
 */
function getBookCoverUrl(book) {
  return book.volumeInfo.imageLinks?.thumbnail || '';
}

/**
 * Truncate text to a specified length and add ellipsis if needed
        1- Text to truncat any length

 */
function truncateText(text, maxLength) {
  if (!text) return 'No description available.';
  return text.length > maxLength ? 
    `${text.substring(0, maxLength)}...` : 
    text;
}

/**
  Get unique authors from a list of books
       1-Get all authors from a List of bookس dsiplay  in list section author
       2-Maximum number of authors to return
 
 */

// Extract all authors from books
//2-Create a Set to get unique authors and convert back to array

function getUniqueAuthors(books, limit = 15) {
  const allAuthors = books
    .flatMap(book => book.volumeInfo.authors || [])
    .filter(author => author);  
  return [...new Set(allAuthors)].slice(0, limit);
}