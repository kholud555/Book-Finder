

// API Key 
const API_KEY = 'AIzaSyCt-2icf-GqEAaM-Toz_2BrOL0tmcJQYI8';

/**
  1- main api Fetch books api  based on search term
        1-search  using a search () >>>>> defult fantsy 
        2- Maximum number of results to return (default: 10)
        3- Promise resolving to book data
 */
async function fetchBooks(search = 'fantasy', maxResults = 10) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}&key=${API_KEY}&maxResults=${maxResults}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

/**
 2- fetch specific author books uing api  call name autehr
 >>>>>>>>>>>>
           1- Author name
           2- Maximum number results to return (default: 10)

 */
async function fetchBooksByAuthor(author, maxResults = 10) {
  return fetchBooks(`inauthor:${author}`, maxResults);
}

/**
 3- Search books by quer
 ........>>>>>>>>>>>>
                 1-Search query
                2-Maximum results to return (default: 10)
 
 */
async function searchBooks(query, maxResults = 10) {
  return fetchBooks(query, maxResults);
}


// // Calling the function and displaying the data in the console
// fetchData('harry potter', 30).then(data => {
//     if (data && data.items) {
//       data.items.forEach((item, index) => {
//         console.log(`Book ${index + 1}:`);
//         console.log(`Title: ${item.volumeInfo.title}`);
//         console.log(`Authors: ${item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'N/A'}`);
//         console.log(`Publisher: ${item.volumeInfo.publisher || 'N/A'}`);
//         console.log('------------------------');
//       });
//     } else {
//       console.log('No data found or an error occurred.');
//     }
//   });
