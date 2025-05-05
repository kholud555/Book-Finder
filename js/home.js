/**
 * Home page functionality
 */

function initHomePage() {
  const contentContainer = document.getElementById('content-container');
  contentContainer.innerHTML = createHomeContent();
  setupHomeEventListeners();
}

function createHomeContent() {
  return `
    <div class="hero-section position-relative d-flex align-items-center text-white">
      <div class="position-absolute w-100 h-100 overlay"></div>
      
      <div class="container position-relative z-1">
        <div class="row">
          <div class="col-lg-8 col-md-10">
            <h1 class="display-3 fw-bold mb-3">Discover Wings of Fire</h1>
            <p class="lead mb-4">Explore the magical world of dragons and adventure</p>
            <a href="#" class="btn btn-primary btn-lg px-4 py-2" id="explore-authors-btn">
              Explore Authors
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function setupHomeEventListeners() {
  const exploreBtn = document.getElementById('explore-authors-btn');
  exploreBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    navigateToPage('authors');
  });
}