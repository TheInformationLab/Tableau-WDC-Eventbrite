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

// API Routes

module.exports = async (req, res) => {
  const { query } = parse(req.url, true);
  if (query && query.token) {
    let params = '';
    if (query.continuation) {
      params = `?page=${query.page}&continuation=${query.continuation}`;
    }
    const options = {
      method: 'GET',
      url: `https://www.eventbriteapi.com/v3/users/me/organizations${params}`,
      headers: {
        Authorization: `Bearer ${query.token}`,
      },
    };
    request(options, (error, response, body) => {
      const apiStatus = new ApiStatus();
      apiStatus.wdc = 'eventbrite';
      apiStatus.action = 'GET-me-organizations';
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
      status: 'Missing auth token',
    });
  }
};
