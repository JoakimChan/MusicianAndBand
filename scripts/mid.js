import Musican from './musician.js';
import Band from './band.js';

export default class Mid {
  constructor() {
    this.music = new Musican();
    this.band = new Band();
  }

  createBand(musicianIndex, instrument, bandName, yearCreated) {
    const musician = this.music.musicianList[musicianIndex]

    const newBandID = this.band.createBand(bandName, yearCreated, musician.memberID, musician.name, instrument);
    this.music.addToABand(musicianIndex, instrument, newBandID, bandName, yearCreated);
    this.writeToJson()
  }

  addMusicanToBand(musicianIndex, instrument, bandId, bandIndex) {
    const date = new Date().getFullYear();
    const musician = this.music.musicianList[musicianIndex]
    const band = this.band.bandList[bandIndex]

    this.music.addToABand(musicianIndex, instrument, bandId, band.name, date);
    this.band.addToABand(bandIndex, musician.memberID, musician.name, instrument, date);
    this.writeToJson();
  }

  moveMusican(bandId, bandIndex, musicianId) {
    const date = new Date().toLocaleString();

    this.band.currentToPreviu(bandIndex, musicianId, date);
    this.music.currentToPreviu((this.music.musicianList.findIndex(x => x.memberID === musicianId)), bandId, date);
    this.writeToJson();
  }

  //remove
  removeMusician(musicianIndex) {
    const musician = this.music.musicianList[musicianIndex]

    for (let i = 0; i < musician.currentBand.length; i++) {
      const bandIndex = this.band.bandList.findIndex(x => x.bandID === musician.currentBand[i].bandID)
      this.band.removeCurrentMember(bandIndex, musician.memberID);
    }
    for (let i = 0; i < musician.previusBand.length; i++) {
      const bandIndex = this.band.bandList.findIndex(x => x.bandID === musician.previusBand[i].bandID)
      this.band.removePreviusMember(bandIndex, musician.memberID);
    }
    this.music.removeMusician(musicianIndex);
    this.writeToJson();
  }

  removeBand(bandIndex) {
    const band = this.band.bandList[bandIndex]

    for (let i = 0; i < band.currentBandMember.length; i++) {
      const musicianIndex = this.music.musicianList.findIndex(x => x.memberID === band.currentBandMember[i].memberID)
      this.music.removeCurrentBand(musicianIndex, band.bandID);
    }
    for (let i = 0; i < band.previusBandMember.length; i++) {
      const musicianIndex = this.music.musicianList.findIndex(x => x.memberID === band.previusBandMember[i].memberID)
      this.music.removePreviusBand(musicianIndex, band.bandID);
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