import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const UserProfile = ({ match }) => {
  const { username } = match.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [username]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.login}</h1>
      <img src={user.avatar_url} alt={user.login} width="200" />
      <p>{user.bio}</p>
      <p>
        <strong>Followers:</strong> {user.followers}
      </p>
      <p>
        <strong>Following:</strong> {user.following}
      </p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        View on GitHub
      </a>
    </div>
  );
};

export default UserProfile;
