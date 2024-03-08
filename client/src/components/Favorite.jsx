
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Favorite = () => {
    const { id } = useParams();
    const [oneBook, setBook] = useState({});
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Fetch book details and favorites for the book
        const fetchData = async () => {
            try {
                const bookResponse = await axios.get(`http://localhost:8000/api/books/${id}/details`);
                setBook(bookResponse.data.book);
                
                const favoritesResponse = await axios.get(`http://localhost:8000/api/books/${id}/favorites`);
                setFavorites(favoritesResponse.data.favorites);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    // Function to add the book to favorites
    const addToFavorites = async () => {
        try {
            const response = await axios.post(`http://localhost:8000/api/books/${id}/favorites/add`);
            setFavorites([...favorites, response.data.favorite]);
        } catch (error) {
            console.log(error);
        }
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

export default Favorite;
