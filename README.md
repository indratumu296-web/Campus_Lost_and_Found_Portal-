# Foundry — Campus Lost & Found

A full-stack, responsive **Campus Lost and Found Portal** for Sai University's Web Technology and Internet Programming individual project (2026–2027).

## Features

- Registration, login, logout and role-protected access using JWT and bcrypt
- Create, browse, edit and delete lost/found reports with optional photos
- Search by keyword and filter by category, location and report type
- **Custom feature:** newest/oldest date sorting
- Claim items, approve/reject claims, and track claim statuses
- User dashboard for reports, submitted claims and received claims
- Admin dashboard with statistics, all-claims review and moderation of listings
- MongoDB persistent storage; seed script inserts 12 example reports
- REST APIs and Postman test collection (10 scenarios)
- Mobile-responsive design with semantic HTML, CSS and ES6 JavaScript

## Prerequisites

1. Install **Node.js 20 or later** and npm.
2. Install and start **MongoDB Community Server**, or create a MongoDB Atlas database.
3. Install **Postman** for API testing.

## Run locally (Windows / macOS / Linux)

```bash
cd campus-lost-found
npm install
```

Copy `.env.example` to `.env`. On macOS/Linux:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Edit `.env`: set your `MONGODB_URI`, a random `JWT_SECRET` at least 32 characters long, and a private `ADMIN_PASSWORD` of at least 8 characters. **Never commit `.env`.** Ensure MongoDB is running before the next steps.

```bash
npm run seed
npm start
```

Visit **http://localhost:3000**. To use the administrator account, log in with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`. The seed command creates an admin and 12 sample listings on a fresh database; it will not duplicate listings on subsequent runs.

For auto-reload during development: `npm run dev`.

## Suggested demonstration

1. Open the home page and show 12 sample reports, search, filters and sorting.
2. Register two different accounts in separate browsers or private windows.
3. With account A, submit a **found** report with a photo.
4. With account B, open the report and submit a claim with identifying details.
5. With account A, open **My dashboard** and approve or reject the claim.
6. Show the resulting claim status in account B's dashboard.
7. Log in as admin and show statistics and claim review.
8. Open Postman, import the collection and run the API tests.

## API overview

| Method | Route | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Obtain JWT |
| GET | `/api/auth/me` | User | Profile |
| GET | `/api/items` | Public | Search, filter, sort and paginate |
| GET | `/api/items/:id` | Public | Item details |
| POST | `/api/items` | User | Report item (multipart form) |
| GET | `/api/items/mine` | User | Own reports |
| PATCH | `/api/items/:id` | Owner/admin | Update report |
| DELETE | `/api/items/:id` | Owner/admin | Delete report |
| POST | `/api/claims` | User | Submit claim |
| GET | `/api/claims/mine` | User | Submitted claims |
| GET | `/api/claims/received` | User | Claims on owned items |
| PATCH | `/api/claims/:id` | Owner/admin | Approve/reject claim |
| GET | `/api/admin/stats` | Admin | Basic statistics |
| GET | `/api/admin/claims` | Admin | All claims |

For protected endpoints, pass `Authorization: Bearer <JWT>`. POST `/api/items` requires form fields: `name`, `category`, `description`, `location`, `date` (YYYY-MM-DD), `type` (`lost` or `found`), optional `image` (JPG/PNG/WebP under 3 MB).

## Postman

Import `postman/Campus-Lost-Found.postman_collection.json`. Set collection variable `baseUrl` to `http://localhost:3000`. Run **Register user** (or use a unique email if already registered), then **Login**. The collection saves the user token automatically. For claim tests, use a second account and a listing owned by the first account; edit `itemId` and `claimId` collection variables accordingly. **Postman scenarios are supplied but need to be executed and screenshotted on your machine.**

## Deploy

1. Create a MongoDB Atlas database and allow the hosting platform's IP/network access appropriately.
2. Push the source to your personal GitHub repository. Do not push `.env` or `node_modules`.
3. Create a Node.js web service on an instructor-approved host (e.g. Render). Set build command `npm install`, start command `npm start`.
4. Configure `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` and (optionally) `PORT` as environment variables.
5. Run `npm run seed` once against the intended database from a trusted environment.
6. Verify the public URL and Postman routes. **Note:** local uploaded files are not durable on many cloud hosts; configure persistent disk storage or external object storage for production photo uploads.

## Architecture

```text
Browser (HTML/CSS/ES6 Fetch)
          |
          v
Express REST API + JWT middleware
          |
          v
MongoDB (User, Item, Claim)
```

## Security notes

Passwords are hashed with bcrypt. JWT authorization is checked server-side; roles and ownership are enforced on edits and claims. Input lengths, enumerations, IDs, file sizes and MIME types are checked. Login routes have rate limiting. In a production deployment, add strict CSP, file signature validation, object storage, stronger logging and monitoring, and a secure token-storage strategy.

## Submission checklist

- [ ] Run and demonstrate the working application
- [ ] Execute at least 8 Postman cases; capture screenshots and results
- [ ] Take screenshots of the homepage, reports, forms, claims and dashboards
- [ ] Push code to your personal GitHub repository
- [ ] Deploy to instructor-approved hosting and record the live URL
- [ ] Write the project report **using the university's prescribed report template** (not supplied here)
- [ ] Disclose AI assistance as required by your course
- [ ] Prepare for individual viva and code modifications
- [ ] Submit through Google Classroom before **30 November 2026**

**Important:** This archive provides the implementation and test collection, not proof of successful runtime testing, cloud deployment, or instructor approval. You must run, verify, deploy and document the project before submission.
