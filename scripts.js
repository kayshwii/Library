const table = document.getElementById('library-table');
const newButton = document.getElementById('new-button');
const submitButton = document.getElementById('submit');
const form = document.getElementById('book-form');
let titleForm = document.getElementById('title');
let authorForm = document.getElementById('author');
let pagesForm = document.getElementById('pages');
let readForm = document.getElementById('read');

let myLibrary = [];

function Book(title, author, id, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

Book.prototype.readToggle = function() {
    const readCheck = document.createElement('div');
    readCheck.innerHTML = this.read? '&#9989' : '&#10060';
    readCheck.className = this.read? 'read' : 'unread';
    readCheck.addEventListener('click', () => {
        this.read = !this.read;
        renderTable();
    });

    return readCheck;
}

let renderTable = () => {
    table.innerHTML = `<table id="library-table"><tr><th>Title</th><th>Author</th><th>Pages</th><th>Read</th><th>Delete</th></tr></table>`;
    myLibrary.forEach((book) => {
        const tableRow = document.createElement('tr');
        const readCell = document.createElement('td');
        readCell.appendChild(book.readToggle());
        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.setAttribute('value', book.id);
        deleteButton.addEventListener('click', () => {
            removeFromLibrary(deleteButton.value)
        });
        tableRow.innerHTML = `<td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>`;
        tableRow.appendChild(readCell);
        tableRow.appendChild(deleteCell);
        deleteCell.appendChild(deleteButton)
        table.appendChild(tableRow);
    });
    console.log(myLibrary);
}

let addBookToLibrary = (title, author, pages, read) => {
    let id = crypto.randomUUID();
    const book = new Book(title, author, id, pages, read);
    myLibrary.push(book);
}

let removeFromLibrary = (id) => {
    myLibrary = myLibrary.filter((book) => book.id !== id);
    renderTable();
}

newButton.addEventListener("click", () => {
    form.style.display = 'block';
    newButton.style.display = 'none';
});

submitButton.addEventListener("click", e => {
    e.preventDefault();
    form.style.display = 'none';
    newButton.style.display = 'block';
    addBookToLibrary(titleForm.value, authorForm.value, pagesForm.value, readForm.checked);
    titleForm.value = '';
    authorForm.value = '';
    pagesForm.value = '';
    readForm.checked = false;
    renderTable();
})


addBookToLibrary('Queen of the Damned', 'Anne Rice', 480, true);
addBookToLibrary('Interview with a Vampire', 'Anne Rice', 369, true);
addBookToLibrary('The Vampire Lestat', 'Anne Rice', 481, false);
renderTable();