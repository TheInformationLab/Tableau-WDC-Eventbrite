const { parse } = require('url');
const app = require('express')();
const cors = require('cors');
const request = require('request');

app.use(cors());

const clientId = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;

app.get('/api/auth', (req, res) => {
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
    console.log(options);

    request(options, (error, response, body) => {
      if (error) console.log(error);
      res.end(body);
    });
  } else {
    res.end({ err: 'Missing auth code' });
  }
});

app.listen(3001, () => {
  console.log('CORS-enabled web server listening on port 3001');
});
