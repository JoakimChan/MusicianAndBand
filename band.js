import fs from 'fs';
import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });
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

  createBand(artistNamn) {
    let bandName = prompt("bandet heter: ");
    let yearCreated = prompt("årtal bandet bildades: ")
    const band = new NewBand(bandName, yearCreated, artistNamn);
    this.bandList.push(band.dataInfo());
    this.writeToJson()
  }

  displayBand() {
    if (this.getLenght() === 0) {
      console.log('listan är tom')
    } else {
      this.displayAllband();
      let agien = true;
      while (agien) {
        console.log('skriv ett nummret på bandet du vill se mer in på')
        let val = prompt('val: ');
        if (val > this.getLenght() || isNaN(val) || val <= 0) {
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
    for (let i = 0; i < this.getLenght(); i++) {
      console.log(`${i + 1}. ${this.bandList[i].bandName}`);
    }
    console.log("-------------------------------------------------------------------------------");
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
}