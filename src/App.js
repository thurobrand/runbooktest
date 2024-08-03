import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import './App.css';

const octokit = new Octokit({
  auth: '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'
});

function App() {
  const [commits, setCommits] = useState([]);
  const [runbookText, setRunbookText] = useState('');

  useEffect(() => {
    fetchCommits();
  }, []);

  const fetchCommits = async () => {
    try {
      const response = await octokit.repos.listCommits({
        owner: 'thurobrand',
        repo: 'runbooktest',
        sha: 'Version1'
      });
      setCommits(response.data);
    } catch (error) {
      console.error('Error fetching commits:', error);
    }
  };

  const generateRunbook = () => {
    // Implement runbook generation logic here
  };

  const buildRunbook = () => {
    // Implement build logic here
  };

  return (
    <div className="App">
      <nav className="left-nav">
        <ul>
          <li>Database</li>
        </ul>
      </nav>
      <div className="main-content">
        <div className="top-pane">
          <textarea
            value={runbookText}
            onChange={(e) => setRunbookText(e.target.value)}
            placeholder="Enter runbook text here..."
          />
          <button onClick={generateRunbook}>Generate Runbook</button>
          <button onClick={buildRunbook}>Build</button>
        </div>
        <div className="bottom-pane">
          <h2>Commits</h2>
          <ul>
            {commits.map((commit) => (
              <li key={commit.sha}>
                <input type="checkbox" />
                <span>{commit.commit.message}</span>
                <a href={commit.html_url} target="_blank" rel="noopener noreferrer">
                  View
                </a>
                <span>{new Date(commit.commit.author.date).toLocaleDateString()}</span>
                <span>{commit.sha.substring(0, 7)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;