export default class NewMusiker {
  #_firstName = "";
  #_lastName = "";
  _birthday = "";
  constructor(firstName, lastName, birthday) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthday = birthday;
  };

  get firstName() {
    return this._firstName.toUpperCase();
  }

  get lastName() {
    return this._lastName.toUpperCase();
  }

  get birthday() {
    return this._birthday;
  };


  set firstName(newName) {
    if (newName.length >= 1) {
      this._firstName = newName;
    } else {
      console.log("Ett nytt förnamn måste innehålla minst 1 symboler!");
    }
  }

  set lastName(newName) {
    if (newName.length >= 1) {
      this._lastName = newName;
    } else {
      console.log("Ett nytt efternamn måste innehålla minst 1 symboler!");
    }
  }

  set birthday(newBirthday) {
    if (newBirthday.length != 8) {
      console.log('förkort födelsedatum födelsedatum!');
    } else if (isNaN(newBirthday)) {
      console.log('födesedatum kan bara innehålla siffror')
    } else {
      this._birthday = newBirthday;
    }
  };
}