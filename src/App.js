import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(11);

  const scrollHandler = e => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 
    && photos.length < totalCount) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (fetching) {
      axios.get(`http://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
      .then( response => {
        setPhotos([...photos, ...response.data]);
        setCurrentPage(prevPage => prevPage + 1);
        setTotalCount(response.headers['x-total-count']);
      })
      .finally( setFetching(false));
    }  
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    
    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div className="app">
      { photos.map( photo => 
        <div className="photo" key={photo.id}>
          <div className="title">{photo.title}</div>
          <img src={photo.thumbnailUrl} alt={photo.title}/>
        </div>  
      )}
    </div>
  );
}

export default App;
