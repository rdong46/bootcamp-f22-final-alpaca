import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, []);

  return <div>
    <div className={styles.posts}>
        <div>{post.title}</div>
        <div>{post.body}</div>
    </div>
    
      {/* { <form className={styles.input}>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className={styles.titleInput}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    console.log(newTitle);
                  }}
                >
                </input>
                <textarea
                  id="text"
                  placeholder="test"
                  className={styles.bodyInput}
                  onChange={(e) => {
                    setNewBody(e.target.value);
                    console.log(newBody);
                  }}
                >
                  
                </textarea>

              </form> } */}
      <div>
      <button
          onClick={(event) => {
            fetch("http://localhost:3000/api/edit", {method: "PUT", body: {id: id, change: ""}});
          }}
          >
            Edit
        </button>
      </div>

      <div>
      <button
          onClick={(event) => {
            fetch("http://localhost:3000/api/delete", {method: "DELETE", body: id});
          }}
          >
            Delete
        </button>
      </div>
  </div>;
}
