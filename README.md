
# URL Analyzer Web Application

This is a full-stack web application built as a test task for the Full-Stack Developer position at Sykell, focusing on front-end development with React and TypeScript, and backend services with Go, Gin framework, and MySQL database.




https://github.com/user-attachments/assets/947daf04-a1b3-42a9-9ec0-e48416ac3b48




---

## Features

- Add website URLs for analysis
- Crawl and analyze web pages to collect:
  - HTML version detection
  - Page title
  - Counts of heading tags (H1-H4)
  - Number of internal vs. external links
  - Count of broken/inaccessible links (4xx, 5xx)
  - Detection of login forms
- Dashboard with paginated, sortable, and filterable results table
- Detailed view per URL with charts and broken link listings
- Bulk actions to re-run analysis or delete URLs
- Real-time processing status updates (queued → running → done/error)
- Authorized API calls (token-based or basic auth, as implemented)

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, React Router
- **Backend:** Go (Golang) with Gin framework
- **Database:** MySQL

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- Go >= 1.20.x
- MySQL Server
- (Optional) Docker & Docker Compose

---

### Backend Setup

1. Configure MySQL:

```sql
CREATE DATABASE url_analyzer;
CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON url_analyzer.* TO 'myuser'@'localhost';
FLUSH PRIVILEGES;


2. Run backend server:

cd backend
go run .
(The backend will listen on port 8081 by default.)

### Frontend Setup

1. Install dependencies:

cd frontend
npm install
Update API base URL (if needed) to point to backend port 8081 in your API client or environment variables.

2. Run frontend dev server:

npm run dev
(The frontend will run on port 8080.)

3. Running Tests

To run frontend tests:
npm test


### Project Structure

/backend     # Go backend code, DB connection, handlers
-Analyzer.go
-db.go
-handler.go
-main.go
/frontend    # React frontend code, components, pages
-components
-hooks
-lib
-pages

### Usage

-Open http://localhost:8080
-Add a URL to analyze
-View analysis results in dashboard
-Click rows for details and charts
-Use bulk actions to re-run or delete URLs
-See real-time status updates as crawl progresses

### Notes

-Input URLs are normalized by adding http:// if no scheme is provided
-Backend validates URLs and fetches HTML content for analysis
-The app currently uses a simple authorization mechanism for API calls (customize as needed)
-Database schema automatically created on backend startup if not present

### Future Improvements

-Add user authentication and more secure authorization
-Enhance frontend UI responsiveness and accessibility
-Support advanced crawling options (depth, concurrency)
-Implement detailed error logging and retry mechanisms
-Add Docker Compose setup for easy local deployment

### Contact
For any questions or feedback, please contact [aminausmani270@gmail.com].

