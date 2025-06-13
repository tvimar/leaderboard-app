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

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd leaderboard-app/laravel
```

2. Install PHP dependencies:
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

6. Create an empty SQLite database:
```bash
touch database/database.sqlite
```

7. Run the database migrations:
```bash
php artisan migrate:fresh --seed
```

## Running the Application

1. Start the Laravel development server:
```bash
php artisan serve
```

2. In a separate terminal, start the Vite development server:
```bash
npm run dev
```

The application will be available at http://localhost:8000

### Admin Commands

#### Reset All User Scores
```http
php artisan users:reset-scores
```

## Testing

Run the test suite:
```bash
php artisan test
```

## Background Jobs

The application uses Laravel's job system for QR code generation. Make sure to run the queue worker:
```bash
php artisan queue:work
```

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
