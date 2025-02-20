import React from "react";
import "./App.css"; // Import global styles
import ProfileForm from "./components/ProfileForm"; // Import ProfileForm
import ThemeToggle from "./components/ThemeToggle"; // Import ThemeToggle

// TODO: When useContext is implemented, apply the theme dynamically to this container

function App() {
  return (
    <div className="app-container">
      <h1>Standard Hooks in React</h1>
      <ProfileForm />
      <ThemeToggle />
    </div>
  );
}

export default App;
