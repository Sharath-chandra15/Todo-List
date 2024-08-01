This project is a Todo List application built using React.js for the frontend and styled with Tailwind CSS. The application allows users to manage their tasks efficiently, providing features such as 
creating new tasks, updating existing ones, marking tasks as completed, and searching for tasks by their title.The tasks are displayed in a clean, expandable list format, where users can view additional
details like descriptions and timestamps when expanded.

The system is designed with modular React components. The TaskList component manages and displays the list of tasks, filtering them based on the user's search input. The TaskItem component represents
each individual task, providing functionality to mark tasks as done or to view more details. The SearchBar component handles the input for filtering tasks by their titles. The application's data is stored 
in a dummy JSON file (tasks.json), which is loaded into the React state on initialization. This JSON file simulates a backend data source, containing task objects with fields such as id, title, description, 
completed, and timestamp.

For styling, Tailwind CSS is used to create a responsive and modern user interface. The application is simple to set up and run. First, clone the repository and navigate to the project directory. Then, install
the necessary dependencies using npm install and start the development server with npm start. The application will be accessible on http://localhost:3000/.
