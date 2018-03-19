const fetch = require('node-fetch');
const util = require('util')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString
} = require('graphql')
const parseXML = util.promisify(require('xml2js').parseString)


const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: json => {
        return json.species.name
      }
    },
    height: {
      type: GraphQLString,
      resolve: json => {
        return json.height
      }
    },
    weight: {
      type: GraphQLString,
      resolve: json => {
        return json.weight
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      pokemon: {
        type: PokemonType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (root, args) => {
          return fetch(`https://pokeapi.co/api/v2/pokemon/${args.id}/`).then(u => u.json()).then(
            val =>  val).catch(function(err) {

          });

        }
      }
    })
  })
})
