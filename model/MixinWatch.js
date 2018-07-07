export default {
  watch: {
    /**
     * @param {Object} record
     * @param {Object} previous
     */
    data (record, previous) {
      if (!record !== previous) {
        this.setRecord(record)
        this.fireWatch('set/record')
      }
    }
  }
}
