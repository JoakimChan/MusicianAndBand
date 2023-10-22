import Musican from './musiker.js';
import Band from './band.js';

export default class Mid {
  constructor() {
    this.m = new Musican();
    this.b = new Band();
  }

  static createBand(musiker, instrument, bandName, yearCreated) {
    const mid = new Mid();
    mid.b.createBand(bandName, yearCreated, mid.m.artistList[musiker - 1].memberID, mid.m.artistList[musiker - 1].name, instrument);
    mid.m.addToABand((musiker - 1), instrument, mid.b.bandList[musiker - 1].bandID, bandName, yearCreated);
    mid.b.writeToJson();
    mid.m.writeToJson();
  }

  static addArtistToBand(musiker, instrument, bandId) {
    const mid = new Mid();
    mid.m.addToABand((musiker - 1), instrument, bandId, mid.b.bandList[(mid.b.bandList.findIndex(x => x.bandID === bandId))].name, new Date().getFullYear());
    mid.b.addToABand((mid.b.bandList.findIndex(x => x.bandID === bandId)), mid.m.artistList[musiker - 1].memberID, mid.m.artistList[musiker - 1].name, instrument, new Date().getFullYear());
    mid.m.writeToJson();
    mid.b.writeToJson();
  }

  static moveArtist(bandId, musikerId) {
    const mid = new Mid();
    mid.b.currentToPreviu((mid.b.bandList.findIndex(x => x.bandID === bandId)), musikerId);
    mid.m.currentToPreviu((mid.m.artistList.findIndex(x => x.memberID === musikerId)), bandId);
    mid.m.writeToJson();
    mid.b.writeToJson();
  }

  static removeArtist(val) {
    const mid = new Mid();
    for (let i = 0; i < mid.m.artistList[val - 1].currentBand.length; i++) {
      const tempBandIndex = mid.b.bandList.findIndex(x => x.bandID === mid.m.artistList[val - 1].currentBand[i].bandID)
      mid.b.removeCurrentMember(tempBandIndex, mid.m.artistList[val - 1].memberID);
    }
    for (let i = 0; i < mid.m.artistList[val - 1].previusBand.length; i++) {
      const tempBandIndex = mid.b.bandList.findIndex(x => x.bandID === mid.m.artistList[val - 1].previusBand[i].bandID)
      mid.b.removePreviusMember(tempBandIndex, mid.m.artistList[val - 1].memberID);
    }
    mid.m.removeArtist(val);
    mid.m.writeToJson();
    mid.b.writeToJson();
  }

  static removeBand(val) {
    const mid = new Mid();
    for (let i = 0; i < mid.b.bandList[val - 1].currentBandMember.length; i++) {
      const tempArtistIndex = mid.m.artistList.findIndex(x => x.memberID === mid.b.bandList[val - 1].currentBandMember[i].memberID)
      mid.m.removeCurrentBand(tempArtistIndex, mid.b.bandList[val - 1].bandID);
    }
    for (let i = 0; i < mid.b.bandList[val - 1].previusBandMember.length; i++) {
      const tempArtistIndex = mid.m.artistList.findIndex(x => x.memberID === mid.b.bandList[val - 1].previusBandMember[i].memberID)
      mid.m.removePreviusBand(tempArtistIndex, mid.b.bandList[val - 1].bandID);
    }
    mid.b.removeBand(val);
    mid.m.writeToJson();
    mid.b.writeToJson();
  }
}