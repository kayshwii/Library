const table = document.getElementById('library-table');

const myLibrary = [];

function Book(title, author, id, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

let addBookToLibrary = (title, author, pages, read) => {
    let id = crypto.randomUUID();
    const book = new Book(title, author, id, pages, read);
    myLibrary.push(book);
}

addBookToLibrary('Queen of the Damned', 'Anne Rice', 480, true);
addBookToLibrary('Interview with a Vampire', 'Anne Rice', 369, true);
addBookToLibrary('The Vampire Lestat', 'Anne Rice', 481, true);
console.log(myLibrary);
myLibrary.forEach((book) => {
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.read}</td>`;
    table.appendChild(tableRow)
})
