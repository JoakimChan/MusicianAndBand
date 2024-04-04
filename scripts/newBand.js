export default class NewBand {
  constructor(bandName, date, memberID, member, instrument) {
    this.bandName = bandName;
    this.date = date;
    this.memberID = memberID;
    this.bandMember = member;
    this.instrument = instrument;
  };

  dataInfo() {
    return {
      bandID: 'id' + new Date().getTime(),
      name: this.bandName,
      createdYear: this.date,
      currentBandMember: [{ memberID: this.memberID, name: this.bandMember, instrument: this.instrument, Joined: this.date }],
      previusBandMember: [],
      dissolved: null
    };
  }
}