export default class NewBand {
  bandName = "";
  bandYear = "";
  constructor(bandName, bandYear, memberID, member, instrument) {
    this.bandName = bandName;
    this.bandYear = bandYear;
    this.memberID = memberID;
    this.bandMember = member;
    this.instrument = instrument;
  };

  get bandName() {
    return this.bandName;
  }

  get bandYear() {
    return this.bandYear
  }

  set bandName(newName) {
    if (newName.length >= 1) {
      this.bandName = newName;
    } else {
      console.log("Ett nytt namn måste innehålla minst 1 symboler!");
    }
  }

  set bandYear(newYear) {
    if (newYear.length != 4) {
      console.log('förkort födelsedatum födelsedatum!');
    } else if (isNaN(newYear)) {
      console.log('födesedatum kan bara innehålla siffror')
    } else {
      this.bandYear = newYear;
    }
  }

  dataInfo() {
    return {
      bandID: 'id' + (new Date()).getTime(),
      name: this.bandName,
      createdYear: this.bandYear,
      currentBandMember: [{ memberID: this.memberID, name: this.bandMember, instrument: this.instrument, yearJoined: this.bandYear }],
      previusBandMember: [],
      dissolved: null
    };
  }
}