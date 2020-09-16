import * as React from 'react';

export interface IMessage {
  author: string;
  content: string;
}

// Message rendering
export default function Message(props: { message: IMessage }) {
  return <div className="card">
    <h5 className="card-header">
      {props.message.author}
    </h5>
    <div className="card-body">
      {props.message.content}
    </div>
  </div>
}