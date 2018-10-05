class TSJSNodeAbstract {
  /**
   * Constructs a new abstract node
   * @param  {TSJSNodeAbstract} parent parent node
   */
  constructor(parent) {
    this.parent = parent;
  }
}

module.exports = TSJSNodeAbstract;
