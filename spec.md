Sure! Here is a comprehensive, developer-ready specification based on our discussions:

---

## Recipe Organizer Web Application Specification

### Overview

A web application that allows users to save URLs for recipes and add custom labels to each entry. Users can search, sort, and share recipes with unique URLs. The application is open to all users without authentication.

### Core Features

1. **Search Functionality:**

   - Search recipes by label and title.
   - Support partial matches and case-insensitive searches.

2. **Sorting Functionality:**

   - Sort recipes by label and date.
   - Support ascending and descending order for both labels and dates.

3. **Sharing Functionality:**
   - Share entries with a unique URL.
   - Allow all users to edit entries via the shared URL.

### User Interface

1. **Main Page:**

   - Combine adding recipes and viewing/searching recipes on a single page.
   - Playful design, but not too crazy.

2. **Edit Page:**

   - Separate page for editing recipes.

3. **Label Management:**
   - Users can create, edit, and delete labels.
   - Manage labels in a modal.

### Data Model

1. **Recipe Entry:**
   - Title (string)
   - URL (string)
   - Labels (array of strings)
   - Date Added (timestamp)

### Error Handling

1. **Notifications:**
   - Display inline error messages for error handling.
   - No notifications for successful operations (visual changes will indicate success).

### Performance

- No specific performance requirements due to the private and simple nature of the app.

### Accessibility and Internationalization

- The app should be in swedish.

### Architecture Choices

1. **Front-End:**

   - Framework: React & TailwindCSS.
   - Design: Playful, user-friendly interface.

2. **Back-End:**

   - Framework: Next.js
   - Data fetching: React Server Components 
   - Data updating: React Server Actions

3. **Database:**
   - Type: A PostgreSQL database with Drizzle ORM.

### Error Handling Strategies

1. **Client-Side:**

   - Validate user inputs (e.g., URL format, non-empty title).
   - Display inline error messages for invalid inputs or failed operations.

2. **Server-Side:**
   - Handle errors gracefully and return appropriate HTTP status codes.
   - Log errors for debugging and monitoring purposes.

### Deployment and Hosting

- Already provided and ready for use.
