import * as React from 'react';
import MessagesWithData from "./messages";

export default function App() {
  return (
    <div className="container mt-5">
      <h1>Simple Chat</h1>
      <MessagesWithData />
    </div>
  );
}
