import fs from 'fs';
import NewMusician from './newMusician.js';

export default class Musician {
  musicianList = [];

  constructor() {
    this.fetchData();
  };

  fetchData() {
    this.musicianList = []
    const jsonString = fs.readFileSync("../musician.json");
    const data = JSON.parse(jsonString);

    for (let i = 0; i < data.length; i++) {
      this.musicianList.push(data[i]);
    }
  }

  createNewArtist(musicianName, birthDate) {
    const music = new NewMusician(musicianName, birthDate);

    this.musicianList.push(music.dataInfo());
    this.writeToJson();
  };

  addToABand(musicianIndex, instrument, bandID, bandName, date) {
    const musician = this.musicianList[musicianIndex];

    if (!musician.instrument.includes(instrument)) {
      musician.instrument.push(instrument);
    }
    musician.currentBand.push({ bandID: bandID, band: bandName, Joined: date })
  }

  currentToPreviu(musicianIndex, bandID, date) {
    const music = this.musicianList[musicianIndex];
    const band = music.currentBand.find(x => x.bandID === bandID);
    band["timeLeft"] = date;

    music.previusBand.push(band)
    music.currentBand.splice(music.currentBand.findIndex(x => x.bandID === bandID), 1)
  }

  //display
  displayAllMusician() {
    console.log("-------------------------------------------------------------------------------");
    for (let i = 0; i < this.getLenght(); i++) {
      console.log(`${i + 1}. ${this.musicianList[i].name} - born: ${this.musicianList[i].birthDate}`);
    }
    console.log("-------------------------------------------------------------------------------");
  }

  displayMusician(musicianIndex) {
    console.log(this.musicianList[musicianIndex])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //remove
  removeCurrentBand(musicianIndex, bandID) {
    this.musicianList[musicianIndex].currentBand.splice(this.musicianList[musicianIndex].currentBand.findIndex(x => x.bandID === bandID), 1);
  }

  removePreviusBand(musicianIndex, bandID) {
    this.musicianList[musicianIndex].previusBand.splice(this.musicianList[musicianIndex].previusBand.findIndex(x => x.bandID === bandID), 1);
  }

  removeMusician(musicianIndex) {
    this.musicianList.splice((musicianIndex), 1);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getLenght() {
    return this.musicianList.length;
  }

  writeToJson() {
    fs.writeFileSync('../musician.json', JSON.stringify(this.musicianList, null, 2), (err) => {
      if (err) throw err;
      console.log('musician data writen to file')
    })
  }
};
