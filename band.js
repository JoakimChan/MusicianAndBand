import fs from 'fs';
import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });
import NewBand from './newBand.js';
import Musician from './musiker.js';
const music = new Musician();

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

  static createBand() {
    if (music.artistList === 0) {
      console.log("kan tyvärr inte skapa band, det finns inga musiker");
    } else {
      let bandName = prompt("bandet heter: ");
      let yearCreated = prompt("årtal bandet bildades: ")
      music.displayAllArtist();
      console.log("lägg till en musiker som första medlem!")
      let val = prompt("val: ")
      const band = new NewBand(bandName, yearCreated, music.artistList[val - 1].name);
      this.bandList.push(band.dataInfo());
    }
  }

  static displayBand() {
    if (this.bandList.length === 0) {
      console.log('listan är tom')
    } else {
      this.displayAllband();
      let agien = true;
      while (agien) {
        console.log('skriv ett nummret på bandet du vill se mer in på')
        let val = prompt('val: ');
        if (val > this.bandList.length || isNaN(val) || val <= 0) {
          console.log('valet är ogtiltig');
        } else {
          console.log(this.bandList[val - 1])
          agien = false;
        }
      }
    }
  }

  displayAllband() {
    console.log("-------------------------------------------------------------------------------");
    for (let i = 0; i < this.bandList.length; i++) {
      console.log(`${i + 1}. ${this.bandList[i].name}`);
    }
    console.log("-------------------------------------------------------------------------------");
  }

}