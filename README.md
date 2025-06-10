# Leaderboard App

This project is a leaderboard application built with a Laravel backend and a React frontend. It allows users to submit scores and view the leaderboard.

## Project Structure

- **backend/**: Contains the Laravel backend implementation.
  - **app/**: Core application logic, including models, controllers, and middleware.
  - **bootstrap/**: Files for bootstrapping the Laravel application.
  - **config/**: Configuration files for various aspects of the application.
  - **database/**: Database migrations, factories, and seeders.
  - **public/**: Publicly accessible files, including the entry point for the application.
  - **resources/**: Views and language files.
  - **routes/**: Web routes for the application.
  - **composer.json**: Composer configuration file listing dependencies.
  - **README.md**: Documentation for the backend.

- **frontend/**: Contains the React frontend implementation.
  - **public/**: Publicly accessible files, including the HTML file.
  - **src/**: Source files for the React application.
    - **components/**: Contains React components.
      - **Leaderboard.js**: Component for fetching and displaying leaderboard data.
    - **App.js**: Main component serving as the entry point for the application.
    - **index.js**: Entry point for rendering the React application.
  - **package.json**: npm configuration file listing dependencies and scripts.
  - **README.md**: Documentation for the frontend.

## Installation

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install the dependencies using Composer:
   ```
   composer install
   ```

3. Set up your environment file:
   ```
   cp .env.example .env
   ```

4. Generate the application key:
   ```
   php artisan key:generate
   ```

5. Run the migrations to set up the database:
   ```
   php artisan migrate
   ```

6. Start the Laravel development server:
   ```
   php artisan serve
   ```
   The application will be available at `http://localhost:8000`.

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the dependencies using npm:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## API Endpoints

- **GET /api/leaderboard**: Fetches the leaderboard data.
- **POST /api/leaderboard**: Submits a new score to the leaderboard.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.