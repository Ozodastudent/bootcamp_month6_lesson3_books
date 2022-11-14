const formEl = document.querySelector(".form");
const searchInputEl = document.querySelector(".search_input");
const sortSelectEl = document.querySelector(".sort_select");
const bookListEl = document.querySelector(".book_list");

function renderBooks(kino, regex = "") {
  bookListEl.innerHTML = "";
  const bookTemplate = document.querySelector(".book_template").content;
  const bookFragment = document.createDocumentFragment();
  kino.forEach((item) => {
    const clonedBookTemplate = bookTemplate.cloneNode(true);
    clonedBookTemplate.querySelector(".book_img").src = item.imageLink;
    if (regex.source != "?:" && regex) {
      clonedBookTemplate.querySelector(".book_title").innerHTML =
        item.title.replace(
          regex,
          `<mark class="bg-warning">${regex.source.toLowerCase()}</mark>`
        );
    } else {
      clonedBookTemplate.querySelector(".book_title").textContent = item.title;
    }
    clonedBookTemplate.querySelector(".author").textContent = item.author;
    clonedBookTemplate.querySelector(".year_text").textContent = item.year;
    clonedBookTemplate.querySelector(".pages_text").textContent = item.pages;
    clonedBookTemplate.querySelector(".language_text").textContent =
      item.language;
    clonedBookTemplate.querySelector(".wikipedia").href = item.link;
    bookFragment.appendChild(clonedBookTemplate);
  });
  bookListEl.appendChild(bookFragment);
}

function searchBooks(search) {
  const filteredBooks = books.filter((item) => {
    const headerSort = item.title.match(search);
    return headerSort;
  });
  return filteredBooks;
}

function sortSelect(sortArr, sortType) {
  if (sortType == "a-z") {
    sortArr.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase) return 1;
      if (a.title.toLowerCase() < b.title.toLowerCase) return -1;
      return 0;
    });
  }
  if (sortType == "z-a") {
    sortArr.sort((a, b) => {
      return (
        a.title.toLowerCase().charCodeAt(0) -
        b.title.toLowerCase().charCodeAt(0)
      );
    });
  }
  if (sortType == "latest") {
    sortArr.sort((a, b) => a.year - b.year);
  }
  if (sortType == "oldest") {
    sortArr.sort(function (a, b) {
      return b.year - a.year;
    });
  }
}

formEl.addEventListener("submit", function (evt) {
  evt.preventDefault(0);
  const searchValue = searchInputEl.value;
  const searchRegex = new RegExp(searchValue, "gi");
  const searchRender = searchBooks(searchRegex);
  if (searchRender.length > 0) {
    renderBooks(searchRender, searchRegex);
  } else {
    bookListEl.innerHTML = "Not found!";
  }
});

renderBooks(books.slice(0, 100));
