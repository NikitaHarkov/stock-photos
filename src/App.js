import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';
import { getUrl } from './utils';

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');

  const fetchImages = async () => {
    setLoading(true);
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    const url = getUrl(query, urlPage, urlQuery);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(oldPhotos => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query) {
      setPage(1);
      fetchImages();
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage(oldPage => {
          if (oldPage === 0) {
            return oldPage + 2;
          }
          return oldPage + 1;
        });
      }
    });
    return () => {
      window.removeEventListener('scroll', event);
    };
  }, []);

  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            className='form-input'
            placeholder='search'
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map(photo => {
            if (photos.includes(photo.id)) {
              return null;
            } else {
              return <Photo key={photo.id} {...photo} />;
            }
          })}
        </div>
        {loading && <h2 className='loading'>Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
