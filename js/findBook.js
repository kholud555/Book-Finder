const itemsPerPage = 6;
let currentPage = 1;
let allData = [];
let filteredData = [];

async function fetchData() {
  const response = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=api"
  );
  const data = await response.json();
  if (!data.items) {
    console.error("No items found in the response.");
    return;
  }
  allData = data.items.map((item) => {
    const info = item.volumeInfo;
    return {
      title: info.title || "Unknown",
      authors: info.authors || ["Unknown"],
      description: info.description || "No description available",
      publishedDate: info.publishedDate || "Unknown",
      thumbnail: info.imageLinks?.thumbnail || "No image",
      categories: info.categories || ["Unknown"],
    };
  });
  filteredData = allData;
  renderSection(currentPage);
  renderPagination();
}

function createCard(book) {
  const column = document.createElement("div");
  column.classList.add("col-md-4", "col-sm-6", "p-4");

  const card = document.createElement("div");
  card.classList.add("card", "mb-5", "shadow-lg", "rounded", "styleCard");
  column.appendChild(card);

  const img = document.createElement("img");
  img.src = book.thumbnail.replace("w200", "w500");
  img.classList.add("card-img-top", "img-fluid", "rounded", "styleImg", "mb-2");
  card.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  const title = document.createElement("h5");
  title.textContent = book.title;
  title.classList.add("card-title", "text-center", "fwp-bold");
  cardBody.appendChild(title);

  const author = document.createElement("small");
  author.textContent = book.authors.join(", ");
  author.classList.add("text-muted", "d-flex", "justify-content-start", "mb-2");

  const publishedDate = document.createElement("span");
  publishedDate.textContent = book.publishedDate;
  publishedDate.classList.add("ms-2");
  author.appendChild(publishedDate);
  cardBody.appendChild(author);

  const description = document.createElement("p");
  description.textContent = book.description;
  description.classList.add(
    "card-text",
    "text-muted",
    "mb-4",
    "multi-line-truncate"
  );
  cardBody.appendChild(description);

  const categories = document.createElement("span");
  categories.textContent = book.categories.join(", ");
  categories.classList.add("badge", "bg-primary");
  cardBody.appendChild(categories);

  card.appendChild(cardBody);

  return column;
}

function renderSection(page) {
  const cardsRow = document.getElementById("cardsRow");
  cardsRow.innerHTML = "";

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const itemsToDisplay = filteredData.slice(start, end);

  if (itemsToDisplay.length === 0) {
    const noResults = document.createElement("div");
    noResults.textContent = "No results found.";
    noResults.classList.add("text-center", "mt-5", "text-muted");
    cardsRow.appendChild(noResults);
    return;
  }

  itemsToDisplay.forEach((book) => {
    const card = createCard(book);
    cardsRow.appendChild(card);
  });
}

function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("btn", "btn-outline-primary", "mx-1");

    btn.addEventListener("click", () => {
      currentPage = i;
      renderSection(currentPage);
      renderPagination();
    });
    pagination.appendChild(btn);
  }
}

document.getElementById("searchInput").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  filteredData = allData.filter(
    (book) =>
      (book.title && book.title.toLowerCase().includes(searchTerm)) ||
      (book.authors.join(",") &&
        book.authors.join(",").toLowerCase().includes(searchTerm))
  );
  currentPage = 1;
  renderSection(currentPage);
  renderPagination();
});

onload = fetchData;
