const AbstractNumber = require('./AbstractNumber');

function isValidIndex(value) {
  return Math.floor(value) === value
    && value !== Infinity;
}

class ArrayIndex extends AbstractNumber {
  constructor(value) {
    super(value);

    if (!isValidIndex(value)) {
      throw new Error(`Cannot use '${value}' as an array index.`)
    }

    this.value = value;
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }
}

module.exports = ArrayIndex;
