import { useEffect, useState } from "react";
import Image from "next/image";
import temp from "../public/temp.jpg";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [addPost, setAddPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/example")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        setCurrentPosts(data.slice(pageNumber * 10, pageNumber * 10 + 10));
      });
  }, []);

  function moveBack() {
    setPageNumber(pageNumber - 1);
    setCurrentPosts(
      posts.slice((pageNumber - 1) * 10, (pageNumber - 1) * 10 + 10)
    );
  }

  function moveFoward() {
    setPageNumber(pageNumber + 1);
    setCurrentPosts(
      posts.slice((pageNumber + 1) * 10, (pageNumber + 1) * 10 + 10)
    );
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src={temp} alt="logo" width={72} height="auto" />
          <div>Temporary App Name</div>
        </div>
      </div>
      <div className={styles.posts}>
        {!addPost ? (
          <div className={styles.submit}>
            <Image src={temp} alt="logo" width={36} height="auto" />
            <button
              className={styles.create}
              style={{ color: "inherit", textDecoration: "inherit" }}
              onClick={() => {
                setAddPost(true);
              }}
            >
              Create Post
            </button>
          </div>
        ) : (
          <div className={styles.submit}>
            <div className={styles.input}>
              <form className={styles.input}>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className={styles.titleInput}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    console.log(newTitle);
                  }}
                ></input>
                <textarea
                  id="text"
                  placeholder="Text(optional)"
                  className={styles.bodyInput}
                  onChange={(e) => {
                    setNewBody(e.target.value);
                    console.log(newBody);
                  }}
                ></textarea>
              </form>
              <button
                className={styles.submitButton}
                onClick={() => {
                  if (!newBody == "" && !newTitle == "") {
                    const body = {
                      title: newTitle,
                      body: newBody,
                      comments: [],
                    };
                    fetch("http://localhost:3000/api/add", {
                      method: "POST",
                      body: JSON.stringify(body),
                    });
                    setAddPost(false);
                  }
                }}
              >
                Post
              </button>
            </div>
          </div>
        )}
        {currentPosts.map((post, index) => {
          return (
            <Link
              href={`/${post._id}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div className={styles.box} id={index}>
                <div className={styles.first}>
                  <div className={styles.title}>{post.title}</div>
                  <div className={styles.date}>
                    <div>{post.date.substr(0, 10)}</div>
                    <div>{post.date.substr(11, 8)}</div>
                  </div>
                </div>
                <div className={styles.body}>{post.body}</div>
                <div className={styles.bottom}>
                  <div className={styles.comments}>
                    <span className="material-symbols-outlined">Comment</span>
                    <div className={styles.comment}>
                      {`${post.comments.length}`} Comments
                    </div>
                  </div>
                  <Link
                    href={`/${post._id}/edit`}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </Link>
                </div>
              </div>
            </Link>
          );
        })}
        <div>
          {pageNumber > 0 ? (
            <div className={styles.button} onClick={moveBack}>
              {"<"}
            </div>
          ) : (
            <div></div>
          )}
          {posts.length > pageNumber * 10 + 10 ? (
            <div className={styles.button} onClick={moveFoward}>
              {">"}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
