import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

const Edit = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const { post } = props;
  const [newTitle, setNewTitle] = useState(post.title);
  const [newBody, setNewBody] = useState(post.body);

  useEffect(() => {
    console.log(post);
  });

  return (
    <div className={styles.main}>
      <h1 className={styles.head}> Edit Your Post </h1>

      <form className={styles.input}>
        <input
          type="text"
          id="title"
          placeholder="Title"
          className={styles.inputFullLen}
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
        ></input>

        <textarea
          id="text"
          placeholder="Text"
          className={styles.bodyInputFullLen}
          value={newBody}
          onChange={(e) => {
            setNewBody(e.target.value);
          }}
        ></textarea>
      </form>
      <div className={styles.buttons}>
        <div>
          <button
            onClick={() => {
              router.push(`/${id}`);
            }}
            className={styles.cancelButton}
          >
            ⬅️ Cancel
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
            className={styles.deleteButton}
          >
            ❌ Delete
          </button>
        </div>
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
                });
              }
            }}
            className={styles.editButton}
          >
            ✏️ Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch("http://localhost:3000/api/example");
  const data = await response.json();
  return {
    paths: data.map((post) => ({ params: { id: post._id } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const response = await fetch(`http://localhost:3000/api/${id}`);
  const data = await response.json();
  return {
    props: {
      post: data,
    },
  };
}

export default Edit;
