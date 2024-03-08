import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const ViewerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [oneBook, setBook] = useState({});
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}/details`)
            .then(res => setBook(res.data.book))
            .catch(err => console.log(err));

        // Fetch favorites for the book
        axios.get(`http://localhost:8000/api/books/${id}/favorites`)
            .then(res => setFavorites(res.data.favorites))
            .catch(err => console.log(err));
    }, [id]);

    // Function to add the book to favorites
    const addToFavorites = () => {
        // Make API call to add book to favorites
        axios.post(`http://localhost:8000/api/books/${id}/favorites/add`)
            .then(res => {
                // If successful, update favorites state
                setFavorites([...favorites, res.data.favorite]);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Link to="/api/books" className="ml-auto">Back to Home</Link>

            <h1>Title: {oneBook.title}</h1>
            <p>Description: {oneBook.description}</p>
            <p>Added By: {oneBook.suggestedBy && `${oneBook.suggestedBy.firstName} ${oneBook.suggestedBy.lastName}`}</p>
            <p>Date Added: {oneBook.createdAt}</p>

            {/* Display users who have favorited the book */}
            <p>Favorited By:</p>
            <ul>
                {favorites.map(favorite => (
                    <li key={favorite._id}>{favorite.firstName} {favorite.lastName}</li>
                ))}
            </ul>

            {/* Add to favorites button */}
            <button className="btn btn-info" onClick={addToFavorites}>Add to Favorites</button>
        </div>
    );
};

export default ViewerDetails;
