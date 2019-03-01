const mongoose = require('mongoose');
const { send } = require('micro');
const { parse } = require('url');
const request = require('request');

mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBURI}`, { useNewUrlParser: true });

const apiStatusSchema = mongoose.Schema({
  wdc: String,
  action: String,
  responseCode: Number,
  error: String,
}, { timestamps: { createdAt: 'createdAt' } });

const ApiStatus = mongoose.model('ApiStatus', apiStatusSchema);

// End Database config & schema

const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;

// API Routes

module.exports = async (req, res) => {
  const { query } = parse(req.url, true);
  if (query && query.code) {
    const options = {
      method: 'POST',
      url: 'https://www.eventbrite.com/oauth/token',
      headers:
       { 'Content-Type': 'application/x-www-form-urlencoded' },
      form: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: query.code,
      },
    };
    request(options, (error, response, body) => {
      const apiStatus = new ApiStatus();
      apiStatus.wdc = 'kissflow';
      apiStatus.action = 'POST-auth';
      apiStatus.responseCode = response.statusCode;
      if (response.statusCode !== 200) {
        apiStatus.error = body;
      }
      apiStatus.save(() => {
        if (response.statusCode !== 200) {
          send(res, response.statusCode, {
            result: 'error',
            status: response.statusCode,
            body,
          });
          return;
        }
        send(res, 200, JSON.parse(body));
      });
    });
  } else {
    send(res, 200, {
      result: 'error',
      status: 'Missing auth code',
    });
  }
};
