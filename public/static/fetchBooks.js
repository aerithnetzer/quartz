async function fetchBooks() {
  const query = `
  {
    list_books(
      where: {
        user_books: {
          user_id: {_eq: ##USER_ID##}
        }
      },
      distinct_on: book_id
      limit: 5
      offset: 0
    ) {
      book {
        title
        pages
        release_date
      }
    }
  }
  `;

  const response = await fetch(window.HARDCOVER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data.data.books;
}

async function displayBooks() {
  const books = await fetchBooks();
  const booksContainer = document.getElementById('books-container');

  books.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.innerHTML = `
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <img src="${book.coverImage}" alt="Cover Image of ${book.title}">
    `;
    booksContainer.appendChild(bookElement);
  });
}

document.addEventListener('DOMContentLoaded', displayBooks);
