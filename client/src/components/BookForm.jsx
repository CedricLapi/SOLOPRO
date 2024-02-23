import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookForm = () => {
  const [book, setBook] = useState({
    title: '',
    description: ''
    
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  const formValidator = () => {
    let isValid = true;
    const newErrors = {};

    if (book.title.length <= 0) {
      newErrors.title = "Book title is required!";
      isValid = false;
    }

    if (book.description.length < 5) {
      newErrors.description = "Book description must be at least 5 characters long!";
      isValid = false;
    }

    if (book.description.length <= 0) {
      newErrors.description = "Book description is required!";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  // Create a book
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValidator()) {
      axios.post('http://localhost:8000/api/books/new', book)
        .then(res => {
          console.log(res);
          navigate('/api/books');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div>
        <h3 className='mx-auto'>Add A New Book</h3>

      {/*<Link to="/api/books" className="ml-auto">HOME</Link>*/}



      {errors.title && <p className="text-danger">{errors.title}</p>}
      {errors.description && <p className="text-danger">{errors.description}</p>}

      <form action="" className="col-md-6 offset-2" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" className="form-control" name="title" id="title" onChange={onChangeHandler} style={{ width: '500px'
         }} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" className="form-control" name="description" id="description" onChange={onChangeHandler} style={{ width: '500px',
        height: '150px' }} />
        </div>

        <button className="btn btn-info mt-3">Add</button>
      </form>
    </div>
  );
};

export default BookForm;