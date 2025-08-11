# Task Manager API (In-Memory)

## Overview

Simple in-memory Task Manager API built with Node.js and Express.

## Run

1. npm install
2. npm run dev
3. Open http://localhost:3000/api-docs for API docs

## Endpoints

- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- GET /api/tasks/stats (optional)

## Response format

All responses use:
{
"success": boolean,
"data": ...,
"message": "..."
}

Swagger Link: http://localhost:3000/api-docs/#/
