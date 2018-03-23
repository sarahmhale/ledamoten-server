const fetch = require('node-fetch');
const util = require('util')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

let partier = {
  'S': { ledamoter: [] },
  'M': { ledamoter: [] },
  'SD': { ledamoter: [] },
  'MP': { ledamoter: [] },
  'C': { ledamoter: [] },
  'V': { ledamoter: [] },
  'L': { ledamoter: [] },
  'KD': { ledamoter: [] }
}
const url = `http://data.riksdagen.se/personlista/?iid=&fnamn=&enamn=&f_ar=&kn=&parti=&valkrets=&org=&utformat=json`

const filterLedamoter = (ledamoter, nrOfLedamoter) => {
  for (let parti in partier) {
    partier[parti].ledamoter.push(ledamoter.filter(ledamot => {
      if (ledamot.parti === parti) {
        return ledamot
      }
    }))
  }
}
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const randomLedamoter = (ledamoter, nrOfLedamoter) => {
  filterLedamoter(ledamoter)
  nrParti = nrOfLedamoter / 8
  let randomLedamoter = []

  for (let parti in partier) {

    aa = shuffle(partier[parti].ledamoter[0])
    let sliced = aa.slice(0, Math.ceil(nrParti))
    randomLedamoter = randomLedamoter.concat(sliced)
  }
  return randomLedamoter
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
      args: {
        nr: { type: GraphQLInt }
      },
      resolve: (_, args) => {
        return fetch(url).then(u => u.json()).then(result => randomLedamoter(result.personlista.person, args.nr))
      }
    }
  })
})
module.exports = new GraphQLSchema({
  query: RootQuery
})
