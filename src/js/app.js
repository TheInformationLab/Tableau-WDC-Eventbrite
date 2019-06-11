// jQuery
import 'jquery';
// PopperJS
import 'popper.js';
// Bootstrap 4
import 'bootstrap';
// Material Design Bootstrap
import '../vendors/mdb/js/mdb';

const {
  recordStat,
  ebAuth,
  currentUserProfile,
  getMyOrganisations,
  getMyEvents,
  getAttendees,
} = require('../assets/mongo/browser');

const tableauwdc = require('./tableauwdc/tableauwdc.js');

tableauwdc.init();

const { tableau } = window;

const { async } = window;

const schOrganisation = [{
  id: '_type',
  alias: 'Type',
  dataType: 'string',
}, {
  id: 'name',
  alias: 'Name',
  dataType: 'string',
}, {
  id: 'vertical',
  alias: 'Business Vertical',
  dataType: 'string',
}, {
  id: 'locale',
  alias: 'Locale',
  dataType: 'string',
}, {
  id: 'image_id',
  alias: 'Image ID',
  dataType: 'string',
}, {
  id: 'id',
  alias: 'Organisation ID',
  dataType: 'string',
}];

const schEvent = [{
  id: 'name_text',
  alias: 'Name (Text)',
  dataType: 'string',
}, {
  id: 'name_html',
  alias: 'Name (HTML)',
  dataType: 'string',
}, {
  id: 'description_text',
  alias: 'Description (Text)',
  dataType: 'string',
}, {
  id: 'description_html',
  alias: 'Description (HTML)',
  dataType: 'string',
}, {
  id: 'id',
  alias: 'Event ID',
  dataType: 'string',
}, {
  id: 'url',
  alias: 'Event URL',
  dataType: 'string',
}, {
  id: 'start_timezone',
  alias: 'Start Timezone',
  dataType: 'string',
}, {
  id: 'start_local',
  alias: 'Start Time (Local)',
  dataType: 'datetime',
}, {
  id: 'start_utc',
  alias: 'Start Time (UTC)',
  dataType: 'datetime',
}, {
  id: 'end_timezone',
  alias: 'End Timezone',
  dataType: 'string',
}, {
  id: 'end_local',
  alias: 'End Time (Local)',
  dataType: 'datetime',
}, {
  id: 'end_utc',
  alias: 'End Time (UTC)',
  dataType: 'datetime',
}, {
  id: 'organization_id',
  alias: 'Organisation ID',
  dataType: 'string',
}, {
  id: 'created',
  alias: 'Created',
  dataType: 'datetime',
}, {
  id: 'changed',
  alias: 'Changed',
  dataType: 'datetime',
}, {
  id: 'capacity',
  alias: 'Capacity',
  dataType: 'int',
}, {
  id: 'status',
  alias: 'Status',
  dataType: 'string',
}, {
  id: 'currency',
  alias: 'Currency',
  dataType: 'string',
}, {
  id: 'listed',
  alias: 'Publicly Searchable?',
  dataType: 'bool',
}, {
  id: 'shareable',
  alias: 'Social Sharing Buttons?',
  dataType: 'bool',
}, {
  id: 'invite_only',
  alias: 'Invite Only?',
  dataType: 'bool',
}, {
  id: 'online_event',
  alias: 'Online Event?',
  dataType: 'bool',
}, {
  id: 'show_remaining',
  alias: 'Show Remaining Tickets?',
  dataType: 'bool',
}, {
  id: 'is_locked',
  alias: 'Event Locked?',
  dataType: 'bool',
}, {
  id: 'privacy_setting',
  alias: 'Event Privacy Setting',
  dataType: 'string',
}, {
  id: 'is_series',
  alias: 'Event Series?',
  dataType: 'bool',
}, {
  id: 'is_free',
  alias: 'Free Event?',
  dataType: 'bool',
}, {
  id: 'logo_id',
  alias: 'Logo ID',
  dataType: 'string',
}, {
  id: 'organizer_id',
  alias: 'Organiser ID',
  dataType: 'string',
}, {
  id: 'venue_id',
  alias: 'Venue ID',
  dataType: 'string',
}, {
  id: 'category_id',
  alias: 'Category ID',
  dataType: 'string',
}];

const schAttendee = [{
  id: 'id',
  alias: 'Attendee ID',
  dataType: 'string',
}, {
  id: 'changed',
  alias: 'Changed',
  dataType: 'datetime',
}, {
  id: 'created',
  alias: 'Created',
  dataType: 'datetime',
}, {
  id: 'quantity',
  alias: 'Qty',
  dataType: 'int',
}, {
  id: 'first_name',
  alias: 'First Name',
  dataType: 'string',
}, {
  id: 'last_name',
  alias: 'Last Name',
  dataType: 'string',
}, {
  id: 'company',
  alias: 'Company',
  dataType: 'string',
}, {
  id: 'name',
  alias: 'Full Name',
  dataType: 'string',
}, {
  id: 'email',
  alias: 'Email',
  dataType: 'string',
}, {
  id: 'job_title',
  alias: 'Job Title',
  dataType: 'string',
}, {
  id: 'checked_in',
  alias: 'Checked In?',
  dataType: 'bool',
}, {
  id: 'cancelled',
  alias: 'Cancelled?',
  dataType: 'bool',
}, {
  id: 'refunded',
  alias: 'Refunded?',
  dataType: 'bool',
}, {
  id: 'status',
  alias: 'Status',
  dataType: 'string',
}, {
  id: 'ticket_class_name',
  alias: 'Ticket Class',
  dataType: 'string',
}, {
  id: 'event_id',
  alias: 'Event ID',
  dataType: 'string',
}, {
  id: 'order_id',
  alias: 'Order ID',
  dataType: 'string',
}];

const tblMyOrganisations = {
  id: 'myOrganisations',
  alias: 'My Organisations',
  columns: schOrganisation,
};

const tblMyEvents = {
  id: 'myEvents',
  alias: 'My Events',
  columns: schEvent,
};

const tblMyAttendees = {
  id: 'myAttendees',
  alias: 'My Attendees',
  columns: schAttendee,
};

const attendeesbyMyEventsOrganisations = {
  alias: 'Attendees by My Organisations & Events',
  tables: [{
    id: tblMyOrganisations.id,
    alias: tblMyOrganisations.alias,
  }, {
    id: tblMyEvents.id,
    alias: tblMyEvents.alias,
  }, {
    id: tblMyAttendees.id,
    alias: tblMyAttendees.alias,
  }],
  joins: [{
    left: {
      tableAlias: tblMyOrganisations.alias,
      columnId: 'id',
    },
    right: {
      tableAlias: tblMyEvents.alias,
      columnId: 'organization_id',
    },
    joinType: 'inner',
  }, {
    left: {
      tableAlias: tblMyEvents.alias,
      columnId: 'id',
    },
    right: {
      tableAlias: tblMyAttendees.alias,
      columnId: 'event_id',
    },
    joinType: 'left',
  }],
};

const schema = {
  tables: [
    tblMyOrganisations,
    tblMyEvents,
    tblMyAttendees,
  ],
  joins: [
    attendeesbyMyEventsOrganisations,
  ],
};


const authUrl = 'https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=JBPF3IE2KZRNFNGHEI';
// const serverBase = '';
// **
// START Utility functions
// **

// Function getQueryParams
//  - Parses URL parameters into a JSON Object
// @qs  {string}    The URL query string, usually from document.location.search
function getParameterByName(name) {
  const url = window.location.href;
  const testName = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${testName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function checkTokens(callback) {
  const creds = JSON.parse(tableau.password);
  currentUserProfile(creds.access_token)
    .then((result) => {
      if (result) {
        callback();
      } else {
        tableau.abortWithError('Eventbrite user session invalid. Login again');
      }
    });
}

// **
// END Utility functions
// **

// **
// START Tableau WDC Code
// **

const ebConnector = tableau.makeConnector();

ebConnector.init = (initCallback) => {
  tableau.authType = tableau.authTypeEnum.custom;
  tableau.connectionName = 'Eventbrite';

  const code = getParameterByName('code');
  let hasAuth = false;
  if (tableau.password) {
    hasAuth = tableau.password.length > 0;
  }
  if (code) {
    // User has logged in. Saving token to password
    const authcode = code;
    ebAuth(authcode)
      .then((tokens) => {
        if (tableau.phase === tableau.phaseEnum.interactivePhase
            || tableau.phase === tableau.phaseEnum.authPhase) {
          if (!hasAuth) {
            if (tableau.password === undefined || tableau.password === '') {
              tableau.password = JSON.stringify(tokens);
            }
            tableau.submit();
          } else {
            tableau.submit();
          }
        }
      });
  } else if (hasAuth) {
    tableau.submit();
  } else {
    recordStat('eventbrite', 'view')
      .then(() => {
        window.location.href = authUrl;
      })
      .catch(tableau.abortWithError);
  }
  initCallback();
};

// Define the schema
ebConnector.getSchema = (schemaCallback) => {
  schemaCallback(schema.tables, schema.joins);
};

// Download the data
ebConnector.getData = (table, doneCallback) => {
  recordStat('eventbrite', 'download')
    .then(() => {
      tableau.log('Getting Data');
      checkTokens(() => {
        tableau.log('Token Checked');
        const creds = JSON.parse(tableau.password);
        if (table.tableInfo.id === 'myOrganisations') {
          tableau.reportProgress('Getting my organisations');
          getMyOrganisations(creds.access_token)
            .then((organisations) => {
              table.appendRows(organisations);
              doneCallback();
            });
        } else if (table.tableInfo.id === 'myEvents') {
          tableau.log('Getting myEvents');
          tableau.reportProgress('Getting my events');
          getMyEvents(creds.access_token)
            .then((events) => {
              table.appendRows(events);
              doneCallback();
            });
        } else if (table.tableInfo.id === 'myAttendees') {
          tableau.reportProgress('Getting attendees');
          getMyOrganisations(creds.access_token)
            .then((organisations) => {
              async.each(organisations, (organisation, doneOrg) => {
                tableau.reportProgress(`Getting attendees for organisation ${organisation.name}. This may take a while...`);
                getAttendees(creds.access_token, organisation.id)
                  .then((attendees) => {
                    table.appendRows(attendees);
                    doneOrg();
                  });
              }, (err) => {
                if (err) console.error(err);
                doneCallback();
              });
            });
        }
      });
    })
    .catch(tableau.abortWithError);
};

tableau.registerConnector(ebConnector);


// **
// END Tableau WDC Code
// **
