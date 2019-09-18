/**
 * Model of Json
 */
export class Page3 {
  constructor(public address: Address) { }
}

export class Address {
  constructor(public geo: Geo) { }
}

export class Geo {
  constructor(public lng: number) {
  }
}

