const fetch = require('node-fetch');
const util = require('util')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')


//TODO: nr from each parti

const ledamotFromParti = async(nrOfLedamot, parti) => {
  let url = `http://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=${parti}&valkrets=&org=&utformat=json`

  const response = await fetch(url);
  const json = await response.json();
  console.log(json)
  const ledamoter = json.personlista.person

  let randomLedamoter = []

  for (i = 0; i < nrOfLedamot; i++) {
    randomLedamoter.push(ledamoter[Math.floor(Math.random() * ledamoter.length)])
  }
  console.log(randomLedamoter)
  return randomLedamoter;

}
const LedamotType = new GraphQLObjectType({
  name: 'Ledamot',
  fields: () => ({
    sourceid: { type: GraphQLString },
    efternamn: { type: GraphQLString },
    tilltalsnamn: { type: GraphQLString },
    bild_url_max: { type: GraphQLString },
    parti: { type: GraphQLString }
  })
})

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
        ledamotFromParti(3, "M").then(result => console.log(result))

      }
    }
  })
})
module.exports = new GraphQLSchema({
  query: RootQuery
})
