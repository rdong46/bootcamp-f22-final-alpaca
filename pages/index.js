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

  useEffect(() => {
    fetch("http://localhost:3000/api/example")
      .then((response) => response.json())
      .then((data) => {
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
  
  function post() {
    console.log(document.getElementById("title").value);
    if (document.getElementById("title").value == ""
        && document.getElementById("text").value == "") {
        console.log("NOTHING")
        setAddPost(true);
        event.preventDefault();
    } else {
        setAddPost(false);
    }
    
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
                console.log("hi");
                setAddPost(true);
              }}
            >
              Create Post
            </button>
          </div>
        ) : (
          <div className={styles.submit}>
            <form className={styles.input}>
              <input
                type="text"
                id="title"
                placeholder="Title"
                className={styles.titleInput}
              ></input>
              <textarea
                id="text"
                placeholder="Text(optional)"
                className={styles.bodyInput}
              ></textarea>
              <button
                className={styles.submitButton}
                onClick={(event) => {
                  post(event)
                  console.log(addPost)
                }}
              >
                Post
              </button>
            </form>
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
        {pageNumber > 0 ? (
          <div className={styles.button} onClick={moveBack}>
            {"<"}
          </div>
        ) : (
          <div></div>
        )}
        {posts.length > pageNumber * 10 + 10 ? (
          <div style={styles.button} onClick={moveFoward}>
            {">"}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
