# Dev Bootcamp Final Project Fall 2022

## Overview

Congratulate yourself on progressing through this bootcamp up to this point! Your final project is to build a social media application with the resources we've provided you. We have set up a MongoDB database hosted online. Schemas for posts and comments have also been given to you as they are a central component of any social media app - the schemas are left rather generic so you can customize the application to your liking. For example, if your group wants to make a Twitter or Reddit clone (or experiment with building your own social media app), you can build on top of the code we have initially given you.

You are welcome to add fields to any of these schemas as you see fit, but do not simplify the project by removing any part of the existing schemas. You are also welcome to add additional models and their corresponding schemas if you want to build out more features.

## Getting Started

This repository is a template repository. The first thing you should do is create a new repository using this template and give your teammates collaborator access to that new repository.

Go ahead and clone the new repository to your local machine.

You will be provided a database URL. Reference `example.env` to see what your `.env` file should look like. Create your own `.env` file and paste in your database URL as a value to the key of `DB_URL`. Keep in mind that this URL should **not** be exposed to GitHub in any of your files. All references to the database URL should occur through `dbUrl` in `utils/consts.js`. All groups will be assigned its own database, meaning that groups will have distinct database URLs.

At this point, you should run

```
npm install
```

in the root directory of the repository to install all required dependencies.

## Feature Requirements

To replicate development cycles within BoG project teams, we have written out **tickets** that describe all the required elements of the final project. Some tickets are more complex to implement than others. Keep this in mind as you delegate work among your teammates. You might want to consider splitting certain tickets into more manageable chunks that can be better delegated. See the `tickets` directory for the technical and feature requirements.

## Visualizing Your Database Collections

If you'd like to use a GUI to visualize documents in your database, download [MongoDB Compass](https://www.mongodb.com/try/download/compass) and use your provided database URL to connect to your database.

## Troubleshooting Your Database

Should you run into any issues with your database and you want to reset it to its default state with pre-seeded values, run the following command at the root of this repository:

```
npm run seed
```

This command will **delete all existing documents** from your collections and seed your now empty database with some default data.

## Tips/Words of Encouragement (?)

We recognize that we've thrown you into the deep end with this project. This is typically what happens at the start of every semester when you're assigned to a project. Take some time to get a grasp of what's going on in the codebase and ask lots of questions.

We've left the design part of this project all up to you - you are in control of architecting this project. When facing a design decision, it might help to think about what you'd expect from a system if you were the user interacting with your web app. For example, there are many ways you can approach the process of creating a post - think about how existing apps do it, and maybe it will give you some ideas!
