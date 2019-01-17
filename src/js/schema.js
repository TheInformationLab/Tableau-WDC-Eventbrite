const organisation = [{
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

const event = [{
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
  dataType: 'datetime'
}, {
  id: 'capacity',
  alias: 'Capacity',
  dataType: 'int'
}, {
  id: 'status',
  alias: 'Status',
  dataType: 'string'
}, {
  id: 'currency',
  alias: 'Currency',
  dataType: 'string'
}, {
  id: 'listed',
  alias: 'Publicly Searchable?',
  dataType: 'bool'
}, {
  id: 'shareable',
  alias: 'Social Sharing Buttons?',
  dataType: 'bool'
}, {
  id: 'invite_only',
  alias: 'Invite Only?',
  dataType: 'bool'
}, {
  id: 'online_event',
  alias: 'Online Event?',
  dataType: 'bool'
}, {
  id: 'show_remaining',
  alias: 'Show Remaining Tickets?',
  dataType: 'bool'
}, {
  id: 'is_locked',
  alias: 'Event Locked?',
  dataType: 'bool'
}, {
  id: 'privacy_setting',
  alias: 'Event Privacy Setting',
  dataType: 'string'
}, {
  id: 'is_series',
  alias: 'Event Series?',
  dataType: 'bool'
}, {
  id: 'is_free',
  alias: 'Free Event?',
  dataType: 'bool'
}, {
  id: 'logo_id',
  alias: 'Logo ID',
  dataType: 'string'
}, {
  id: 'organizer_id',
  alias: 'Organiser ID',
  dataType: 'string'
}, {
  id: 'venue_id',
  alias: 'Venue ID',
  dataType: 'string'
}, {
  id: 'category_id',
  alias: 'Category ID',
  dataType: 'string'
}];

const attendee = [{
  id: 'id',
  alias: 'Attendee ID',
  dataType: 'string'
}, {
  id: 'changed',
  alias: 'Changed',
  dataType: 'datetime'
}, {
  id: 'created',
  alias: 'Created',
  dataType: 'datetime'
}, {
  id: 'quantity',
  alias: 'Qty',
  dataType: 'int'
}, {
  id: 'first_name',
  alias: 'First Name',
  dataType: 'string'
}, {
  id: 'last_name',
  alias: 'Last Name',
  dataType: 'string'
}, {
  id: 'company',
  alias: 'Company',
  dataType: 'string'
}, {
  id: 'name',
  alias: 'Full Name',
  dataType: 'string'
}, {
  id: 'email',
  alias: 'Email',
  dataType: 'string'
}, {
  id: 'job_title',
  alias: 'Job Title',
  dataType: 'string'
}, {
  id: 'checked_in',
  alias: 'Checked In?',
  dataType: 'bool'
}, {
  id: 'cancelled',
  alias: 'Cancelled?',
  dataType: 'bool'
}, {
  id: 'refunded',
  alias: 'Refunded?',
  dataType: 'bool'
}, {
  id: 'status',
  alias: 'Status',
  dataType: 'string'
}, {
  id: 'ticket_class_name',
  alias: 'Ticket Class',
  dataType: 'string'
}, {
  id: 'event_id',
  alias: 'Event ID',
  dataType: 'string'
}, {
  id: 'order_id',
  alias: 'Order ID',
  dataType: 'string'
}]

const myOrganisations = {
  id: 'myOrganisations',
  alias: 'My Organisations',
  columns: organisation,
};

const myEvents = {
  id: 'myEvents',
  alias: 'My Events',
  columns: event,
};

const myAttendees = {
  id: 'myAttendees',
  alias: 'My Attendees',
  columns: attendee,
};

const attendeesbyMyEventsOrganisations = {
  alias: 'Attendees by My Organisations & Events',
  tables: [{
    id: myOrganisations.id,
    alias: myOrganisations.alias,
  }, {
    id: myEvents.id,
    alias: myEvents.alias,
  }, {
    id: myAttendees.id,
    alias: myAttendees.alias,
  }],
  joins: [{
    left: {
      tableAlias: myOrganisations.alias,
      columnId: 'id',
    },
    right: {
      tableAlias: myEvents.alias,
      columnId: 'organization_id',
    },
    joinType: 'inner',
  }, {
    left: {
      tableAlias: myEvents.alias,
      columnId: 'id',
    },
    right: {
      tableAlias: myAttendees.alias,
      columnId: 'event_id',
    },
    joinType: 'left',
  }],
};

module.exports = {
  schema: {
    tables: [
      myOrganisations,
      myEvents,
      myAttendees,
    ],
    joins: [
      attendeesbyMyEventsOrganisations,
    ],
  },
};
