import fs from 'fs';
import NewBand from './newBand.js';

export default class Band {
  bandList = []

  constructor() {
    this.fetchData();
  };

  fetchData() {
    const jsonString = fs.readFileSync("band.json");
    const data = JSON.parse(jsonString);

    for (let i = 0; i < data.length; i++) {
      this.bandList.push(data[i]);
    }
  }

  createBand(bandName, yearCreated, id, artistNamn, instrument) {
    const band = new NewBand(bandName, yearCreated, id, artistNamn, instrument);
    this.bandList.push(band.dataInfo());
    return band.dataInfo().bandID;
  }

  addToABand(index, id, name, instrument, yearJoined) {
    this.bandList[index].currentBandMember.push({ memberID: id, name: name, instrument: instrument, yearJoined: yearJoined })
  }

  currentToPreviu(bandIndex, musicanID, date) {
    let member = this.bandList[bandIndex].currentBandMember.find(x => x.memberID === musicanID);
    member["dateItLeft"] = date;
    this.bandList[bandIndex].previusBandMember.push(member)
    this.bandList[bandIndex].currentBandMember.splice(this.bandList[bandIndex].currentBandMember.findIndex(x => x.memberID === musicanID), 1);
    if (this.bandList[bandIndex].currentBandMember.length === 0) {
      this.bandList[bandIndex].dissolved = date;
    }
  }

  ongoingBand() {
    const temp = [];
    for (let i = 0; i < this.getLenght(); i++) {
      if (this.bandList[i].dissolved === null) {
        temp.push({ bandID: this.bandList[i].bandID, name: this.bandList[i].name, index: i });
      }
    }
    return temp;
  }

  //display
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
    let tempIndex = 1;
    const temp = this.ongoingBand()
    if (temp.length != 0) {
      console.log("-------------------------------------------------------------------------------");
      for (let i = 0; i < temp.length; i++) {
        console.log(`${tempIndex}. ${temp[i].name}`);
        tempIndex++;
      }
      console.log("-------------------------------------------------------------------------------");
    }
    return temp;
  }

  displayAvaliableBand(musicianID) {
    let tempIndex = 1
    const temp = this.ongoingBand();
    const temp2 = [];
    if (temp.length != 0) {

      for (let i = 0; i < temp.length; i++) {
        if (!this.bandList[temp[i].index].currentBandMember.some(x => x.memberID === musicianID))
          temp2.push(temp[i])
      }
      if (temp2.length != 0) {
        console.log("-------------------------------------------------------------------------------");
        for (let i = 0; i < temp2.length; i++) {
          console.log(`${tempIndex}. ${temp2[i].name}`)
          tempIndex++;
        }
        console.log("-------------------------------------------------------------------------------");
      }
    }
    return temp2;
  }

  displayCurrentMember(index) {
    const temp = [];
    console.log("-------------------------------------------------------------------------------");
    for (let i = 0; i < this.bandList[index].currentBandMember.length; i++) {
      console.log(`${i + 1}. ${this.bandList[index].currentBandMember[i].name} ${this.bandList[index].currentBandMember[i].instrument}`);
      temp.push(this.bandList[index].currentBandMember[i].memberID);
    }
    console.log("-------------------------------------------------------------------------------");
    return temp;
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //remove
  removeCurrentMember(bandIndex, musicianID) {
    this.bandList[bandIndex].currentBandMember.splice(this.bandList[bandIndex].currentBandMember.findIndex(x => x.memberID === musicianID), 1);
    if (this.bandList[bandIndex].currentBandMember.length === 0) {
      this.bandList[bandIndex].dissolved = new Date().toLocaleString();
    }
  }

  removePreviusMember(BandIndex, musicianID) {
    this.bandList[BandIndex].previusBandMember.splice(this.bandList[BandIndex].previusBandMember.findIndex(x => x.memberID === musicianID), 1);
  }

  removeBand(val) {
    this.bandList.splice((val - 1), 1);
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getLenght() {
    return this.bandList.length;
  }

  writeToJson() {
    fs.writeFileSync('./band.json', JSON.stringify(this.bandList, null, 2), (err) => {
      if (err) throw err;
      console.log('artist data writen to file')
    })
  }
}