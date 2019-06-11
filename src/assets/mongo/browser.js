const {
  Stitch,
  AnonymousCredential,
} = require('mongodb-stitch-browser-sdk');

const client = Stitch.initializeDefaultAppClient('til-wdc-dev-fwbxx');

const auth = () => new Promise((resolve, reject) => {
  console.log(`User login status: ${client.auth.isLoggedIn}`);
  if (client.auth.isLoggedIn) {
    resolve();
  } else {
    client.auth
      .loginWithCredential(new AnonymousCredential())
      .then((user) => {
        console.log(`Logged in as anonymous user with id: ${user.id}`);
        resolve();
      })
      .catch(reject);
  }
});

const recordStat = (wdc, action) => new Promise((resolve, reject) => auth()
  .then(() => client.callFunction('recordWdcStatistic', [wdc, action]))
  .then((result) => {
    resolve(result);
  })
  .catch(reject));

const ebAuth = code => new Promise((resolve, reject) => auth()
  .then(() => client.callFunction('eventbriteAuth', [code]))
  .then((result) => {
    resolve(result);
  })
  .catch(reject));

const currentUserProfile = token => new Promise((resolve, reject) => auth()
  .then(() => client.callFunction('eventbriteCurrentUserPofile', [token]))
  .then((result) => {
    if (result && result.name) {
      resolve(true);
    } else {
      resolve(false);
    }
  })
  .catch(reject));

const getMyOrganisations = token => new Promise((resolve, reject) => auth()
  .then(() => client.callFunction('eventbriteCurrentUserOrganisations', [token]))
  .then((result) => {
    resolve(result);
  })
  .catch(reject));

const getMyEvents = token => new Promise((resolve, reject) => auth()
  .then(() => client.callFunction('eventbriteCurrentUserEvents', [token]))
  .then((result) => {
    resolve(result);
  })
  .catch(reject));

const reqAttendees = (token, org, callback, data, page, continuation) => {
  let pg = 1;
  if (page) {
    pg = page;
  }
  client.callFunction('eventbriteOrganisationAttendees', [token, org, page, continuation])
    .then((response) => {
      let { attendees } = response;
      if (data) {
        attendees = attendees.concat(data);
      }
      if (response.pagination.has_more_items && response.pagination.continuation) {
        // const currentUserCount = response.pagination.page_number * response.pagination.page_size;
        // const totalUserCount = response.pagination.page_count * response.pagination.page_size;
        reqAttendees(token, org, callback, attendees, pg + 1, response.pagination.continuation);
      } else {
        callback(attendees);
      }
    });
};

const getAttendees = (token, org) => new Promise(resolve => auth()
  .then(() => {
    reqAttendees(token, org, (attendees) => {
      resolve(attendees);
    });
  }));


module.exports = {
  recordStat,
  ebAuth,
  currentUserProfile,
  getMyOrganisations,
  getMyEvents,
  getAttendees,
};
