import React, { useEffect, useReducer, useRef, useState } from "react";

function blogsReducer(state, action){
  switch(action.type){
    case "ADD":
      return [action.blog, ...state];

    case "REMOVE":
      return state.filter((blog, index)=> index !== action.index);

    default:
      return [];
  }
}
export default function Blog() {
  //   const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");
  const [formData, setFormData] = useState({ title: "", content: "" });
  // const [blogs, setBlogs] = useState([]);
  const [blogs, dispatch] = useReducer(blogsReducer, []);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  },[]);

  useEffect(() => {
    if(blogs.length && blogs[0].title){
      document.title = blogs[0].title;
    }else{
      document.title = "No Blogs !!";
    }
  },[blogs]);

  function handleSubmit(e) {
    e.preventDefault();
    // setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
    dispatch({type: "ADD", blog:{title: formData.title, content: formData.content}})
    setFormData({ title: "", content: "" });
    titleRef.current.focus();
  }

  function removeBlog(i) {
    // setBlogs(blogs.filter((blog, index) => i !== index));
    dispatch({type: "REMOVE", index: i})
  }
  return (
    <>
      <h1>Write a Blog!</h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter the Title here..."
              value={formData.title}
              ref={titleRef}
              onChange={(e) =>
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                })
              }
            />
          </Row>
          <Row label="Content">
            <textarea
              className="input content"
              placeholder="Content goes here..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ title: formData.title, content: e.target.value })
              }
              required
            />
          </Row>
          <button className="btn">ADD</button>
        </form>
      </div>
      <hr />
      <h2>Blogs</h2>
      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>{i + 1 + ". " + blog.title}</h3>
          <p>{blog.content}</p>

          <div className="blog-btn">
            <button onClick={() => removeBlog(i)} className="remove btn">
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

function Row(props) {
  const { label } = props;
  return (
    <>
      <lable>
        {label}
        <br />
      </lable>
      {props.children}
      <hr />
    </>
  );
}
