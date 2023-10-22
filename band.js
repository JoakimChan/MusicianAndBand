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
      console.log(`${i + 1}. ${this.bandList[i].name}`);
    }
    console.log("-------------------------------------------------------------------------------");
  }

  displayOngoingBand() {
    const temp = [];
    let tempIndex = 1;
    for (let i = 0; i < this.getLenght(); i++) {
      if (this.bandList[i].dissolved === null) {
        temp.push(this.bandList[i].bandID);
      }
    }
    if (temp.length === 0) {
      console.log("det finns inga tillgängliga band!")
    } else {
      console.log("-------------------------------------------------------------------------------");
      for (let i = 0; i < this.getLenght(); i++) {
        if (this.bandList[i].dissolved === null) {
          console.log(`${tempIndex}. ${this.bandList[i].name}`);
          tempIndex++;
        }
      }
      console.log("-------------------------------------------------------------------------------");
    }
    return temp;
  }

  displayCurrentMember(val) {
    const temp = [];
    console.log("-------------------------------------------------------------------------------");
    for (let i = 0; i < this.bandList[val - 1].currentBandMember.length; i++) {
      console.log(`${i + 1}. ${this.bandList[val - 1].currentBandMember[i].name} ${this.bandList[val - 1].currentBandMember[i].instrument}`);
      temp.push(this.bandList[val - 1].currentBandMember[i].memberID);
    }
    console.log("-------------------------------------------------------------------------------");
    return temp;
  }

  createBand(bandName, yearCreated, id, artistNamn, instrument) {
    const band = new NewBand(bandName, yearCreated, id, artistNamn, instrument);
    this.bandList.push(band.dataInfo());
    return band.dataInfo().bandID;
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

  currentToPreviu(index, id, date) {
    let member = this.bandList[index].currentBandMember.find(x => x.memberID === id);
    member["timeLeft"] = date;
    this.bandList[index].previusBandMember.push(member)
    this.bandList[index].currentBandMember.splice(this.bandList[index].currentBandMember.findIndex(x => x.memberID === id), 1);
    if (this.bandList[index].currentBandMember.length === 0) {
      this.bandList[index].dissolved = date;
    }
  }

  removeCurrentMember(index, id) {
    this.bandList[index].currentBandMember.splice(this.bandList[index].currentBandMember.findIndex(x => x.memberID === id), 1);
    if (this.bandList[index].currentBandMember.length === 0) {
      this.bandList[index].dissolved = new Date().toLocaleString();
    }
  }

  removePreviusMember(index, id) {
    this.bandList[index].previusBandMember.splice(this.bandList[index].previusBandMember.findIndex(x => x.memberID === id), 1);
  }

  removeBand(val) {
    this.bandList.splice((val - 1), 1);
  }
}