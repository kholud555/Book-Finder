/**
  Main application script
 */
// Global state
const state = {
  currentPage: 'home'
};

/**
    Initialize the application
 */
function initApp() {

  //1- Add event listeners
  //2- Load initial page
  setupNavigation();
     
   navigateToPage('home');

}

/**
--->>>>> Set up navigation event listeners
 */
function setupNavigation() {
  const navLinks = document.querySelectorAll('[data-page]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      navigateToPage(page);
    });
  });
}

/**
      1- Navigate to a dertmine  page
2- Page names (1-'home' or 2-'authors')
 */
function navigateToPage(page) {
  state.currentPage = page;
  // Update active nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === page) {
      link.classList.add('active');
    }
  });
  
  // Load page content
  switch (page) {
    case 'home':
      initHomePage();
      break;
    case 'authors':
      initAuthorsPage();
      break;
    default:
      initHomePage();
  }
}
document.addEventListener('DOMContentLoaded', initApp);