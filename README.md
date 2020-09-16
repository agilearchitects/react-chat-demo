# Simple chat DEMO
This simple demo shows the use of React together with Graphql using Apollo Server and client.

Messages are fetched from the API and listed on rendering. On mounted a subscription over websocket is started as well to listen to any new message. The subscription is defined in the graphql schema.

When a new message is submited using the simple form at the bottom of the page any other client will automatically get the message rendered on their screen

## Getting started
Installing DP's
```
$ yarn
```
Serving API
```
$ yarn serve-api
```
Serving SPA
```
$ yarn serve-spa
```

Make sure to serve the API before trying to render the SPA page

The SPA is servered under localhost:1234

## ToDo
- Form is not cleared after submit and submitting the form again (without touching the input fields) will submit with empty values for "author" and "content"
- Move fetching, mutation and subscription of messages in the API to it's own service 
- General improvments of UX and UI