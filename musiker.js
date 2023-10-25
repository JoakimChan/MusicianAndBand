import fs from 'fs';
import NewMusiker from './newMusiker.js';

export default class Musician {
  musicList = [];

  constructor() {
    this.fetchData();
  };

  fetchData() {
    const jsonString = fs.readFileSync("musiker.json");
    const data = JSON.parse(jsonString);

    for (let i = 0; i < data.length; i++) {
      this.musicList.push(data[i]);
    }
  }

  createNewArtist(musicianName, birthDate) {
    const music = new NewMusiker(musicianName, birthDate);
    this.musicList.push(music.dataInfo());
    this.writeToJson();
  };

  addToABand(musicianIndex, instrument, bandID, bandName, date) {
    if (!this.musicList[musicianIndex].instrument.includes(instrument)) {
      this.musicList[musicianIndex].instrument.push(instrument);
    }
    this.musicList[musicianIndex].currentBand.push({ bandID: bandID, band: bandName, Joined: date })
  }

  currentToPreviu(musicianIndex, bandID, date) {
    let band = this.musicList[musicianIndex].currentBand.find(x => x.bandID === bandID);
    band["timeLeft"] = date;
    this.musicList[musicianIndex].previusBand.push(band)
    this.musicList[musicianIndex].currentBand.splice(this.musicList[musicianIndex].currentBand.findIndex(x => x.bandID === bandID), 1)
  }

  //display
  displayAllArtist() {
    console.log("-------------------------------------------------------------------------------");
    for (let i = 0; i < this.getLenght(); i++) {
      console.log(`${i + 1}. ${this.musicList[i].name} - ${this.getAge(this.musicList[i].birthYear)} år`);
    }
    console.log("-------------------------------------------------------------------------------");
  }

  displayArtist(musicianIndex) {
    console.log(this.musicList[musicianIndex])
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //remove
  removeCurrentBand(musicianIndex, bandID) {
    this.musicList[musicianIndex].currentBand.splice(this.musicList[musicianIndex].currentBand.findIndex(x => x.bandID === bandID), 1);
  }

  removePreviusBand(musicianIndex, bandID) {
    this.musicList[musicianIndex].previusBand.splice(this.musicList[musicianIndex].previusBand.findIndex(x => x.bandID === bandID), 1);
  }

  removeArtist(val) {
    this.musicList.splice((val - 1), 1);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getAge(dateString) {
    const year = Number(dateString.substr(0, 4));
    const month = Number(dateString.substr(4, 2)) - 1;
    const day = Number(dateString.substr(6, 2));
    if (month > 11 || month < 0 || day > 31 || day < 1) {
      return false;
    } else {
      const today = new Date();
      const age = today.getFullYear() - year;
      if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
        age--;
      }
      return age;
    }
  }

  getLenght() {
    return this.musicList.length;
  }

  writeToJson() {
    fs.writeFileSync('./musiker.json', JSON.stringify(this.musicList, null, 2), (err) => {
      if (err) throw err;
      console.log('artist data writen to file')
    })
  }
};
