import './App.css';
import React, { useState, useEffect } from 'react';

// TODO: import your context from 'hooks/ThemeContext' later if needed

function App() {
  // 1. useRef Example: Store and manipulate a DOM element
  // const inputRef = useRef(null);

  // 2. useId Example: Generate a unique ID for form labeling
  // const generatedId = useId();

  // For demonstration, we have some state:
  const [userName, setUserName] = useState('Guest');

  // Basic effect to update document title with userName (not required, just a demo)
  useEffect(() => {
    document.title = `Welcome, ${userName}`;
  }, [userName]);

  return (
    <div style={{ margin: '2rem' }}>
      <h1>Hello, {userName}!</h1>
      <label htmlFor="userNameInput">Update Name:</label>
      <input
        id="userNameInput"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <hr />
      <p>Use this section to experiment with <strong>useRef</strong> and <strong>useId</strong>:</p>

      {/* 
        TODO: For useRef
        1. Create a ref for an input element (e.g., inputRef).
        2. Use a useEffect to focus that input on load.
      */}

      {/* 
        TODO: For useId
        1. Generate a unique ID with useId.
        2. Apply the ID to a label/input pair to ensure they are linked.
      */}
    </div>
  );
}

export default App;
