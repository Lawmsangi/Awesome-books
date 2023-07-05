/* eslint-disable */
class Book{
    constructor(title,author) {
        this.title = title;
        this.author = author;
    }
}

//UI handler
class UI{
    static displayBook() {
        const books = Store.getBooks();
        books.forEach(book =>{
            UI.addBookToUI(book.title,book.author) 
        })
        
    }

    static addBookToUI(title,author) {
        const bookList = document.getElementById('book-list');
        const bookListItem = document.createElement('li');
        bookListItem.className = 'book-list-item';
        bookListItem.innerHTML = `"<span class='span-book' >${title}</span>"
                                    <span class="span-book">by</span> 
                                    <span class="span-book"> ${author}</span>
                                    <button class="remove">Remove</button>`
        bookList.appendChild(bookListItem)
    }   

    static removeBookFromUI(e) {
        e.target.parentElement.remove();
    }

}

//local storage
class Store{
    static getBooks() {
        const book = JSON.parse(localStorage.getItem('books'));
        const books = book || [];
        return books;
    }

    static addBookToLS(title, author){
        const books = Store.getBooks();
        const book = new Book(title, author);
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBookFromLS(title,author) {
        const books = Store.getBooks();
         const book = books.filter(book => book.title !== title.innerHTML && book.author !== author.innerHTML);
        localStorage.setItem('books', JSON.stringify(book));
    }

}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)
//add event listeners
const btn = document.getElementById('btn');
const form = document.querySelector('.form-div');
btn.addEventListener('click', (e) => {
  if (!form.checkValidity()) {
    return; 
  }

  e.preventDefault();
  const title = document.getElementById('title');
  const author = document.getElementById('author');

  UI.addBookToUI(title.value, author.value);
  Store.addBookToLS(title.value, author.value);
  title.value = '';
  author.value = '';
});


//remove book
document.getElementById('book-list').addEventListener('click', e =>{
    if(e.target.classList.contains('remove')){
        UI.removeBookFromUI(e);
        Store.removeBookFromLS(
            e.target.parentElement.children[0],
            e.target.parentElement.children[2]
        )
    }
})


// Create a new Date object
const currentDate = new Date();

// Display the current date in the browser
const dateString =currentDate.toLocaleString();
document.getElementById("date").innerHTML = dateString;


const showBooksSec = document.getElementById('book-list-section');
const addBooksSec = document.getElementById('add-book-section');
const contactSec = document.getElementById('contact-section');
const showBooks = document.getElementById('show-list');
const showAdd = document.getElementById('show-add');
const showContact = document.getElementById('show-contact');
showBooks.addEventListener('click',()=>{
    showBooksSec.style.display = 'flex';
    addBooksSec.style.display = 'none';
    contactSec.style.display = 'none';
})
showAdd.addEventListener('click',()=>{
    addBooksSec.style.display = 'flex';
    showBooksSec.style.display = 'none';
    contactSec.style.display = 'none';
})
showContact.addEventListener('click',()=>{
    contactSec.style.display = 'flex';
    addBooksSec.style.display = 'none';
    showBooksSec.style.display = 'none';
})
UI.displayBook()