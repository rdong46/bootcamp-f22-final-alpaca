## Comments - Read (from DB) and display comments

Context: Comments only matter if the user can see them. What kind of user would have access to the database?

Blockers:

- This ticket cannot be completed until you have implemented reading Posts (ticket #2) since you will be modifying the API call you made in that ticket. You need to fetch all the comments associated with a post.

What you need to implement:

- A react component that holds the comment and time the comment was made
- API requests to get post information should be modified to sort the post's comments by most recent to least recent

Acceptance Criteria:

- API to query post information with sorted comments should only take 1 database call. We like to be efficient!
- In addition, you should not be doing any sorting in code after the database call - it's faster to let MongoDB handle it.
