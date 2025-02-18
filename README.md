# Standard Hooks in React


This is a completed worked example with an explanation for a student to reference and use when completing the practice, lab, and summative assessments. This is a key walkthrough of the topic.


---


## Introduction


In this lesson, we will implement **three standard React hooks**:  
- **useRef** (for managing references to DOM elements and preserving mutable state)  
- **useId** (for generating unique identifiers)  
- **useContext** (for managing global state)  


We will follow a straightforward process to integrate these hooks into a minimal React application, focusing on simple steps that illustrate how they solve common problems.


---


## Tools and Resources


- **A React project or sandbox** (e.g., local environment or CodeSandbox)  
- **Git** (for version control if working locally)  
- **Starter Code** (provided in the lab structure)  


---


## Instructions


Below is a **task list** to guide you in adding each hook to your application. Follow each step in order:


1. **Create/Clone** the Starter Project  
   - **Open** your React project or clone the provided starter repo.  
   - **Navigate** into the project folder.


2. **Install Dependencies and Run the App**  
   - **Open** a terminal and run:
 	```bash
 	npm install
 	npm start
 	```
   - **Confirm** the application loads without errors.


3. **Implement `useRef`**  
   1. **Import** `useRef` at the top of `App.js`:
  	```js
  	import { useRef } from 'react';
  	```
   2. **Create** a ref:
  	```js
  	const inputRef = useRef(null);
  	```
   3. **Assign** the ref to an `<input>` element:
  	```js
  	<input ref={inputRef} ... />
  	```
   4. **Focus** the input on mount:
  	```js
  	useEffect(() => {
    	inputRef.current.focus();
  	}, []);
  	```
   - **Verify** the input is focused automatically when the app loads.


4. **Implement `useId`**  
   1. **Import** `useId`:
  	```js
  	import { useId } from 'react';
  	```
   2. **Generate** a unique ID:
  	```js
  	const generatedId = useId();
  	```
   3. **Use** the ID for a label-input pair:
  	```js
  	<label htmlFor={generatedId}>Name:</label>
  	<input id={generatedId} ... />
  	```
   - **Confirm** each input has a unique ID by inspecting the DOM.


5. **Implement `useContext`**  
   1. **Create** a context in `ThemeContext.js`:
  	```js
  	export const ThemeContext = createContext('light');
  	```
   2. **Wrap** your app in a Provider (in `index.js`):
  	```js
  	<ThemeContext.Provider value={{ theme, setTheme }}>
    	<App />
  	</ThemeContext.Provider>
  	```
   3. **Consume** the context in a component:
  	```js
  	const { theme, setTheme } = useContext(ThemeContext);
  	```
   - **Validate** you can access and modify the theme from any component.


---


## Considerations


- **Performance**  
  - `useRef` avoids re-renders since updates to the `.current` property do not trigger a re-render.  
  - `useContext` can cause re-renders if the context value changes frequently; be mindful of how often you update global data.


- **Accessibility**  
  - `useId` ensures each element has a unique, stable ID across renders, preventing label conflicts.  
  - For forms, verify that `htmlFor` and `id` pairs match.


- **Scalability**  
  - `useContext` simplifies global state, but large applications may require additional patterns (e.g., Redux) if state logic becomes complex.  
  - Keep hooks modular: consider using custom hooks if logic repeats or grows in complexity.


These hooks provide **efficient state and DOM management** in React, reducing the need for prop drilling, helping generate unique IDs, and interacting with the DOM without triggering unnecessary re-renders.
Finished Example
----------------

Below is an example of what your App.js  could look like after completing all tasks:
```jsx
import  React,  {  useState,  useEffect,  useRef,  useId,  useContext  }  from  'react';

import  {  ThemeContext  }  from  './hooks/ThemeContext';

function  App()  {

  // Manage userName state

  const  [userName,  setUserName]  =  useState('Guest');

  // useRef for DOM element

  const  inputRef  =  useRef(null);

  // useId for unique IDs

  const  generatedId  =  useId();

  // Consume theme context

  const  {  theme,  setTheme  }  =  useContext(ThemeContext);

  // Focus the input on mount

  useEffect(()  =>  {

inputRef.current.focus();

  },  []);

  // Update document title

  useEffect(()  =>  {

document.title  =  `Welcome, ${userName}`;

  },  [userName]);

  return  (

<div  style={{  margin:  '2rem',  background:  theme  ===  'light'  ?  '#fff'  :  '#333',  color:  theme  ===  'light'  ?  '#000'  :  '#fff'  }}>

	<h1>Hello,  {userName}!</h1>

	<label  htmlFor={generatedId}>Update  Name:</label>

	<input

  	id={generatedId}

  	type="text"

  	ref={inputRef}

  	value={userName}

  	onChange={(e)  =>  setUserName(e.target.value)}

	/>

	<button  onClick={()  =>  setTheme(theme  ===  'light'  ?  'dark'  :  'light')}  style={{  display:  'block',  marginTop:  '1rem'  }}>

  	Toggle  Theme

	</button>

	<p>Current  theme:  {theme}</p>

</div>

  );

}

export  default  App;
```
By implementing these standard hooks, you will:

-   Preserve values without re-renders (useRef).

-   Generate unique identifiers for accessible components (useId).

-   Manage global state gracefully (useContext).

This final example demonstrates how to bring all three hooks together into a single React application. Feel free to extend this lab by adding more features (e.g., additional global state or multiple fields with useId) to practice further.Finished Example
