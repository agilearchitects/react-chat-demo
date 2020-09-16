import { ApolloServer, gql, IResolvers, PubSub } from "apollo-server";

interface IMessage {
  author: string;
  content: string;
}

// Create pubsub module
const pubsub = new PubSub();

// Schema for graphql
const typeDefs = gql`
  type Subscription {
    onMessageAdded: Message
  }

  type Query {
    getMessages: [Message]
  }

  type Mutation {
    addMessage(input: MessageInput): Message
  }

  type Message {
    author: String
    content: String
  }

  input MessageInput {
    author: String
    content: String
  }
`;

// Message container (DB)
const messages: IMessage[] = [
  { author: "John Doe", content: "Hello World" }
];

// graphql resolver
const resolvers: IResolvers = {
  Query: {
    getMessages: () => messages,
  },
  Subscription: {
    onMessageAdded: {
      subscribe: (parent: any, args: any, context: any) => context.pubsub.asyncIterator(["MESSAGE_ADDED"]),
      resolve: payload => payload
    }
  },
  Mutation: {
    addMessage(_, { input }, context: any) {
      const message: IMessage = { author: input.author, content: input.content };
      context.pubsub.publish("MESSAGE_ADDED", message);
      messages.push(message);
      return message;
    },
  },
};

new ApolloServer({
  typeDefs, resolvers,
  context: request => {
    return {
      ...request,
      pubsub,
    }
  }
}).listen().then((a) => console.log("Now browse to http://localhost:4000/graphql"));