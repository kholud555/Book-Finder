/**
 * Authors page functionality
 */

function initAuthorsPage() {
  const contentContainer = document.getElementById('content-container');
  contentContainer.innerHTML = createAuthorsContent();
  setupAuthorsEventListeners();
  loadInitialAuthors();
}

function createAuthorsContent() {
  return `
    <div class="authors-header py-5 text-center bg-light">
      <div class="container">
        <h1 class="display-5 fw-bold mb-3">Authors</h1>
        <p class="lead mb-4">Discover the authors of the Wings of Fire series</p>
      </div>
    </div>
    
    <div class="container py-5">
      <div class="search-bar my-4">
        <form id="authors-search-form" class="d-flex">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for authors or books..." id="authors-search-input">
            <button class="btn btn-primary" type="submit">
              <i class="fas fa-search me-1"></i>
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
      
      <div id="author-list-container">
        <!-- Content will be loaded via JavaScript -->
      </div>
    </div>
  `;
}

function setupAuthorsEventListeners() {
  const searchForm = document.getElementById('authors-search-form');
  searchForm?.addEventListener('submit', handleAuthorsSearch);
}

function handleAuthorsSearch(e) {
  e.preventDefault();
  const searchInput = document.getElementById('authors-search-input');
  const query = searchInput.value.trim();
  
  if (query) {
    loadAuthorsBySearch(query);
  }
}

async function loadInitialAuthors() {
  const authorListContainer = document.getElementById('author-list-container');
  
  try {
    const data = await fetchBooks('fantasy fiction', 20);
    renderAuthorList(data.items || []);
  } catch (error) {
    console.error('Error loading initial authors:', error);
    showError(authorListContainer, 'Failed to load authors. Please try again later.');
  }
}

async function loadAuthorsBySearch(query) {
  const authorListContainer = document.getElementById('author-list-container');
  try {
    const data = await fetchBooks(query, 20);
    renderAuthorList(data.items || []);
  } catch (error) {
    console.error('Error searching authors:', error);
    showError(authorListContainer, 'Search failed. Please try again.');
  }
}

function renderAuthorList(books) {
  const authorListContainer = document.getElementById('author-list-container');
  const uniqueAuthors = getUniqueAuthors(books);
  
  if (!uniqueAuthors.length) {
    authorListContainer.innerHTML = `
      <div class="alert alert-info my-4" role="alert">
        No authors found. Try a different search query.
      </div>
    `;
    return;
  }
  
  const authorListHTML = `
    <div class="mt-5 mb-5">
      <h2 class="mb-4">Popular Authors</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="list-group author-list">
            ${uniqueAuthors.map(author => `
              <button class="list-group-item list-group-item-action d-flex align-items-center" data-author="${author}">
                <i class="fas fa-user me-2"></i>
                <span>${author}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <div class="col-md-8">
          <div id="author-books-container">
            <div class="d-flex flex-column justify-content-center align-items-center h-100 p-5 text-center">
              <i class="fas fa-user fa-3x text-secondary mb-3"></i>
              <h4>Select an author to see their books</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  authorListContainer.innerHTML = authorListHTML;
  
  //  click event listeners to author buttons
  const authorButtons = authorListContainer.querySelectorAll('[data-author]');
  authorButtons.forEach(button => {
    button.addEventListener('click', () => handleAuthorClick(button.dataset.author, button));
  });
}

async function handleAuthorClick(author, authorButton) {
  const authorButtons = document.querySelectorAll('.author-list .list-group-item');
  authorButtons.forEach(btn => btn.classList.remove('active'));
  authorButton.classList.add('active');
  
  const authorBooksContainer = document.getElementById('author-books-container');
  
  try {
    const data = await fetchBooksByAuthor(author);
    renderAuthorBooks(author, data.items || []);
  } catch (error) {
    console.error("Error fetching author's books:", error);
    showError(authorBooksContainer, `Error loading books by ${author}. Please try again.`);
  }
}

function renderAuthorBooks(author, books) {
  const authorBooksContainer = document.getElementById('author-books-container');
  
  if (!books.length) {
    authorBooksContainer.innerHTML = `
      <div class="alert alert-info my-4" role="alert">
        No books found for this author.
      </div>
    `;
    return;
  }
  
  const booksHTML = `
    <div>
      <h3 class="mb-3">Books by ${author}</h3>
      <div class="row row-cols-1 row-cols-md-2 g-4">
        ${books.slice(0, 6).map(book => `
          <div class="col">
            <div class="card h-100 border-0 shadow-sm">
              <div class="row g-0">
                <div class="col-4">
                  ${book.volumeInfo.imageLinks?.thumbnail 
                    ? `<img src="${book.volumeInfo.imageLinks.thumbnail}" alt="${book.volumeInfo.title}" class="img-fluid rounded-start h-100" style="object-fit: cover">` 
                    : `<div class="bg-light h-100 d-flex justify-content-center align-items-center rounded-start">
                         <i class="fas fa-book fa-2x text-secondary"></i>
                       </div>`
                  }
                </div>
                <div class="col-8">
                  <div class="card-body">
                    <h5 class="card-title">${book.volumeInfo.title}</h5>
                    ${book.volumeInfo.publishedDate 
                      ? `<p class="card-text small text-muted">Published: ${book.volumeInfo.publishedDate.substring(0, 4)}</p>`
                      : ''
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  authorBooksContainer.innerHTML = booksHTML;
}