class DBConnectorInterface{
  query(queryString, params) {
    throw new Error(`Method 'query' not implemented`);
  }
}

module.exports = DBConnectorInterface;
