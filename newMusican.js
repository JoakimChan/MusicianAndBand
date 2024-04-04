export default class NewMusican {
  constructor(name, birthDate) {
    this.name = name;
    this.birthDate = birthDate;
  };

  dataInfo() {
    return {
      memberID: 'id' + new Date().getTime(),
      name: this.name,
      birthDate: this.birthDate,
      currentBand: [],
      previusBand: [],
      instrument: []
    };
  }
}