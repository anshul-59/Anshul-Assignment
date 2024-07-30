DATABASE

1. User Table

This table stores information about each user.

UserID (Primary Key): Unique for each user.
Username: The user's name.
Email: The user's email address.
PasswordHash: Hashed password for authentication. 2. Task Table
This table holds the details of each task.

2. Task Table:

TaskID (Primary Key): Unique identifier for each task.
Title: The title of the task.
Description: Detailed description of the task.
Status: The current status (e.g., To Do, In Progress, Done).
CreatedDate: Timestamp of when the task was created.
UpdatedDate: Timestamp of the last update to the task.
OwnerID (Foreign Key): Reference to the UserID of the user who created the task.

3. TaskAssignment Table

To manage task assignments and permissions, I use a separate table:

TaskAssignmentID (Primary Key): Unique identifier for each assignment.
TaskID (Foreign Key): Reference to the TaskID in the Task table.
UserID (Foreign Key): Reference to the UserID in the User table.
Role: The role of the user with respect to the task (e.g., Owner, Editor).

4. Changes Table

To track changes made to tasks for real-time updates, I have:

ChangeID (Primary Key): Unique identifier for each change.
TaskID (Foreign Key): Reference to the TaskID in the Task table.
UserID (Foreign Key): Reference to the UserID of the user who made the change.
ChangeType: Type of change (e.g., Update, Delete).
ChangeDate: Timestamp of when the change occurred.

User and Task: I manage a many-to-many relationship using the TaskAssignment table. This allows multiple users to be assigned to a single task and vice versa.
Task and Changes: I set up a one-to-many relationship where each task can have multiple changes associated with it.

..........................................................................................................................................

BACKEND
1.Create a Task
Endpoint: POST /tasks
{
"title": "Task Title",
"description": "Task Description",
"status": "To Do", // Initial status
"ownerId": "UserID" // ID of the user creating the task
}

2.Edit a Task

Endpoint: PUT /tasks/{taskId}

{
"title": "Updated Task Title",
"description": "Updated Task Description",
"status": "In Progress", // Updated status
"ownerId": "UserID" // ID of the user making the change
}

3.Delete a Task
Endpoint: DELETE /tasks/{taskId}

taskId: The unique identifier of the task to be deleted.

4.Reorder Task Within the Same Stage
Endpoint: PATCH /tasks/{taskId}/reorder

"newOrder": 2 // New position in the current stage

5. Update Task Stage and Reorder

Endpoint: PATCH /tasks/{taskId}/update-stage

{
"newStatus": "In Progress", // New status (stage)
"newOrder": 1 // New position in the new stage
}

.............................................................................................................................................

QUESTIONS

Error handling:

1.Form validation:Before sending data to the server, I validate forms on the client side. If something’s missing, I display validation messages next to the relevant fields, like "Title is required."

2.Network Erros: When there are network issues or the server is unreachable, I catch these errors and inform the user with messages like "Network error, please try again later."

3. If optional features like drag-and-drop, I provide fallback options and ensure the core functionality is still usable.
