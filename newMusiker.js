export default class NewMusiker {
  constructor(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  };

  dataInfo() {
    return {
      memberID: 'id' + new Date().getTime(),
      name: this.name,
      birthYear: this.birthYear,
      currentBand: [],
      previusBand: [],
      instrument: []
    };
  }
}