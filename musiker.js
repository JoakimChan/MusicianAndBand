import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });
import fs from 'fs';
import NewMusiker from './newMusiker.js';

export default class Musician {
  artistList = [];

  constructor() {
    this.fetchData();
  };

  static get artistList() {
    return this.artistList;
  }

  fetchData() {
    const jsonString = fs.readFileSync("musiker.json");
    const data = JSON.parse(jsonString);

    for (let i = 0; i < data.length; i++) {
      this.artistList.push(data[i]);
    }
  }

  static createNewArtist() {
    let name = prompt("namn på musikern: ");
    let birthYear = prompt("födelsdags år (YYYY): ");
    const music = new NewMusiker(name, birthYear);
    this.artistList.push(music.dataInfo());
  };

  displayAllArtist() {
    console.log("-------------------------------------------------------------------------------");
    for (let i = 0; i < this.artistList.length; i++) {
      console.log(`${i + 1}. ${this.artistList[i].name} - ${this.artistList[i].birthYear} år`);
    }
    console.log("-------------------------------------------------------------------------------");
  }

  static displayArtist() {
    if (this.artistList.length === 0) {
      console.log('listan är tom')
    } else {
      this.displayAllArtist();
      let agien = true;
      while (agien) {
        console.log('skriv ett nummret på artisent du vill se mer in på')
        let val = prompt('val: ');
        if (val > this.artistList.length || isNaN(val) || val <= 0) {
          console.log('valet är ogtiltig');
        } else {
          console.log(this.artistList[val - 1])
          agien = false;
        }
      }
    }
  }

  static removeArtist() {
    if (this.artistList.length === 0) {
      console.log('listan är tom')
    } else {
      this.displayAllArtist();
      let agien = true;
      while (agien) {
        console.log('skriv ett nummret på artisent du vill ta bort')
        let val = prompt('val: ');
        if (val > this.artistList.length || isNaN(val) || val <= 0) {
          console.log('valet är ogtiltig');
        } else {
          this.artistList.splice(val - 1, 1);
          agien = false;
        }
      }
    }
  }

  static writeToJson() {
    fs.writeFileSync('./musiker.json', JSON.stringify(this.artistList, null, 2), (err) => {
      if (err) throw err;
      console.log('artist data writen to file')
    })
  }
};
