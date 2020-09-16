import * as React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Message, { IMessage } from "./message";
import Form from "./form";

// Messages component container
function Messages(props: { data, subscribeToNewComments }) {
  /* This works like a "onMounted" event and will make sure to
  create the subscription to new comments only once */
  React.useEffect(() => {
    props.subscribeToNewComments();
  }, []);

  // Container for messages
  const messages = props.data.messages;

  // Mutation query for posting message
  const [addMessage] = useMutation(gql`
    mutation aadMessage($input: MessageInput) {
      addMessage(input: $input) {
        author
        content
      }
    }
  `);

  // Handler for posting message data from form component
  const formHandler = (message: IMessage) => {
    addMessage({ variables: { input: { ...message } } })
  }
  return <div>
    {messages.map((message: IMessage, index: number) => <div key={index}><Message message={message} /></div>)}
    <hr />
    <div className="card">
      <h5 className="card-header">Add new message</h5>
      <div className="card-body">
        <Form onSubmit={formHandler} />
      </div>
    </div>
  </div>
}

/* Wrapper for messages container with data handler for
getting messages and subscribe to message updates*/
export default function MessagesWithData() {
  const { loading, subscribeToMore, ...result } = useQuery(gql`
  query {
    messages: getMessages {
      author
      content
    }
  }`);
  if (loading) { return <h1>Loading...</h1> }
  return <Messages
    {...result}
    subscribeToNewComments={() => subscribeToMore({
      document: gql`
      subscription { onMessageAdded {
        author
        content
      } }
    `,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        // Only return previous props if no new data is provided
        if (!subscriptionData.data) return prev;

        // Create new message data
        const newMessage: IMessage = {
          author: subscriptionData.data.onMessageAdded.author,
          content: subscriptionData.data.onMessageAdded.content
        };

        // Return previous data merged with current data
        return {
          messages: [
            ...prev.messages,
            newMessage
          ]
        }
      }
    })}
  />
}
