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
    fetch(`http://localhost:3000/api/get`, {
      method: "POST",
      body: id,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPost(data);
        setNewTitle(data.title);
        setNewBody(data.body);
      });
  }, []);

  return (
    <div className ={styles.main}>
      <h1 className ={styles.head}> Edit Your Post </h1>
      <form className={styles.input}>
        <input
          type="text"
          id="title"
          placeholder="Title"
          className={styles.inputFullLen}
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
            console.log(newTitle);
          }}
        ></input>
        <textarea
          id="text"
          placeholder="test"
          className={styles.bodyInputFullLen}
          value={newBody}
          onChange={(e) => {
            setNewBody(e.target.value);
            console.log(newBody);
          }}
        ></textarea>
      </form>
      <div className = {styles.buttons}>
      <div>
        <button
          onClick={() => {
            const body = {
              id: id,
              change: {
                title: newTitle,
                body: newBody,
                comments: post.comments,
                time: post.time,
              },
            };
            if (
              (newTitle !== post.title && newTitle !== "") ||
              (newBody !== post.body && newBody !== "")
            ) {
              fetch("http://localhost:3000/api/edit", {
                method: "PUT",
                body: JSON.stringify(body),
              }).then(() => {
                router.push(`/${id}`);
                console.log("hello");
              });
            }
          }}
          className ={styles.editButton}
        >
           ✏️ Edit
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            fetch("http://localhost:3000/api/delete", {
              method: "DELETE",
              body: id,
            }).then(() => {
              router.push("../..");
            });
          }}
          className ={styles.deleteButton}
        >
          ❌ Delete 
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            router.push(`/${id}`);
          }}
          className ={styles.cancelButton}
        >
           ⬅️ Cancel
        </button>
      </div>
      </div>
    </div>
  );
}
