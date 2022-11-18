## Posts - Create and read (from DB) posts

Context: Implement the ability to create new posts. Feel free to add this functionality any way you'd like, whether that be through a popup modal or through a navigation to another screen. Each post should be viewable through their own individual route.

What you need to implement:

- Create a new post

  - Should require the user to input at minimum a title (String) and a body (String)
  - If you have time, you can also allow the user to optionally input a URL to an image (String)
  - Submitting these inputs should redirect the user to the post's individual page

- View posts

  - Each post should live independently on its own route
  - This page should be server-side rendered

- API endpoints
  - Get specific post details by id
  - Post creation - you should be passing in all the relevant information into the request's body (POST!)

Acceptance Criteria:

- All API endpoints should make exactly 1 request to the database
- Inputs for post title and body should have input validation (prevent empty submissions)
