Prerequisites

- Node.js (v18+)
- MongoDB running locally on mongodb://localhost:27017/locations-db

Backend

cd backend
npm install
npm run start:dev

- API runs on: http://localhost:3000
- Swagger docs: http://localhost:3000/docs

Backend uses default values. Create .env if needed:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/locations-db


I didn't manage to have full frontend components with the given time I had.
I had to learn some new libraries and relearn how to use NestJS.

I used AI for the reactQuery.