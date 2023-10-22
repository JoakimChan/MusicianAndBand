export default class NewMusiker {
  name = "";
  birthYear = "";

  constructor(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  };

  get theName() {
    return this.name;
  }

  get birthYear() {
    return this.birthYear;
  };


  set theName(newName) {
    if (newName.length >= 1) {
      this.name = newName;
      return true;
    } else {
      console.log("Ett nytt förnamn måste innehålla minst 1 symboler!");
    }
    return false;
  }

  set birthYear(newBirthYear) {
    if (newBirthYear.length != 4) {
      console.log('förkort födelsedatum födelsedatum!');
    } else if (isNaN(newBirthYear)) {
      console.log('födesedatum kan bara innehålla siffror')
    } else {
      this.birthYear = newBirthYear;
      return true;
    }
    return false;
  };

  dataInfo() {
    return {
      memberID: 'id' + (new Date()).getTime(),
      name: this.name,
      birthYear: this.birthYear,
      currentBand: [],
      previusBand: [],
      instrument: []
    };
  }
}