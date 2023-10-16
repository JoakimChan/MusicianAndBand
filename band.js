import fs from 'fs';
import NewBand from './newBand.js';


export default class Band {
  constructor() {
  };

  static createBand() {
    let bandName = prompt("vad heter bandet?: ");
    const band = new NewBand(bandName);
    let allBand;
    /*
    try {
      allBand = JSON.parse(fs.readFileSync('./band.json', 'utf-8'));
      if (typeof allBand !== 'object') {
        allBand = {};
      }
    } catch {
      allBand = {};
    }
    */
    allBand[band.bandName] = [{
      createdDate: new Date().toLocaleString(),
      members: [],
      previusMembers: [],
      disband: undefined
    }];

    fs.writeFileSync('./band.json', JSON.stringify(allBand, null, 2));
    return;
  };

};