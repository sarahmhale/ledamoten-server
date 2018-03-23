const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema')
const cors = require('cors')

app.use('/graphql', cors(), graphqlHTTP({
  schema,
  graphiql:true
}))


app.listen(4000)
console.log('Listening to port 4000')
