const aws = require('aws-sdk');
const ses = new aws.SES({ region: 'us-west-2' });

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);
  const params = {
    Destination: {
      ToAddresses: [
        'info@skypilot.dev',
      ],
    },
    Message: {
      Body: {
        Text: {
          Data: JSON.stringify(body, undefined, 2),
        },
      },
      Subject: {
        Data: `Contact request from ${body.name} <${body.email}>`,
      },
    },
    Source: 'bot@skypilot.dev',
  };

  ses.sendEmail(params, function (err, data) {
    callback(null, { err, data });
    if (err) {
      console.log(err);
      context.fail(err);
    } else {
      console.log(data);
      context.succeed(event);
    }
  });
};
