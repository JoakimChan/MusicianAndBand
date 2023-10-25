import Musican from './musiker.js';
import Band from './band.js';

export default class Mid {
  constructor() {
    this.music = new Musican();
    this.band = new Band();
  }

  createBand(musicIndex, instrument, bandName, yearCreated) {
    let tempId = this.band.createBand(bandName, yearCreated, this.music.musicList[musicIndex].memberID, this.music.musicList[musicIndex].name, instrument);
    this.music.addToABand(musicIndex, instrument, tempId, bandName, yearCreated);
    this.writeToJson();
  }

  addArtistToBand(musicianIndex, instrument, bandId, bandIndex) {
    let date = new Date().getFullYear();
    this.music.addToABand((musicianIndex), instrument, bandId, this.band.bandList[bandIndex].name, date);
    this.band.addToABand(bandIndex, this.music.musicList[musicianIndex].memberID, this.music.musicList[musicianIndex].name, instrument, date);
    this.writeToJson();
  }

  moveArtist(bandId, bandIndex, musicianId) {
    let date = new Date().toLocaleString();
    this.band.currentToPreviu(bandIndex, musicianId, date);
    this.music.currentToPreviu((this.music.musicList.findIndex(x => x.memberID === musicianId)), bandId, date);
    this.writeToJson();
  }

  //remove
  removeArtist(musicianIndex) {
    for (let i = 0; i < this.music.musicList[musicianIndex].currentBand.length; i++) {
      const tempBandIndex = this.band.bandList.findIndex(x => x.bandID === this.music.musicList[musicianIndex].currentBand[i].bandID)
      this.band.removeCurrentMember(tempBandIndex, this.music.musicList[musicianIndex].memberID);
    }
    for (let i = 0; i < this.music.musicList[musicianIndex].previusBand.length; i++) {
      const tempBandIndex = this.band.bandList.findIndex(x => x.bandID === this.music.musicList[musicianIndex].previusBand[i].bandID)
      this.band.removePreviusMember(tempBandIndex, this.music.musicList[musicianIndex].memberID);
    }
    this.music.removeArtist(musicianIndex);
    this.writeToJson();
  }

  removeBand(bandIndex) {
    for (let i = 0; i < this.band.bandList[bandIndex].currentBandMember.length; i++) {
      const tempArtistIndex = this.music.musicList.findIndex(x => x.memberID === this.band.bandList[bandIndex].currentBandMember[i].memberID)
      this.music.removeCurrentBand(tempArtistIndex, this.band.bandList[bandIndex - 1].bandID);
    }
    for (let i = 0; i < this.band.bandList[bandIndex].previusBandMember.length; i++) {
      const tempArtistIndex = this.music.musicList.findIndex(x => x.memberID === this.band.bandList[bandIndex].previusBandMember[i].memberID)
      this.music.removePreviusBand(tempArtistIndex, this.band.bandList[bandIndex - 1].bandID);
    }
    this.band.removeBand(bandIndex);
    this.writeToJson()
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  writeToJson() {
    this.music.writeToJson();
    this.band.writeToJson();
  }
}