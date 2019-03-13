// jQuery
import 'jquery';
// PopperJS
import 'popper.js';
// Bootstrap 4
import 'bootstrap';
// Material Design Bootstrap
import '../vendors/mdb/js/mdb';

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


let authUrl = 'https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=JBPF3IE2KZRNFNGHEI';
let serverBase = '';

if (window.location.host !== 'eventbrite-wdc.theinformationlab.io' && window.location.host !== 'eventbrite.wdc.dev') {
  authUrl = 'https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=ELT6SJD5DOE42FQTHU';
  serverBase = 'https://eventbrite.wdc.dev';
}

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

// Function convertDateTime
//  - Parses datetime returned from API to one for Tableau
// @dt  {string}    The datetime to convert
function convertDateTime(dt) {
  let newdt = dt.replace('T', ' ');
  newdt = newdt.replace('Z', '');
  return newdt;
}

// Function getTokens
//  - Gets access and refresh tokens for the logged in user
// @code        {string}  authorisation code from OAuth2 redirect
// @callback    {function}  callback function returning the credentials
function getTokens(code, callback) {
  const settings = {
    url: `${serverBase}/api/auth?code=${code}`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };

  $.ajax(settings).done((response) => {
    callback(response);
  });
}

function tokensValid(callback) {
  const creds = JSON.parse(tableau.password);
  const settings = {
    url: `${serverBase}/api/users/me?token=${creds.access_token}`,
    method: 'GET',
  };
  $.ajax(settings).done((response) => {
    if (response && response.name) {
      callback(true);
    } else {
      callback(false);
    }
  });
}

function checkTokens(callback) {
  tokensValid((result) => {
    if (result) {
      callback();
    } else {
      tableau.abortWithError('Eventbrite user session invalid. Login again');
    }
  });
}

// Function getMyOrganisations
//  - Gets organisations associated with the current user
// @callback      {array}   List of organisations
// @data          {array}   Optional, data already downloaded and passed on for paging
// @continuation  {string}  Continuation token for next page of data
function getMyOrganisations(callback, data, page, continuation) {
  const creds = JSON.parse(tableau.password);
  let pg = page;
  if (!page) {
    pg = 1;
  }
  let params = '';
  if (continuation) {
    params = `&page=${pg}&continuation=${continuation}`;
  }
  const settings = {
    url: `${serverBase}/api/me/organizations?token=${creds.access_token}${params}`,
    method: 'GET',
  };

  $.ajax(settings).done((response) => {
    let organisations = [];
    if (data) {
      organisations = data;
    }
    if (response.organizations && response.organizations.length > 0) {
      organisations = organisations.concat(response.organizations);
    }
    if (response.pagination.has_more_items && response.pagination.continuation) {
      getMyOrganisations(callback, organisations, page + 1, response.pagination.continuation);
    } else {
      callback(organisations);
    }
  });
}

// Function getMyOrganisations
//  - Gets organisations associated with the current user
// @callback      {array}   List of organisations
// @data          {array}   Optional, data already downloaded and passed on for paging
// @continuation  {string}  Continuation token for next page of data
function getMyEvents(callback, data, page, continuation) {
  const creds = JSON.parse(tableau.password);
  let pg = page;
  if (!page) {
    pg = 1;
  }
  let params = '';
  if (continuation) {
    params = `&page=${pg}&continuation=${continuation}`;
  }
  const settings = {
    url: `${serverBase}/api/me/ownedevents?token=${creds.access_token}${params}`,
    method: 'GET',
  };

  $.ajax(settings).done((response) => {
    let events = [];
    if (data) {
      events = data;
    }
    if (response.events && response.events.length > 0) {
      for (let i = 0; i < response.events.length; i += 1) {
        const record = {};
        const event = response.events[i];
        record.name_text = event.name.text;
        record.name_html = event.name.html;
        record.description_text = event.description.text;
        record.description_html = event.description.html;
        record.id = event.id;
        record.url = event.url;
        record.start_timezone = event.start.timezone;
        record.start_local = convertDateTime(event.start.local);
        record.start_utc = convertDateTime(event.start.utc);
        record.end_timezone = event.end.timezone;
        record.end_local = convertDateTime(event.end.local);
        record.end_utc = convertDateTime(event.end.utc);
        record.organization_id = event.organization_id;
        record.created = convertDateTime(event.created);
        record.changed = convertDateTime(event.changed);
        record.capacity = event.capacity;
        record.status = event.status;
        record.currency = event.currency;
        record.listed = event.listed;
        record.shareable = event.shareable;
        record.invite_only = event.invite_only;
        record.online_event = event.online_event;
        record.show_remaining = event.show_remaining;
        record.is_locked = event.is_locked;
        record.privacy_setting = event.privacy_setting;
        record.is_series = event.is_series;
        record.is_free = event.is_free;
        record.logo_id = event.logo_id;
        record.organizer_id = event.organizer_id;
        record.venue_id = event.venue_id;
        record.category_id = event.category_id;
        events.push(record);
      }
    }
    if (response.pagination.has_more_items && response.pagination.continuation) {
      getMyEvents(callback, events, page + 1, response.pagination.continuation);
    } else {
      callback(events);
    }
  });
}

// Function getAttendees
//  - Gets attendees associated with an organisation
// @callback      {array}   List of attendees
// @data          {array}   Optional, data already downloaded and passed on for paging
// @continuation  {string}  Continuation token for next page of data
function getAttendees(organisationId, callback, data, page, continuation) {
  const creds = JSON.parse(tableau.password);
  let pg = page;
  if (!page) {
    pg = 1;
  }
  let params = `&org=${organisationId}`;
  if (continuation) {
    params += `&page=${pg}&continuation=${continuation}`;
  }
  const settings = {
    url: `${serverBase}/api/organizations/attendees?token=${creds.access_token}${params}`,
    method: 'GET',
  };

  $.ajax(settings).done((response) => {
    let attendees = [];
    if (data) {
      attendees = data;
    }
    if (response.attendees && response.attendees.length > 0) {
      for (let i = 0; i < response.attendees.length; i += 1) {
        const record = {};
        const attendee = response.attendees[i];
        record.id = attendee.id;
        record.changed = convertDateTime(attendee.changed);
        record.created = convertDateTime(attendee.created);
        record.quantity = attendee.quantity;
        record.first_name = attendee.profile.first_name;
        record.last_name = attendee.profile.last_name;
        record.company = attendee.profile.company;
        record.name = attendee.profile.name;
        record.email = attendee.profile.email;
        record.job_title = attendee.profile.job_title;
        record.checked_in = attendee.checked_in;
        record.cancelled = attendee.cancelled;
        record.refunded = attendee.refunded;
        record.status = attendee.status;
        record.ticket_class_name = attendee.ticket_class_name;
        record.event_id = attendee.event_id;
        record.order_id = attendee.order_id;
        attendees.push(record);
      }
    }
    if (response.pagination.has_more_items && response.pagination.continuation) {
      const currentUserCount = response.pagination.page_number * response.pagination.page_size;
      const totalUserCount = response.pagination.page_count * response.pagination.page_size;
      tableau.reportProgress(`Downloaded ${currentUserCount} of ${totalUserCount} attendees`);
      getAttendees(organisationId, callback, attendees,
        page + 1, response.pagination.continuation);
    } else {
      callback(attendees);
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
    getTokens(authcode, (tokens) => {
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
    const settings = {
      url: `${serverBase}/api/stats`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      processData: false,
      data: '{\n\t"wdc": "eventbrite",\n\t"action": "view"\n}',
    };
    $.ajax(settings)
      .done((response) => {
        console.log(response);
      })
      .always(() => {
        window.location.href = authUrl;
      });
  }
  initCallback();
};

// Define the schema
ebConnector.getSchema = (schemaCallback) => {
  schemaCallback(schema.tables, schema.joins);
};

// Download the data
ebConnector.getData = (table, doneCallback) => {
  const settings = {
    url: `${serverBase}/api/stats`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    processData: false,
    data: '{\n\t"wdc": "eventbrite",\n\t"action": "download"\n}',
  };
  $.ajax(settings)
    .done((response) => {
      console.log(response);
    })
    .always(() => {
      checkTokens(() => {
        if (table.tableInfo.id === 'myOrganisations') {
          tableau.reportProgress('Getting my organisations');
          getMyOrganisations((organisations) => {
            table.appendRows(organisations);
            doneCallback();
          });
        } else if (table.tableInfo.id === 'myEvents') {
          tableau.reportProgress('Getting my events');
          getMyEvents((events) => {
            table.appendRows(events);
            doneCallback();
          });
        } else if (table.tableInfo.id === 'myAttendees') {
          tableau.reportProgress('Getting attendees');
          getMyOrganisations((organisations) => {
            async.each(organisations, (organisation, doneOrg) => {
              tableau.reportProgress(`Getting attendees for organisation ${organisation.name}`);
              getAttendees(organisation.id, (attendees) => {
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
    });
};

tableau.registerConnector(ebConnector);


// **
// END Tableau WDC Code
// **
