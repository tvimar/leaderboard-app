## Directory Structure

```
laravel/
├── app/
│   ├── Http/Controllers/    # Controllers
│   ├── Models/             # Eloquent models
│   └── Jobs/              # Background jobs (QR generation)
├── resources/
│   ├── js/                # React components
│   └── css/              # Stylesheets
├── database/
│   ├── migrations/       # Database migrations
│   └── seeders/         # Database seeders
└── storage/
    └── qr/              # Generated QR codes
```

## API Endpoints

- `GET /api/users` - List all users
- `DELETE /api/users/{id}` - Create a new user
- `PUT /api/users/{id}` - Update user score
- `DELETE /api/users/{id}` - Delete a user
- `GET /api/users-by-score` - Get users grouped by score
- `GET /api/current-winner` - Get current winner
- `GET /api/qr-codes` - List all QR codes
- `GET /api/qr-codes/{filename}` - Get specific QR code

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

## Possible Optimizations/Changes To Consider
- The frontend of this app will refresh its userlist after making a score/user change by calling `GET /api/users` API. Although a currently acceptable solution for an application of this scale, this method might not perform as well for larger scale applications.

    - One possible optimization for this is to have the frontend retain its own copy of the users list and on a successful call for APIs such as `PUT /api/users/{id}`, `DELETE /api/users/{id}` or `DELETE /api/users/{id}`, the frontend can just change its own list before on the response obtained from the API call.
        - Pros:
            - Halves the number of API calls since the app no longer has to call `GET /api/users` to refresh.
        - Cons:
            - Only changes the user that was affected by the API call. This means if a different user was changed somewhere else (ex. reset-user-scores artisan command is called or a different user is changed in another browser), our browser will not pick up on this change unless we can call 'GET /api/users' again.
        - The performance boost in pros will likely outweigh the cons for large systems but we will need to elaborate this design to mitigate possible consistency issues laid out in cons.

- The most recent winner that is displayed in the UI is obtained by getting the latest entry in the winners table. Because the winners table is updated via scheduled laraval tasks, we have to rely on the frontend manually pulling the winner from the table since the Laravel backend can not directly update the react component of the frontend.
    - One thing we can do is make the Frontend automatically poll the winners table in 1-5 minute intervals so that the user doesn't have to pull the data themselves.
        - Pros:
            - Automatical update on the UI
        - Cons:
            - More API calls even when it's not "needed"
            - Since the poll timing and backend updating timings may not be aligned, the frontend may have stale data for a bit depending on how long after the backend update the frontend polls for new winners.

## AI Usage
- Several components (especially React components) were written with AI Assistance, specifically the Agent mode in Visual Studio code, using Claude Sonnet 3.7.
- The project setup was manually done as where some other components in this project. All AI generated code is manually inspected and adjusted before committing the changes to the repo.

## Buglist
- HTML document has hydration issue warnings due to whitespace. This currently does not affect the webpage's functionality.