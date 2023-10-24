import Musican from './musiker.js';
import Band from './band.js';

export default class Mid {
  constructor() {
    this.music = new Musican();
    this.band = new Band();
  }

  createBand(musiker, instrument, bandName, yearCreated) {
    let tempId = this.band.createBand(bandName, yearCreated, this.music.artistList[musiker - 1].memberID, this.music.artistList[musiker - 1].name, instrument);
    this.music.addToABand((musiker - 1), instrument, tempId, bandName, yearCreated);
    this.writeToJson();
  }

  addArtistToBand(musiker, instrument, bandId) {
    if (this.music.artistList[musiker - 1].currentBand.some(x => x.bandID === bandId)) {
      console.log("musikern finns redan med i bandet!")
    } else {
      this.music.addToABand((musiker - 1), instrument, bandId, this.band.bandList[(this.band.bandList.findIndex(x => x.bandID === bandId))].name, new Date().getFullYear());
      this.band.addToABand((this.band.bandList.findIndex(x => x.bandID === bandId)), this.music.artistList[musiker - 1].memberID, this.music.artistList[musiker - 1].name, instrument, new Date().getFullYear());
      this.writeToJson();
    }
  }

  moveArtist(bandId, musikerId) {
    let date = new Date().toLocaleString();
    this.band.currentToPreviu((this.band.bandList.findIndex(x => x.bandID === bandId)), musikerId, date);
    this.music.currentToPreviu((this.music.artistList.findIndex(x => x.memberID === musikerId)), bandId, date);
    this.writeToJson();
  }

  removeArtist(val) {
    for (let i = 0; i < this.music.artistList[val - 1].currentBand.length; i++) {
      const tempBandIndex = this.band.bandList.findIndex(x => x.bandID === this.music.artistList[val - 1].currentBand[i].bandID)
      this.band.removeCurrentMember(tempBandIndex, this.music.artistList[val - 1].memberID);
    }
    for (let i = 0; i < this.music.artistList[val - 1].previusBand.length; i++) {
      const tempBandIndex = this.band.bandList.findIndex(x => x.bandID === this.music.artistList[val - 1].previusBand[i].bandID)
      this.band.removePreviusMember(tempBandIndex, this.music.artistList[val - 1].memberID);
    }
    this.music.removeArtist(val);
    this.writeToJson();
  }

  removeBand(val) {
    for (let i = 0; i < this.band.bandList[val - 1].currentBandMember.length; i++) {
      const tempArtistIndex = this.music.artistList.findIndex(x => x.memberID === this.band.bandList[val - 1].currentBandMember[i].memberID)
      this.music.removeCurrentBand(tempArtistIndex, this.band.bandList[val - 1].bandID);
    }
    for (let i = 0; i < this.band.bandList[val - 1].previusBandMember.length; i++) {
      const tempArtistIndex = this.music.artistList.findIndex(x => x.memberID === this.band.bandList[val - 1].previusBandMember[i].memberID)
      this.music.removePreviusBand(tempArtistIndex, this.band.bandList[val - 1].bandID);
    }
    this.band.removeBand(val);
    this.writeToJson()
  }

  writeToJson() {
    this.music.writeToJson();
    this.band.writeToJson();
  }
}