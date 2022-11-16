const bookListEl = document.querySelector(".book_list");
const formEl = document.querySelector(".form");
const searchInputEl = document.querySelector(".search_input");
const sortSelectEl = document.querySelector(".sort_select");
const languageSelectEl = document.querySelector(".language_select");
const bookYear = document.querySelector(".year_input");
const languages = [];

// getting languages
books.forEach((item) => {
  if (!languages.includes(item.language)) {
    languages.push(item.language);
  }
});
languages.sort(
  (a, b) => a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0)
);

// rendering books
function renderBooks(book, regex = "") {
  bookListEl.innerHTML = "";
  const bookTemplate = document.querySelector(".book_template").content;
  const bookFragment = document.createDocumentFragment();
  book.forEach((item) => {
    const clonedBookTemplate = bookTemplate.cloneNode(true);
    clonedBookTemplate.querySelector(".book_img").src = item.imageLink;
    if (regex.source != "(?:)" && regex) {
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

// rendering languages part
function renderLanguage() {
  const langFragment = document.createDocumentFragment();
  languages.forEach((item) => {
    const newLangOption = document.createElement("option");
    newLangOption.textContent = item;
    newLangOption.value = item;
    langFragment.appendChild(newLangOption);
  });
  languageSelectEl.appendChild(langFragment);
}

function searchBooksRendering(search) {
  const filteredBooks = books.filter((item) => {
    const headerSort =
      item.title.match(search) &&
      (languageSelectEl.value == "all" ||
        item.language.includes(languageSelectEl.value)) &&
      (bookYear == "" || item.year <= Number(bookYear.value));
    return headerSort;
  });
  return filteredBooks;
}

function sortSelectFunc(sortArr, sortType) {
  if (sortType == "a-z") {
    sortArr.sort((a, b) => {
      return (
        a.title.toLowerCase().charCodeAt(0) -
        b.title.toLowerCase().charCodeAt(0)
      );
    });
  }
  if (sortType == "z-a") {
    sortArr.sort((a, b) => {
      return (
        b.title.toLowerCase().charCodeAt(0) -
        a.title.toLowerCase().charCodeAt(0)
      );
    });
  }
  if (sortType == "latest") {
    sortArr.sort((a, b) => b.year - a.year);
  }
  if (sortType == "oldest") {
    sortArr.sort((a, b) => a.year - b.year);
  }
  if (sortType == "lesspages") {
    sortArr.sort((a, b) => a.pages - b.pages);
  }
  if (sortType == "morepages") {
    sortArr.sort((a, b) => b.pages - a.pages);
  }
}
formEl.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const searchValue = searchInputEl.value.trim();
  const searchRegex = new RegExp(searchValue, "gi");
  const searchRender = searchBooksRendering(searchRegex);
  if (searchRender.length > 0) {
    sortSelectFunc(searchRender, sortSelectEl.value);
    renderBooks(searchRender, searchRegex);
  } else {
    bookListEl.innerHTML = "Not found!";
  }
});
renderLanguage();
renderBooks(books);
