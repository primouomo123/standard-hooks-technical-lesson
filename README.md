### Technical Lesson: Implementing Standard Hooks in React

Introduction
------------

React's standard hooks help simplify state management and user interactions within applications. In this lesson, we will explore three essential hooks:

-   useRef -- Allows us to interact with DOM elements directly without triggering re-renders.

-   useId -- Generates unique and stable IDs to improve accessibility.

-   useContext -- Manages global state, eliminating unnecessary prop drilling.

### Scenario: Why Use These Hooks?

Imagine we are building a user profile page that includes:

✅ An input field that is automatically focused when the page loads.\
✅ A form with labels and inputs, where each label requires a unique ID for accessibility.\
✅ A theme switcher, allowing users to toggle between light and dark themes globally.

We will progressively introduce each hook to refactor our code, making it cleaner, reusable, and more efficient.

* * * * *

Task 1: Set Up the Project
--------------------------

### Step 1: Clone the Starter Repository

We will use the following GitHub repository as our starting point:

🔗[  Standard Hooks Technical Lesson Repo](https://github.com/learn-co-curriculum/standard-hooks-technical-lesson)

#### Instructions to Set Up Locally:

1.  Fork the repository to your own GitHub account.

2.  Clone the forked repository to your local machine:

```bash
git  clone  https://github.com/YOUR-USERNAME/standard-hooks-technical-lesson.git
```

 3. Navigate into the project folder:

```bash
cd  standard-hooks-technical-lesson
```
4. Install dependencies and start the development server:

```bash
npm  install

npm  start
```
✅ This will start a React development server at <http://localhost:5173/>.

Task 2: Define the Problem
--------------------------

Our current application is a functional user profile page, but it has limitations:

-   The input field does not auto-focus when the page loads.

-   Labels and inputs do not have unique IDs, reducing accessibility.

-   Theme switching is hardcoded, meaning the user cannot dynamically change it.

### What We Need to Implement:

✅ Auto-focus the input field when the page loads (useRef).\
✅ Generate unique IDs for form labels (useId).\
✅ Allow theme toggling using global state (useContext).

* * * * *

Task 3: Develop the Code
------------------------

### Step 1: Create a New Git Feature Branch

To separate development from the main branch, create a new branch:

```bash
git  checkout  -b  feature-standard-hooks
```
### Step 2: Implement useRef for Input Focus

📌 Why?\
Normally, React manages elements through state, but sometimes we need to interact with a DOM element directly---like focusing an input field when the page loads. We use useRef to store a reference to an input and manipulate it without causing re-renders.

#### Modify ProfileForm.jsx to Use useRef

📁 File: src/components/ProfileForm.jsx

```jsx
import  React,  {  useState,  useRef,  useEffect  }  from  "react";

function  ProfileForm()  {

  const  [userName,  setUserName]  =  useState("");

  // ✅ Step 1: Create a ref for the input field

  const  inputRef  =  useRef(null);

  // ✅ Step 2: Use useEffect to focus the input field when the component mounts

  useEffect(()  =>  {

inputRef.current.focus();

  },  []);

  return  (

<div>

    <h2>Profile  Form</h2>

    <label>Name:</label>

    {/* ✅ Step 3: Attach the ref to the input */}

    <input

      ref={inputRef}

      type="text"

      value={userName}

      onChange={(e)  =>  setUserName(e.target.value)}

    />

    <p>Current  Name:  {userName  ||  "Guest"}</p>

</div>

  );

}

export  default  ProfileForm;
```

✅ Test It:

-   Refresh the page---your cursor should automatically appear in the input field.

### Step 3: Implement useId for Unique Input IDs

📌 Why?
In order to meet accessibility standards, each label must reference a unique id on its corresponding input. Hardcoding these IDs can lead to duplicates or conflicts across components. By using useId, React ensures that each input field is assigned a stable, unique identifier, preserving proper label-to-input mapping and preventing accidental ID collisions.

#### Modify ProfileForm.jsx to Use useId

📁 File: src/components/ProfileForm.jsx

```jsx
import  React,  {  useState,  useRef,  useEffect,  useId  }  from  "react";

function  ProfileForm()  {

  const  [userName,  setUserName]  =  useState("");

  const  inputRef  =  useRef(null);

  // ✅ Step 1: Generate a unique ID for the input field

  const  inputId  =  useId();

  useEffect(()  =>  {

inputRef.current.focus();

  },  []);

  return  (

<div>

    <h2>Profile  Form</h2>

    {/* ✅ Step 2: Use the generated ID in the label and input */}

    <label  htmlFor={inputId}>Name:</label>

    <input

      id={inputId}

      ref={inputRef}

      type="text"

      value={userName}

      onChange={(e)  =>  setUserName(e.target.value)}

    />

    <p>Current  Name:  {userName  ||  "Guest"}</p>

</div>

  );

}

export  default  ProfileForm;
```

✅ Test It:

-   Open DevTools → Elements Tab

-   Check that the input's id matches the label's htmlFor.

### Step 4: Implement useContext for Theme Switching

📌 Why?\
Without useContext, passing theme state between multiple components requires prop drilling. Instead, we'll use context to store and update theme globally.

#### Modify ThemeContext.js to Create the Theme Context

📁 File: src/context/ThemeContext.js

```jsx

import  {  createContext,  useState  }  from  "react";

// ✅ Step 1: Create the ThemeContext

export  const  ThemeContext  =  createContext();

export  function  ThemeProvider({  children  })  {

  // ✅ Step 2: Define global theme state

  const  [theme,  setTheme]  =  useState("light");

  return  (

// ✅ Step 3: Provide theme state and toggle function to all components

<ThemeContext.Provider  value={{  theme,  setTheme  }}>

    {children}

</ThemeContext.Provider>

  );

}
```

### Step 5: Modify main.jsx to Wrap the App in ThemeProvider

📁  File:  src/main.jsx

```jsx
import  React  from  "react";

import  ReactDOM  from  "react-dom/client";

import  App  from  "./App";

import  {  ThemeProvider  }  from  "./context/ThemeContext";  // ✅ Import ThemeProvider

ReactDOM.createRoot(document.getElementById("root")).render(

  <ThemeProvider>

<App  />

  </ThemeProvider>

);
```

✅ Confirm That:

-   `<App />` is wrapped inside `<ThemeProvider>`.

-   Without this, useContext(ThemeContext) will be undefined.


### Step 6: Implement useContext in ThemeToggle.jsx

#### Modify ThemeToggle.jsx to Use useContext

📁 File: src/components/ThemeToggle.jsx

```jsx
import  React,  {  useContext  }  from  "react";

import  {  ThemeContext  }  from  "../context/ThemeContext";

function  ThemeToggle()  {

  const  {  theme,  setTheme  }  =  useContext(ThemeContext);

  return  (

<div>

    <h2>Theme  Toggle</h2>

    <p>Current  Theme:  {theme}</p>

    <button  onClick={()  =>  setTheme(theme  ===  "light"  ?  "dark"  :  "light")}>

      Toggle  Theme

    </button>

</div>

  );

}

export  default  ThemeToggle;
```

✅ Test It:

-   Click the "Toggle Theme" button---the current theme should change dynamically(this won't change the theme color yet just the word).


### Step 7: Modify App.jsx to Apply Theme Dynamically

📁 File: src/App.jsx

```jsx
import  React,  {  useContext  }  from  "react";

import  "./App.css";

import  ProfileForm  from  "./components/ProfileForm";

import  ThemeToggle  from  "./components/ThemeToggle";

import  {  ThemeContext  }  from  "./context/ThemeContext";  // ✅ Import ThemeContext

function  App()  {

  const  {  theme  }  =  useContext(ThemeContext);

  return  (

<div  className={`app-container ${theme === "dark" ? "dark" : ""}`}>

    <h1>Standard  Hooks  in  React</h1>

    <ProfileForm  />

    <ThemeToggle  />

</div>

  );

}

export  default  App;
```

✅ Test It:

-   Clicking "Toggle Theme" should switch between light and dark mode.


Task 4: Test and Refine
-----------------------

1️⃣ Check input auto-focus (useRef).\
2️⃣ Inspect labels (useId) for unique IDs.\
3️⃣ Toggle the theme (useContext) and verify state updates.

* * * * *

Task 5: Document and Maintain
-----------------------------

-   Commit your changes:

```bash
git  add  .

git  commit  -m  "Implemented  useRef,  useId,  and  useContext"
```

Push to GitHub and create a Pull Request.

Considerations
--------------

1.  Performance

    -   `useRef` does not trigger re-renders.

    -   `useContext` can cause re-renders if the context value changes frequently.

3.  Accessibility

    -   `useId` ensures unique, stable IDs for labels and inputs.

5.  Scalability

    -   `useContext` simplifies global state but may need advanced state management (e.g., Redux) for larger apps.

Final Thoughts
--------------

✅ `useRef` ensures inputs are automatically focused.\
✅ `useId`  improves accessibility and prevents duplicate IDs.\
✅ `useContext` provides scalable global state management.

Next Steps: Extend the app with local storage to persist theme preferences! 🚀ncies, install the following: