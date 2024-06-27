import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../components/Search';
import '../App.css';

const Home = () => {
  const [repositories, setRepositories] = useState([]);
  const [searched, setSearched] = useState(false);

  const searchRepositories = async (query) => {
    try {
      setSearched(true);

      const response = await axios.get(`https://api.github.com/search/repositories?q=${query}`);
      setRepositories(response.data.items);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  useEffect(() => {
    if (searched) {
      document.body.classList.add('active');
    } else {
      document.body.classList.remove('active');
    }
  }, [searched]);

  return (
    <div>
      <h1>GitHub Explorer</h1>
      <Search onSearch={searchRepositories} />
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description}</p>
          </li>
        ))}
        {searched && repositories.length === 0 && <li>No repositories found. Please search again.</li>}
      </ul>
    </div>
  );
};

export default Home;
