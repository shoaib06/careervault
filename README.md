## CareerFlow — Resume Builder (Laravel + React SPA)

A single-page application for building and managing resumes. The backend is powered by Laravel 12 with Sanctum token authentication and a RESTful API; the frontend is a React app bundled with Vite and uses React Router and Axios.

### Tech Stack

-   **Backend**: Laravel 12, Eloquent ORM, Sanctum
-   **Frontend**: React, React Router, Vite, Tailwind CSS
-   **HTTP**: Axios with bearer token interceptor
-   **DB**: SQLite (default) or any Laravel-supported database

## Quick Start

### Prerequisites

-   PHP 8.2+
-   Composer
-   Node.js 18+

### Setup

```bash
# 1) Install PHP deps
composer install

# 2) Bootstrap environment
cp .env.example .env
php artisan key:generate

# 3) Use SQLite (default) or update DB in .env
php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"
php artisan migrate

# 4) Install JS deps and build assets
npm install
npm run dev   # or: npm run build

# 5) Run backend (separate terminal if needed)
php artisan serve
```

Alternatively, you can use the prewired composer script during first setup:

```bash
composer run setup
```

## Application Architecture

### SPA Routing

-   Laravel serves a catch-all route to the SPA:

```5:5:routes/web.php
Route::view('/{any}', 'app')->where('any', '.*');
```

-   The React app mounts in `resources/views/app.blade.php` and handles client-side routes in `resources/js/app.jsx`.

### Frontend

-   React Router defines pages like `Login`, `Register`, `Dashboard`, `Resumes`, and a `ResumeBuilder` editor.
-   Axios is preconfigured with `/api` base URL and a request interceptor that attaches `Authorization: Bearer <token>` from `localStorage` key `auth_token`.

```1:15:resources/js/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
```

-   High-level API helpers are exported for resumes, experiences, projects, skills, educations, and certifications.

### Backend

-   API routes are defined in `routes/api.php`. Public routes handle auth; protected routes require `auth:sanctum`.

```13:28:routes/api.php
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('resumes', ResumeController::class);
    Route::apiResource('experiences', ExperienceController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('projects', ProjectController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('skills', SkillController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('educations', EducationController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('certifications', CertificationController::class)->only(['store', 'update', 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
```

-   `AuthController` issues and revokes personal access tokens via Sanctum.

```27:33:app/Http/Controllers/Api/AuthController.php
$token = $user->createToken('api')->plainTextToken;
return response()->json([
    'user' => $user,
    'token' => $token,
], 201);
```

## Authentication & Flow

1. User registers or logs in via `/api/register` or `/api/login`.
2. Backend returns a Sanctum personal access token.
3. Frontend stores token in `localStorage` under `auth_token`.
4. Axios interceptor attaches `Authorization: Bearer <token>` for subsequent requests.
5. Protected API endpoints (e.g., `resumes`, `experiences`, etc.) are accessible while authenticated.
6. `POST /api/logout` revokes the current access token.

## REST API Overview

### Auth

-   `POST /api/register` — Register and receive token
-   `POST /api/login` — Login and receive token
-   `POST /api/logout` — Revoke current token (auth required)
-   `GET /api/user` — Current user (auth required)

### Resumes

-   `GET /api/resumes` — List resumes (auth)
-   `POST /api/resumes` — Create resume (auth)
-   `GET /api/resumes/{id}` — Show resume (auth)
-   `PUT /api/resumes/{id}` — Update resume (auth)
-   `DELETE /api/resumes/{id}` — Delete resume (auth)

### Resume Children (auth)

-   `POST /api/experiences` | `PUT /api/experiences/{id}` | `DELETE /api/experiences/{id}`
-   `POST /api/projects` | `PUT /api/projects/{id}` | `DELETE /api/projects/{id}`
-   `POST /api/skills` | `PUT /api/skills/{id}` | `DELETE /api/skills/{id}`
-   `POST /api/educations` | `PUT /api/educations/{id}` | `DELETE /api/educations/{id}`
-   `POST /api/certifications` | `PUT /api/certifications/{id}` | `DELETE /api/certifications/{id}`

## Environment

-   `APP_URL` should match where the SPA is served.
-   For Sanctum on single-domain SPA, default config works. For cross-domain setups, configure `SANCTUM_STATEFUL_DOMAINS`, CORS, and cookie options accordingly.

## Development

-   Run everything in one tab using the composer `dev` script (requires Node and PHP):

```bash
composer run dev
```

This concurrently starts: PHP server, queue listener, log viewer, and Vite dev server.

## Production Build

```bash
npm run build
php artisan optimize
```

Serve `public/` via your preferred web server; ensure `.env` is set with production DB and `APP_KEY`.

## Testing

```bash
php artisan test
```

## License

MIT
