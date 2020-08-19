const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");
const weatherForecastType = require("./weatherForecastType");
const axios = require("axios");
const APPID = require("./keys");

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    weatherForecast: {
      type: weatherForecastType,
      description: "Weather forecast for the next 5 days / 3 hours",
      args: {
        city: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (_, { city }) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${APPID}`;
        return axios.get(url).then(function (response) {
          return response.data;
        });
      },
    },
  }),
});

const schema = new GraphQLSchema({ query });

module.exports = schema;
