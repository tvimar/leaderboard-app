# Leaderboard App

A real-time leaderboard application built with Laravel and React. Track users, scores, and generate QR codes for each user.

## Features

- User management (create, update, delete)
- Score tracking and real-time updates
- QR code generation for each user
- Winner tracking and history
- Sortable and filterable user list
- Detailed user information in modal popups

## Prerequisites

- PHP >= 8.1
- Composer
- Node.js >= 16
- npm or yarn
- SQLite (or another database of your choice)

## Installation for running locally

1. Clone the repository:
```bash
git clone [repository-url]
cd leaderboard-app/laravel
```

2. Install PHP:

https://www.php.net/manual/en/install.php

3. Install Composer dependencies:

Follow this to install composer https://getcomposer.org/doc/00-intro.md
```bash
composer install 
```

3. Install JavaScript dependencies:
```bash
npm install
```

4. Copy the environment file and configure it:
```bash
cp .env.example .env
php artisan key:generate
```

5. Configure your database in `.env`:
```env
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite
```

6. Run the database migrations:
```bash
php artisan migrate
```

## Background Jobs For QR Code Creation

The application uses Laravel's job system for QR code generation. Make sure to run the queue worker:
```bash
php artisan queue:work
```

QR codes will be generated in the laravel\storage\app\private\qr folder

## Running Scheduled Tasks

The application uses Laravel's task system for regular updates to the winners table. Make sure to run the task worker (you will need to do this in another terminal):
```bash
php artisan schedule:work
```

## Running the Application

For both of these steps, these will also need a separate terminal for a total of 4 terminals, assuming you are running the previous 2 steps.

1. Start the Laravel development server:
```bash
php artisan serve
```

2. In a separate terminal, start the Vite development server:
```bash
npm run dev
```

The application will be available at http://localhost:8000 (or whichever URL is on the terminal running php artisan serve)

## Directory Structure

```
laravel/
├── app/
│   ├── Http/Controllers/    # Controllers
│   ├── Models/             # Models
│   └── Jobs/              # Background jobs (QR generation)
├── resources/
│   ├── js/                # React components
│   └── css/              # Stylesheets
├── database/
│   ├── migrations/       # Database migrations
│   └── seeders/         # Database seeders
│   └── factories/         # User factory for DB initialization
```

## API Endpoints

- `GET /api/users` - List all users
- `POST /api/users` - Create a new user
- `PUT /api/users/{id}` - Update user score
- `DELETE /api/users/{id}` - Delete a user
- `GET /api/users-by-score` - Get users grouped by score
- `GET /api/current-winner` - Get current winner
- `GET /api/qr-codes` - List all QR codes
- `GET /api/qr-codes/{filename}` - Get specific QR code

## Testing

Run the test suite:
```bash
php artisan test
```

## Development

### Frontend Development
The React application is located in `resources/js`. Key components:
- `UsersTable.jsx` - Main user list and interaction
- `CreateUserModal.jsx` - User creation form
- `UserDetailsModal.jsx` - User details popup
- `QrCodeViewer.jsx` - QR code display

### Backend Development
The Laravel application handles:
- User management
- Score tracking
- Winner history
- QR code generation and storage

## Troubleshooting

### Common Issues

1. **Storage Permission Issues**
```bash
chmod -R 777 storage/
php artisan storage:link
```

2. **Database Issues**
```bash
php artisan migrate:fresh
```

3. **Node Module Issues**
```bash
rm -rf node_modules
npm install
```

4. **SSL/CORS Issues with QR Code Generation**

If you're experiencing SSL certificate or CORS issues when the backend tries to call the QR code API (`https://api.qrserver.com/v1/create-qr-code/`), you can resolve this through SSL Certificate Setup:

- Download the latest `cacert.pem` from the official cURL website: https://curl.se/ca/cacert.pem
- Save it to a location on your computer (e.g., `C:\cacert.pem`)
- Add this line to your php.ini file in your php installation or .env:
```
curl.cainfo="C:/cacert.pem"
```
