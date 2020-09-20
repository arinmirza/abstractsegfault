const fetch = require('node-fetch');
const $ = require('jquery')

exports.handler = async (event, context) => {

  let content = "";
  $.getJSON('https://json.geoiplookup.io/', function(data) {
    content = JSON.stringify(data, null, 2);
  });

  return fetch(process.env.SLACK_WEBHOOK_URL, {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ text: content })
  })
    .then(() => ({
      statusCode: 200,
      body: `Hello there 👋!`
    }))
    .catch(error => ({
      statusCode: 422,
      body: `Oops! Something went wrong. ${error}`
    }));
};
