const fetch = require('node-fetch');
const util = require('util')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')
const url = 'http://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&org=&utformat=json'


//LedamotType
const LedamotType = new GraphQLObjectType({
  name: 'Ledamot',
  fields: () => ({
    sourceid: { type: GraphQLString },
    efternamn: { type: GraphQLString },
    tilltalsnamn: { type: GraphQLString },
    bild_url_max: {type: GraphQLString},
    parti: {type: GraphQLString}
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
      //TODO: Get from unike id
      }
    },
    ledamoter: {
      type: new GraphQLList(LedamotType),
      resolve(_, args) {
        return fetch(url).then(u => u.json()).then(
          result => result.personlista.person).catch(err => console.log(err))

      }
    }
  })
})
module.exports = new GraphQLSchema({
  query: RootQuery
})
