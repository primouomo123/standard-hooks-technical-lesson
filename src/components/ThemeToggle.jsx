import React from "react";

function ThemeToggle() {
  // TODO: Import and use useContext to access global theme state
  // TODO: Replace the hardcoded theme value with the dynamic theme from context

  return (
    <div>
      <h2>Theme Toggle</h2>
      <p>Current Theme: Light</p>
      {/* TODO: Make this button toggle between light and dark mode using useContext */}
      <button style={{ backgroundColor: "#000", color: "#fff" }}>
        Toggle Theme
      </button>
    </div>
  );
}

export default ThemeToggle;
