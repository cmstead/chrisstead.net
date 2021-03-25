const BaseInterface = require('./BaseInterface');

function isNotNumber(value) {
  return typeof value !== 'number';
}

class AbstractNumber extends BaseInterface{
  constructor(value) {
    super();

    if(isNotNumber(value)) {
      throw new Error(`Cannot create number instance from '${value}'`);
    }
  }

  // NOTE: AbstractNumber DOES NOT implement valueOf or toString
}

module.exports = AbstractNumber;
