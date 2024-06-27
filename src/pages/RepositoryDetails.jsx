import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const RepositoryDetails = () => {
    const { owner, repo } = useParams();
    const [repository, setRepository] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepository = async () => {
            try {
                const response = await axios.get(
                    `https://api.github.com/repos/${owner}/${repo}`
                );
                setRepository(response.data);
            } catch (error) {
                console.error('Error fetching repository:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepository();
    }, [owner, repo]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!repository) {
        return <div>Repository not found</div>;
    }

    return (
        <div>
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
            <p>
                <strong>Stars:</strong> {repository.stargazers_count}
            </p>
            <p>
                <strong>Forks:</strong> {repository.forks_count}
            </p>
            <p>
                <strong>Open Issues:</strong> {repository.open_issues_count}
            </p>
        </div>
    );
};

export default RepositoryDetails;
