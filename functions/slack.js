const fetch = require('node-fetch');
const getJSON = require('get-json');

exports.handler = async (event, context) => {

  let content = "";
  await getJSON('https://json.geoiplookup.io/').then(res => content = res);
  
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
