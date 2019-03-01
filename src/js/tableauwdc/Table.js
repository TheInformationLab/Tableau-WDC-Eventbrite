/**
* @class Represents a single table which Tableau has requested
* @param tableInfo {Object} - Information about the table
* @param incrementValue {string=} - Incremental update value
*/
function Table(tableInfo, incrementValue, isJoinFiltered, filterColumnId, filterValues, dataCallbackFn) {
  /** @member {Object} Information about the table which has been requested. This is
  guaranteed to be one of the tables the connector returned in the call to getSchema. */
  this.tableInfo = tableInfo;

  /** @member {string} Defines the incremental update value for this table. Empty string if
  there is not an incremental update requested. */
  this.incrementValue = incrementValue || "";

  /** @member {boolean} Whether or not this table is meant to be filtered using filterValues. */
  this.isJoinFiltered = isJoinFiltered;

  /** @member {string} If this table is filtered, this is the column where the filter values
   * should be found. */
  this.filterColumnId = filterColumnId;

  /** @member {array} An array of strings which specifies the values we want to retrieve. For
   * example, if an ID column was the filter column, this would be a collection of IDs to retrieve. */
  this.filterValues = filterValues;

  /** @private */
  this._dataCallbackFn = dataCallbackFn;

  // bind the public facing version of this function so it can be passed around
  this.appendRows = this._appendRows.bind(this);
}

/**
* @method appends the given rows to the set of data contained in this table
* @param data {array} - Either an array of arrays or an array of objects which represent
* the individual rows of data to append to this table
*/
Table.prototype._appendRows = function(data) {
  // Do some quick validation that this data is the format we expect
  if (!data) {
    console.warn("rows data is null or undefined");
    return;
  }

  if (!Array.isArray(data)) {
    // Log a warning because the data is not an array like we expected
    console.warn("Table.appendRows must take an array of arrays or array of objects");
    return;
  }

  // Call back with the rows for this table
  this._dataCallbackFn(this.tableInfo.id, data);
}

module.exports = Table;
