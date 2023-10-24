export default class NewBand {
  constructor(bandName, bandYear, memberID, member, instrument) {
    this.bandName = bandName;
    this.bandYear = bandYear;
    this.memberID = memberID;
    this.bandMember = member;
    this.instrument = instrument;
  };

  dataInfo() {
    return {
      bandID: 'id' + new Date().getTime(),
      name: this.bandName,
      createdYear: this.bandYear,
      currentBandMember: [{ memberID: this.memberID, name: this.bandMember, instrument: this.instrument, yearJoined: this.bandYear }],
      previusBandMember: [],
      dissolved: null
    };
  }
}