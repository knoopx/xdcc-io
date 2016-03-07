import { observable, action } from 'mobx'

export default class Transfer {
  @observable ip;
  @observable port;
  @observable file;
  @observable size = 0;
  @observable received = 0;
  @observable status;
  @observable isAborted = false;

  constructor(props) {
    Object.assign(this, props)
  }

  @action update(props) {
    Object.assign(this, props)
  }

  get progress() {
    if (this.size > 0) {
      return this.received / this.size
    }

    return 0
  }

  @action abort() {
    this.isAborted = true
  }
}
