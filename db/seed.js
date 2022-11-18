require("dotenv").config();
import Post from "./models/Post";
import Comment from "./models/Comment";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

async function seedDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected correctly to server");

    await Post.deleteMany({});
    await Comment.deleteMany({});

    const commentData = Array.from(Array(50)).map(
      (e) =>
        new Comment({
          body: faker.lorem.lines(2),
        })
    );

    await Comment.insertMany(commentData);

    const postData = Array.from(Array(10)).map((e, i) => {
      const image_rand = Math.random() < 0.5;
      const val = {
        title: faker.lorem.lines(1),
        body: faker.lorem.lines(5),
        comments: commentData
          .slice(i * 5, i * 5 + 5)
          .map((comment) => comment._id),
      };
      image_rand && (val.image = faker.image.cats());
      return new Post(val);
    });

    await Post.insertMany(postData);

    console.log("Database seeded! :)");
    process.exit();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
