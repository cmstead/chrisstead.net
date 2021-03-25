const DBConnectorInterface = require('./DBConnectorInterface');

class TodoDataService{
  constructor(dbConnector = new DBConnectorInterface()) {
    this.dbConnector = dbConnector;
  }

  getTodos(userId) {
    return this.dbConnector.query(
      'SELECT * FROM todos WHERE userid = ?',
      [userId]
    )
  }

  saveTodo(todo, userId) {
    return this.dbConnector.query(
      'INSERT INTO todos',
      {
        todo: todo,
        userid: userId
      }
    );
  }
}

module.exports = TodoDataService;
