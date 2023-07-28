Jira clon App:
    This was creted as practice, while learning
        JavaScript
        Nodejs
        express
        Mongodb

Description:
    This is a simple app, that is meant to replicate the basic functionality of Jira
    -Create/edit/delete groups
    -Add tasks to a specific group
    -Edit/delete specific tasks
    -Assign specific users to specific tasks

Endpoints:
Groups:
    -GET - get all groups
        /api/v1/groups
    -POST - create new group
        /api/v1/groups
    -DELETE - delete specific group
        /api/v1/groups/:id
    -POST - add new task to specific group
        /api/v1/groups/:id/tasks

Tasks:
    -GET - get all tasks
        /api/v1/tasks
    -DELETE - delete specific task
        /api/v1/tasks/:id