import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function Post() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const userId = JSON.parse(localStorage.getItem("userId") as string);
  const sendDatatoApp = async () => {
    try {
      let x = await axios.post("http://localhost:8080/api/savepost", {
        title,
        body,
        userId,
      });
      console.log(x?.status, "success");
      if (x?.status === 200) {
        router.push("/profile");
      }
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <div className="container">
      <form action="">
        <div className="form-group mt-3">
          <label htmlFor="">Enter Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ margin: "12px" }}
            placeholder="Enter title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="">Enter Description</label>

          <textarea
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ margin: "12px" }}
            placeholder="Enter Description"
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          type="button"
          onClick={sendDatatoApp}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
