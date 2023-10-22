import fs from 'fs';
import NewMusiker from './newMusiker.js';

export default class Musician {
  artistList = [];

  constructor() {
    this.fetchData();
  };

  get artistList() {
    return this.artistList;
  }

  fetchData() {
    const jsonString = fs.readFileSync("musiker.json");
    const data = JSON.parse(jsonString);

    for (let i = 0; i < data.length; i++) {
      this.artistList.push(data[i]);
    }
  }

  createNewArtist(name, birthYear) {
    const music = new NewMusiker(name, birthYear);
    this.artistList.push(music.dataInfo());
    this.writeToJson();
  };

  displayAllArtist() {
    console.log("-------------------------------------------------------------------------------");
    for (let i = 0; i < this.getLenght(); i++) {
      console.log(`${i + 1}. ${this.artistList[i].name} - ${this.artistList[i].birthYear} år`);
    }
    console.log("-------------------------------------------------------------------------------");
  }

  displayArtist(val) {
    console.log(this.artistList[val - 1])
  }

  addToABand(index, item, id, band, year) {
    this.artistList[index].instrument.push(item);
    this.artistList[index].currentBand.push({ bandID: id, band: band, yearJoined: year })
  }

  currentToPreviu(index, id) {
    let band = this.artistList[index].currentBand.find(x => x.bandID === id);
    this.artistList[index].previusBand.push(band)
    this.artistList[index].currentBand.splice(this.artistList[index].currentBand.findIndex(x => x.bandID === id), 1)
  }

  writeToJson() {
    fs.writeFileSync('./musiker.json', JSON.stringify(this.artistList, null, 2), (err) => {
      if (err) throw err;
      console.log('artist data writen to file')
    })
  }

  getLenght() {
    return this.artistList.length;
  }

  removeCurrentBand(index, id) {
    this.artistList[index].currentBand.splice(this.artistList[index].currentBand.findIndex(x => x.bandID === id), 1);
  }

  removePreviusBand(index, id) {
    this.artistList[index].previusBand.splice(this.artistList[index].previusBand.findIndex(x => x.bandID === id), 1);
  }

  removeArtist(val) {
    this.artistList.splice((val - 1), 1);
  }
};
