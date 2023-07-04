function Book(title, author) {
  this.title = title;
  this.author = author;
}

function getBooks() {
  const book = JSON.parse(localStorage.getItem('books'));
  const books = book || [];
  return books;
}

function addBookToUI(title, author) {
  const bookList = document.getElementById('book-list');
  const bookListItem = document.createElement('li');
  bookListItem.className = 'book-list-item';
  bookListItem.innerHTML = `<span>${title}</span> <br> <span>${author}</span> <br> <button class="remove">Remove</button>`;
  bookList.appendChild(bookListItem);
}

function addBookToLS(title, author) {
  const books = getBooks();
  const book = new Book(title, author);
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBookFromUI(e) {
  e.target.parentElement.remove();
}

function removeBookFromLS(title, author) {
  const books = getBooks();
  const book = books.filter((book) => book.title !== title.innerHTML
    && book.author !== author.innerHTML);
  localStorage.setItem('books', JSON.stringify(book));
}

// add event listeners
const btn = document.getElementById('btn');
btn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  addBookToUI(title.value, author.value);
  addBookToLS(title.value, author.value);
  title.value = '';
  author.value = '';
});

// remove book
document.getElementById('book-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    removeBookFromUI(e);
    removeBookFromLS(
      e.target.parentElement.children[0],
      e.target.parentElement.children[2],
    );
  }
});

function displayBook() {
  const books = getBooks();
  books.forEach((book) => {
    addBookToUI(book.title, book.author);
  });
}

displayBook();