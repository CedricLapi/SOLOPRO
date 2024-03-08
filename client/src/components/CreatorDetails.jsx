

import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({});
    const [user, setUser] = useState({});
    const [isCreator, setIsCreator] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}/details/c`)
            .then(res => {
                setBook(res.data.book);
                if (res.data.book.suggestedBy === user._id) {
                    setIsCreator(true);
                }
            })
            .catch(err => console.log(err));

        // Fetch logged-in user details
        axios.get('http://localhost:8000/api/user/profile')
            .then(res => setUser(res.data.user))
            .catch(err => console.log(err));
    }, [id, user._id]);

    const deleteBook = () => {
        axios.delete(`http://localhost:8000/api/books/${id}`)
            .then(res => {
                console.log(res);
                navigate('/api/books');
            })
            .catch(err => console.log(err));
    };

    const handleEdit = () => {
        navigate(`/api/books/${id}/edit`);
    };

    return (
        <div>
            <h1>Title: {book.title}</h1>
            <p>Description: {book.description}</p>
            <p>Uploader: {book.suggestedBy && `${book.suggestedBy.firstName} ${book.suggestedBy.lastName}`}</p>
            <p>Created At: {new Date(book.createdAt).toLocaleString()}</p>
            <p>Last Updated At: {new Date(book.updatedAt).toLocaleString()}</p>
            <h4>Users who liked the book:</h4>
            <ul>
                {book.likes && book.likes.map((user, index) => (
                    <li key={index}>{user.firstName} {user.lastName}</li>
                ))}
            </ul>
            {isCreator && (
                <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={deleteBook}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default CreatorDetails;
