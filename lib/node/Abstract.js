class TSJSNodeAbstract {
  /**
   * Constructs a new abstract node
   * @param  {TSJSNodeAbstract} parent
   */
  constructor(parent) {
    this.parent = parent;
  }
}

module.exports = TSJSNodeAbstract;
