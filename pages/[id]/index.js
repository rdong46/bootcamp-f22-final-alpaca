import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Post() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image src={temp} alt="logo" width={72} height="auto" />
          <div>Temporary App Name</div>
        </div>
      </div>

      <div>{post.title}</div>
      <div>{post.body}</div>
      <div> Comments {
        post && post.comments.map((c, index) => (
            <div className="mt-4 border-0" key={index}>
                <div>
                    
                        {c.content}
                    
                </div>
            </div>
        ))}

        <form className={styles.input}>
        <input
            type="text"
            id = "comment"
            placeholder="Enter comment here"
            className={styles.bodyInput}
            value={comment.content}
            onChange={(event) => setComment({content:event.target.value})}
          ></input>

          <button className={styles.submitButton}
            onClick={(event) => {
              comment(event)
              console.log(addComment)
            }}> Comment </button>
          </form>
        </div>
      </div>
  );
}


