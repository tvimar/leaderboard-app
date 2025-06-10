# Leaderboard App Frontend

This directory contains the frontend implementation of the Leaderboard application built using React.

## Directory Structure

- **public/**: Contains publicly accessible files for the React frontend, including the HTML file.
- **src/**: Contains the source code for the React application.
  - **components/**: Contains React components, including the `Leaderboard` component.
  - **App.js**: The main application component that serves as the entry point for the React application.
  - **index.js**: The entry point for the React application that renders the `App` component into the DOM.

## Installation

1. Navigate to the frontend directory:
   ```
   cd leaderboard-app/frontend
   ```

2. Install the dependencies using npm:
   ```
   npm install
   ```

## Usage

To start the React development server, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

## API Integration

The frontend communicates with the Laravel backend through the following API endpoints:

- **GET /api/leaderboard**: Fetches the leaderboard data.
- **POST /api/leaderboard**: Submits a new score to the leaderboard.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.