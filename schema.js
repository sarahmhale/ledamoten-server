const fetch = require('node-fetch');
const util = require('util')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

//Hardcoded data
const person = [{
    sourceid: "1",
    efternamn: "Hultberg",
    tilltalsnamn: "Johan",
  },
  {
    sourceid: "2",
    efternamn: "Viberg",
    tilltalsnamn: "Johan",
  },
  {
    sourceid: "3",
    efternamn: "Andersson",
    tilltalsnamn: "Anna",
  }
]

//LedamotType
const LedamotType = new GraphQLObjectType({
  name: 'Ledamot',
  fields: () => ({
    sourceid: { type: GraphQLString },
    efternamn: { type: GraphQLString },
    tilltalsnamn: { type: GraphQLString }
    //TODO: Parti
    //TODO: img
  })
})

//Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    ledamot: {
      type: LedamotType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(_, args) {
        for (let i = 0; i < person.length; i++) {
          if (person[i].sourceid == args.id)
            return person[i]
        }
      }
    }
  })
})
module.exports = new GraphQLSchema({
  query: RootQuery
})
