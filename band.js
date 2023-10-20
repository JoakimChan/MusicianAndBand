import fs from 'fs';
import NewBand from './newBand.js';

export default class Band {
  bandList = []

  constructor() {
    this.fetchData();
  };

  get bandList() {
    return this.bandList;
  }

  fetchData() {
    const jsonString = fs.readFileSync("band.json");
    const data = JSON.parse(jsonString);

    for (let i = 0; i < data.length; i++) {
      this.bandList.push(data[i]);
    }
  }

  displayBand(val) {
    console.log(this.bandList[val - 1])
  }

  displayAllband() {
    console.log("-------------------------------------------------------------------------------");
    for (let i = 0; i < this.getLenght(); i++) {
      console.log(`${i + 1}. ${this.bandList[i].bandName}`);
    }
    console.log("-------------------------------------------------------------------------------");
  }

  createBand(bandName, yearCreated, id, artistNamn, instrument) {
    const band = new NewBand(bandName, yearCreated, id, artistNamn, instrument);
    this.bandList.push(band.dataInfo());
  }

  writeToJson() {
    fs.writeFileSync('./band.json', JSON.stringify(this.bandList, null, 2), (err) => {
      if (err) throw err;
      console.log('artist data writen to file')
    })
  }

  getLenght() {
    return this.bandList.length;
  }

  addToABand(index, id, name, instrument, yearJoined) {
    this.bandList[index].currentBandMember.push({ memberID: id, name: name, instrument: instrument, yearJoined: yearJoined })
  }

}