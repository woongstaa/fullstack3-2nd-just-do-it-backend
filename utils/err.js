class RequiredKeys {
  constructor(REQUIRED_KEYS) {
    this.REQUIRED_KEYS = REQUIRED_KEYS;
  }
  verify() {
    for (let key in this.REQUIRED_KEYS) {
      if (!this.REQUIRED_KEYS[key] && this.REQUIRED_KEYS[key] !== 0) {
        const err = new Error(`${key} 정보가 올바르지 않습니다.`);
        err.status = 400;
        throw err;
      }
    }
  }
}

class AffectedRow {
  constructor(row, type, status) {
    this.row = row;
    this.type = type;
    this.status = status;
  }
  result() {
    if (!(this.row.result === this.type.SUCCESS)) {
      const err = new Error(`실행결과 ${this.row.result}개의 row 생성`);
      err.status = this.status;
      throw err;
    }
  }
  results() {
    if (!(this.row.result === this.type)) {
      const err = new Error(`실행결과 ${this.row.result}개의 row 생성`);
      err.status = this.status;
      throw err;
    }
  }
}

class IsExistItem {
  constructor(check, type, status) {
    this.check = check;
    this.type = type;
    this.status = status;
  }
  existErr(messege) {
    if (this.check.result === this.type.EXIST) {
      const err = new Error(`${messege}`);
      err.status = this.status;
      throw err;
    }
  }
  notExistErr(messege) {
    if (this.check.result === this.type.NOT_EXIST) {
      const err = new Error(`${messege}`);
      err.status = this.status;
      throw err;
    }
  }
}

export { RequiredKeys, AffectedRow, IsExistItem };
