export default class NewMusiker {
  name = "";
  birthYear = "";

  constructor(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  };

  get name() {
    return this.name;
  }

  get birthYear() {
    return this.birthYear;
  };


  set name(newName) {
    if (newName.length >= 1) {
      this.name = newName;
    } else {
      console.log("Ett nytt förnamn måste innehålla minst 1 symboler!");
    }
  }

  set birthYear(newBirthYear) {
    if (newBirthYear.length != 4) {
      console.log('förkort födelsedatum födelsedatum!');
    } else if (isNaN(newBirthYear)) {
      console.log('födesedatum kan bara innehålla siffror')
    } else {
      this.birthYear = newBirthYear;
    }
  };

  dataInfo() {
    return {
      ID: 'id' + (new Date()).getTime(),
      name: this.name,
      birthYear: this.birthYear,
      currentBand: [],
      previusBand: [],
      instrument: []
    };
  }
}