import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookClubDashboard = () => {
    const [books, setBooks] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate('/api/users/register');
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/books')
            .then(res => {
                // Populate the "suggestedBy" field
                const populatedBooks = res.data.books.map(book => {
                    return axios.get(`http://localhost:8000/api/users/${book.suggestedBy}`)
                        .then(userRes => {
                            const suggestedBy = userRes.data.user;
                            return { ...book, suggestedBy };
                        });
                });
                Promise.all(populatedBooks)
                    .then(booksWithSuggestedBy => setBooks(booksWithSuggestedBy))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, []);

    const toggleFavorite = (bookId) => {
        setFavorites(prevFavorites => {
            if (prevFavorites.includes(bookId)) {
                return prevFavorites.filter(id => id !== bookId);
            } else {
                return [...prevFavorites, bookId];
            }
        });
    };

    const navigateToBookForm = () => {
        navigate("/api/books/new");
    };

    const navigateToEditBook = (_id) => {
        if (_id) {
            navigate(`/api/books/${_id}/edit`);
        }
    };

    return (
        <div>
            <button className="btn btn-danger" onClick={logout}>Log Out</button>
            <button className="btn btn-info offset-9 mt-5" onClick={navigateToBookForm}>Add a New Book</button>
            <h3 className='mx-auto'>All Books</h3>
            <ul className="col-md-11 mx-auto mt-4">
                {books.map(book => (
                    <li key={book._id}>
                        <h4>
                            <Link to={`/api/books/${book._id}/details`}>{book.title}</Link>
                            {book.suggestedBy && (
                                <p>Suggested by: {booksuggestedBy.firstName} {book.suggestedBy.lastName}</p>
                            )}
                            <button className="btn btn-sm ml-2" onClick={() => toggleFavorite(book._id)}>
                                {favorites.includes(book._id) ? "Remove from Favorites" : "Add to Favorites"}
                            </button>
                        </h4>
                        <button className="btn btn-info mr-3" onClick={() => navigateToEditBook(book._id)}>Edit</button>
                    </li>
                ))}
            </ul>
            {users.map(user => (
                <div key={user._id}>
                    <h3>{user.firstName} {user.lastName}</h3>
                    <ul>
                        {user.uploadedBooks.map(book => (
                            <li key={book._id}>
                                <h4>{book.title}</h4>
                                {/* Display book details */}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

        </div>
    );
};

export default BookClubDashboard;
