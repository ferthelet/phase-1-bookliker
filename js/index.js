/*

You will be using the following backend to get the list of books. The expectation here
is that you will include the following features:

List Books
When the page loads, get a list of books from http://localhost:3000/books and display
their titles by creating a li for each book and adding each li to the ul#list element.

Show Details
When a user clicks the title of a book, display the book's thumbnail, description,
and a list of users who have liked the book. This information should be displayed in the div#show-panel element.

Like a Book
A user can like a book by clicking on a button. Display a LIKE button along with the book
details. When the button is clicked, send a PATCH request to http://localhost:3000/books/:id with
an array of users who like the book, and add a new user to the list.

*/


document.addEventListener("DOMContentLoaded", function() {});

const bookList = document.querySelector("#list");
const bookShow = document.querySelector("#show-panel");

const getBooks = () => {
    fetch("http://localhost:3000/books")
        .then(resp => resp.json())
        .then(books => {
        books.forEach(book => {
            renderBook(book);
        });
        });
    }

const renderBook = (book) => {
    const bookLi = document.createElement("li");
    bookLi.innerText = book.title;
    bookList.append(bookLi);

    bookLi.addEventListener("click", () => {
        showBook(book);
    });
}

const showBook = (book) => {
    bookShow.innerHTML = "";
    const bookImg = document.createElement("img");
    bookImg.src = book.img_url;
    bookShow.append(bookImg);

    const bookDesc = document.createElement("p");
    bookDesc.innerText = book.description;
    bookShow.append(bookDesc);

    const bookUsers = document.createElement("ul");
    bookShow.append(bookUsers);

    book.users.forEach(user => {
        const userLi = document.createElement("li");
        userLi.innerText = user.username;
        bookUsers.append(userLi);
    });

    const likeBtn = document.createElement("button");
    likeBtn.innerText = "Like";
    bookShow.append(likeBtn);

    likeBtn.addEventListener("click", () => {
        likeBook(book);
    });
}

const likeBook = (book) => {
    const users = book.users;
    const me = {"id":1, "username":"pouros"};
    users.push(me);

    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({users: users})
    })
        .then(resp => resp.json())
        .then(book => {
            showBook(book);
        });
}

getBooks();


