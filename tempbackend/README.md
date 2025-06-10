# Leaderboard App Backend

This directory contains the backend implementation of the Leaderboard application built using Laravel. 

## Directory Structure

- **app/**: Contains the core application logic, including models, controllers, and middleware.
- **bootstrap/**: Contains files for bootstrapping the Laravel application.
- **config/**: Contains configuration files for various aspects of the application.
- **database/**: Contains database migrations, factories, and seeders.
- **public/**: Contains publicly accessible files, including the entry point for the application.
- **resources/**: Contains views and language files.
- **routes/**: Contains the web routes for the application.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory:
   ```
   cd leaderboard-app/backend
   ```

3. Install the dependencies using Composer:
   ```
   composer install
   ```

4. Set up your environment file:
   ```
   cp .env.example .env
   ```

5. Generate the application key:
   ```
   php artisan key:generate
   ```

6. Run the migrations to set up the database:
   ```
   php artisan migrate
   ```

## Usage

To start the Laravel development server, run:
```
php artisan serve
```
The application will be available at `http://localhost:8000`.

## API Endpoints

- **GET /api/leaderboard**: Fetches the leaderboard data.
- **POST /api/leaderboard**: Submits a new score to the leaderboard.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.