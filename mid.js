import Musican from './musiker.js';
import Band from './band.js';

export default class Mid {
  constructor() {
    this.m = new Musican();
    this.b = new Band();
  }

  createBand(musiker, instrument, bandName, yearCreated) {
    let tempId = this.b.createBand(bandName, yearCreated, this.m.artistList[musiker - 1].memberID, this.m.artistList[musiker - 1].name, instrument);
    this.m.addToABand((musiker - 1), instrument, tempId, bandName, yearCreated);
    this.writeToJson();
  }

  addArtistToBand(musiker, instrument, bandId) {
    this.m.addToABand((musiker - 1), instrument, bandId, this.b.bandList[(this.b.bandList.findIndex(x => x.bandID === bandId))].name, new Date().getFullYear());
    this.b.addToABand((this.b.bandList.findIndex(x => x.bandID === bandId)), this.m.artistList[musiker - 1].memberID, this.m.artistList[musiker - 1].name, instrument, new Date().getFullYear());
    this.writeToJson();
  }

  moveArtist(bandId, musikerId) {
    let date = new Date().toLocaleString();
    this.b.currentToPreviu((this.b.bandList.findIndex(x => x.bandID === bandId)), musikerId, date);
    this.m.currentToPreviu((this.m.artistList.findIndex(x => x.memberID === musikerId)), bandId, date);
    this.writeToJson();
  }

  removeArtist(val) {
    for (let i = 0; i < this.m.artistList[val - 1].currentBand.length; i++) {
      const tempBandIndex = this.b.bandList.findIndex(x => x.bandID === this.m.artistList[val - 1].currentBand[i].bandID)
      this.b.removeCurrentMember(tempBandIndex, this.m.artistList[val - 1].memberID);
    }
    for (let i = 0; i < this.m.artistList[val - 1].previusBand.length; i++) {
      const tempBandIndex = this.b.bandList.findIndex(x => x.bandID === this.m.artistList[val - 1].previusBand[i].bandID)
      this.b.removePreviusMember(tempBandIndex, this.m.artistList[val - 1].memberID);
    }
    this.m.removeArtist(val);
    this.writeToJson();
  }

  removeBand(val) {
    for (let i = 0; i < this.b.bandList[val - 1].currentBandMember.length; i++) {
      const tempArtistIndex = this.m.artistList.findIndex(x => x.memberID === this.b.bandList[val - 1].currentBandMember[i].memberID)
      this.m.removeCurrentBand(tempArtistIndex, this.b.bandList[val - 1].bandID);
    }
    for (let i = 0; i < this.b.bandList[val - 1].previusBandMember.length; i++) {
      const tempArtistIndex = this.m.artistList.findIndex(x => x.memberID === this.b.bandList[val - 1].previusBandMember[i].memberID)
      this.m.removePreviusBand(tempArtistIndex, this.b.bandList[val - 1].bandID);
    }
    this.b.removeBand(val);
    this.writeToJson()
  }

  writeToJson() {
    this.m.writeToJson();
    this.b.writeToJson();
  }
}