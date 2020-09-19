import fetch from "node-fetch";

exports.handler = async (event, context) => {

  // Send greeting to Slack
  return fetch(process.env.SLACK_WEBHOOK_URL, {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({ text: `Someone says hello!` })
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
