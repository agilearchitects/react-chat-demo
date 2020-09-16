import * as React from "react";
import { IMessage } from "./message";

// Form for adding new message
export default function Form(props: { onSubmit: (message: IMessage) => void }) {
  let author: "";
  let content: "";
  const onSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ author, content });
  }
  const onAuthorChange = (event) => {
    author = event.target.value;
  }
  const onContentChange = (event) => {
    content = event.target.value;
  }
  return <form onSubmit={onSubmit}>
    <div className="form-group">
      <input className="form-control" type="text" placeholder="Author" value={author} onChange={onAuthorChange}></input>

    </div>
    <div className="form-group">
      <input className="form-control" type="text" placeholder="Content" value={content} onChange={onContentChange}></input>
    </div>
    <input className="btn btn-primary" type="submit" value="SUBMIT" />
  </form >
}