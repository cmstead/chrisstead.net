const DBConnectorInterface = require('./DBConnectorInterface');

class DBConnector extends DBConnectorInterface {
  constructor(connection) {
    this.connection = connection;
  }

  query(queryString, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        queryString,
        params,
        (error, data) => {
          if(error) {
            reject(error);
          } else {
            resolve(data);
          }
        })
    });
  }
}

module.exports = DBConnector;
