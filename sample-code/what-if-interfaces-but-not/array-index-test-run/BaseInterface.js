class BaseInterface {
  // Note -- implementing these here means you cannot implicitly
  // work with the internal value without an implementation!

  valueOf() {
    throw new Error('Method valueOf is not implemented');
  }

  toString() {
    throw new Error('Method toString is not implemented');
  }
}

module.exports = BaseInterface;
