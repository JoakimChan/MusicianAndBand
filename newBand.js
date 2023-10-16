export default class NewBand {
  _name = "";
  constructor(name) {
    this._name = name;
  };

  get bandName() {
    return this._name.toUpperCase();
  }

  set name(newName) {
    if (newName.length >= 1) {
      this._firstName = newName;
    } else {
      console.log("Ett nytt namn måste innehålla minst 1 symboler!");
    }
  }
}