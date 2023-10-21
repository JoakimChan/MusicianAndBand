import Musican from './musiker.js';
import Band from './band.js';

export default class Mid {
  constructor() {
    this.m = new Musican();
    this.b = new Band();
  }

  static removeArtist(val) {
    const mid = new Mid();
    for (let i = 0; i < mid.m.artistList[val - 1].currentBand.length; i++) {
    }
  }

  static createBand(musiker, instrument, bandName, yearCreated) {
    const mid = new Mid();
    mid.b.createBand(bandName, yearCreated, mid.m.artistList[musiker - 1].memberID, mid.m.artistList[musiker - 1].name, instrument);
    mid.m.addToABand((musiker - 1), instrument, mid.b.bandList[musiker - 1].bandID, bandName, yearCreated);
    mid.b.writeToJson();
    mid.m.writeToJson();
  }

  static addArtistToBand(musiker, instrument, band) {
    const mid = new Mid();
    mid.m.addToABand((musiker - 1), instrument, mid.b.bandList[band - 1].bandID, mid.b.bandList[band - 1].name, new Date().getFullYear());
    mid.b.addToABand((band - 1), mid.m.artistList[musiker - 1].memberID, mid.m.artistList[musiker - 1].name, instrument, new Date().getFullYear());
    mid.m.writeToJson();
    mid.b.writeToJson();
  }

  static moveArtist(band, musiker) {
    const mid = new Mid();
    mid.b.currentToPreviu((band - 1), mid.m.artistList[musiker - 1].memberID);
    mid.m.currentToPreviu((musiker - 1), mid.b.bandList[band - 1].bandID);
    mid.m.writeToJson();
    mid.b.writeToJson();
  }

  static removeBand() { }

}