This project is a Node.js + TypeScript application that provides an API to resize and cache images using Sharp.
It is part of the Udacity Full-Stack Nanodegree.

Features

- Resize images on the fly.
- Cache resized images to improve performance.
- Validation for missing/invalid parameters.
- Automated tests with Jasmine & Supertest.

project-root/
├── src/              # Application source code
│   ├── index.ts      # Server entry
│   ├── routes/       # API routes
│   └── utils/        # Utility functions
├── images/           # Original images (place your .jpg files here)
│   └── thumb/        # Cached/resized images will be generated here
├── tests/            # Jasmine test files
├── spec/
├── package.json
├── tsconfig.json
└── README.md

Installation

Clone the project:
git clone <repo-url>
cd project(1)-Udacity

Install dependencies:
npm install

Build the project:
npm run build


Start the server:
npm start

By default, the server runs at:
http://localhost:3000


To resize an image, send a GET request to:
/api/images?filename=<name>&width=<w>&height=<h>

Valid request (will return resized fjord.jpg):
http://localhost:3000/api/images?filename=fjord&width=300&height=300

Non-existent image:
http://localhost:3000/api/images?filename=doesnotexist&width=200&height=200

Cached images will be available in the /thumb folder:
http://localhost:3000/thumb/fjord_300x300.jpg


Testing

Run automated tests using Jasmine & Supertest:
npm test