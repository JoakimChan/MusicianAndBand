import fs from 'fs';
import NewMusican from './newMusican.js';

export default class Musician {
  musicanList = [];

  constructor() {
    this.fetchData();
  };

  fetchData() {
    const jsonString = fs.readFileSync("musician.json");
    const data = JSON.parse(jsonString);

    for (let i = 0; i < data.length; i++) {
      this.musicanList.push(data[i]);
    }
  }

  createNewArtist(musicianName, birthDate) {
    const music = new NewMusican(musicianName, birthDate);

    this.musicanList.push(music.dataInfo());
    this.writeToJson();
  };

  addToABand(musicianIndex, instrument, bandID, bandName, date) {
    const musician = this.musicanList[musicianIndex];

    if (!musician.instrument.includes(instrument)) {
      musician.instrument.push(instrument);
    }
    musician.currentBand.push({ bandID: bandID, band: bandName, Joined: date })
  }

  currentToPreviu(musicianIndex, bandID, date) {
    const music = this.musicanList[musicianIndex];
    const band = music.currentBand.find(x => x.bandID === bandID);
    band["timeLeft"] = date;

    music.previusBand.push(band)
    music.currentBand.splice(music.currentBand.findIndex(x => x.bandID === bandID), 1)
  }

  //display
  displayAllMusican() {
    console.log("-------------------------------------------------------------------------------");
    for (let i = 0; i < this.getLenght(); i++) {
      console.log(`${i + 1}. ${this.musicanList[i].name} - ${this.getAge(this.musicanList[i].birthDate)} year`);
    }
    console.log("-------------------------------------------------------------------------------");
  }

  displayMusican(musicianIndex) {
    console.log(this.musicanList[musicianIndex])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //remove
  removeCurrentBand(musicianIndex, bandID) {
    this.musicanList[musicianIndex].currentBand.splice(this.musicanList[musicianIndex].currentBand.findIndex(x => x.bandID === bandID), 1);
  }

  removePreviusBand(musicianIndex, bandID) {
    this.musicanList[musicianIndex].previusBand.splice(this.musicanList[musicianIndex].previusBand.findIndex(x => x.bandID === bandID), 1);
  }

  removeArtist(musicianIndex) {
    this.musicanList.splice((musicianIndex), 1);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getLenght() {
    return this.musicanList.length;
  }

  writeToJson() {
    fs.writeFileSync('./musiker.json', JSON.stringify(this.musicanList, null, 2), (err) => {
      if (err) throw err;
      console.log('artist data writen to file')
    })
  }
};
