import fs from 'fs';
import NewMusican from './newMusiker.js';


export default class Musician {
  constructor() {

  };

  static createMusician() {
    let firstName = prompt("förnamn på musikern: ");
    let lastName = prompt("efternamn på musikern: ");
    let birthdayDate = prompt("födelsedatrum (YYYYMMDD): ");
    const music = new NewMusican(firstName, lastName, birthdayDate);
    let allMusican;
    /*
    try {
      allMusican = JSON.parse(fs.readFileSync('./musican.json', 'utf-8'));
      if (typeof allMusican !== 'object') {
        allMusican = {};
      }
    } catch {
      allMusican = {};
    }
    */
    allMusican[music.firstName] = [{
      lastName: music.lastName,
      birthday: music.birthday,
      currentBand: [],
      previusBand: [],
      instrument: []
    }];

    fs.writeFileSync('./musican.json', JSON.stringify(allMusican, null, 2));
    return;
  };

  /*
  static showAllMusician() {
    let array = 
    for (let i = 0; i < music.length; i++) {
      console.log(`${i}. ${music[i].name} `)
    }
  }

  showMusican(indexNumber) { 

  }
*/
};