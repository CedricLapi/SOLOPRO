import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookClubDashboard = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate('/api/users/register')})
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/books')
            .then(res => setBooks(res.data.books))
            .catch(err => console.log(err));
    }, []);

    const navigateToBookForm = () => {
        navigate("/api/books/new");
    };

    /*const navigateToEditBook = (_id) => {
        if (_id) {
            navigate(`/api/books/${_id}/edit`);
        }
    };*/

    return (
        <div>
             <button className="btn btn-danger" onClick={logout}>Log Out</button>

            {/*<Link to="/api/books" className="ml-auto">HOME</Link>*/}
            <button className="btn btn-info offset-9 mt-5" onClick={navigateToBookForm}>Add a New Book</button>


            <h3 className='mx-auto'>All Books</h3>

            <ul className="col-md-11 mx-auto mt-4">
                
                <li>
                    {books.map(book => (
                        <li key={book._id}>
                            <h4>
                                <Link to={`${book._id}/details`}>{book.title}</Link>
                            </h4>
                            
                            {/*
                                <button className="btn btn-info mr-3" onClick={() => navigateToEditBook(book._id)}>Edit</button>
                    */}
                        </li>
                    ))}
                </li>
            </ul>
        </div>
    );
};

export default BookClubDashboard;
