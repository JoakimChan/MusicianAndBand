import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });
import Musican from './musiker.js';
import Band from './band.js';

export default class Mid {
  constructor() {
    this.m = new Musican();
    this.b = new Band();
  }

  static createBand() {
    const midInstance = new Mid();
    if (midInstance.m.getLenght() === 0) {
      console.log("kan tyvärr inte skapa band, det finns inga musiker");
    } else {
      midInstance.m.displayAllArtist();
      console.log("lägg till en musiker som första medlem!")
      let val = prompt("val: ")
      midInstance.b.createBand(midInstance.m.artistList[val - 1].name);
    }
  }
}