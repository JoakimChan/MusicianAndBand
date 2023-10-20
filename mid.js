import Musican from './musiker.js';
import Band from './band.js';

export default class Mid {
  constructor() {
    this.m = new Musican();
    this.b = new Band();
  }

  static removeArtist(val) {
    const midInstance = new Mid();
    for (let i = 0; i < midInstance.m.artistList[val - 1].currentBand.length; i++) {
      midInstance.m.artistList[val - 1].currentBand[i].bandID
    }
  }

  static createBand(val, instrument, bandName, yearCreated) {
    const midInstance = new Mid();
    midInstance.b.createBand(bandName, yearCreated, midInstance.m.artistList[val - 1].ID, midInstance.m.artistList[val - 1].name, instrument);
    midInstance.m.addToABand((val - 1), instrument, midInstance.b.bandList[val - 1].bandID, bandName, yearCreated);
    midInstance.b.writeToJson();
    midInstance.m.writeToJson();
  }

  static addArtistToBand(val1, instrument, val2) {
    const midInstance = new Mid();
    midInstance.m.addToABand((val1 - 1), instrument, midInstance.b.bandList[val2 - 1].bandID, midInstance.b.bandList[val2 - 1].name, new Date().getFullYear());
    midInstance.b.addToABand((val2 - 1), midInstance.m.artistList[val1 - 1].ID, midInstance.m.artistList[val1 - 1].name, instrument, new Date().getFullYear());
    midInstance.m.writeToJson();
    midInstance.b.writeToJson();
  }
}