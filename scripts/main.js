import PromptSync from 'prompt-sync';
import Musican from './musician.js';
import Band from './band.js';
import Mid from './mid.js';
const prompt = PromptSync({ sigint: true });
const music = new Musican();
const band = new Band();
const mid = new Mid();

main();

function main() {
  let running = true;
  while (running) {
    console.log(`
  1.create a musician
  2.show a specific musician
  3.create band
  4.show a specific band
  5.add a musician to a band
  6.remove a musician from a band
  7.remove all info of a musician
  8.remove all info of a band
  q.quit
  `);
    let choice = prompt('menu selection: ');
    switch (choice) {
      case '1':
        createMusician();
        break;
      case '2':
        showInfoOfOneMusician();
        break;
      case '3':
        createBand();
        break;;
      case '4':
        showInfoOfOneBand();
        break;
      case '5':
        addMusicianToBand();
        break;
      case '6':
        removeMusicianFromBand();
        break;
      case '7':
        removeOneMusician();
        break;
      case '8':
        removeOneBand();
        break;
      case 'q':
        running = false;
        break;
      default:
        console.log("the choice does not exist!");
    }
  }
}

function createMusician() {
  let musicianName, musicianBirth = false
  let name, birthdate
  while (!musicianName) {
    name = prompt('name of the musician: ')
    if (name.length < 1 || name.trim() === '') {
      console.log("the name must contain at least 1 letter or symbol!");
    } else {
      musicianName = true
    }
  }
  while (!musicianBirth) {
    birthdate = prompt("date of birth (YYYYMMDD): ");

    if (checkDate(birthdate)) {
      musicianBirth = true;
    }
  }
  music.createNewArtist(name, birthdate);
}

function showInfoOfOneMusician() {
  if (checkList(music)) {
    music.displayAllMusician();
    let chooseMusican = true;
    while (chooseMusican) {
      let choice = prompt("the number of the musician you want to see more about: ");
      if (choice > music.getLenght() || choice < 1 || isNaN(choice)) {
        console.log('the choice is invalid');
      } else {
        music.displayMusician(choice - 1);
        chooseMusican = false;
      }
    }
  }
}

function createBand() {
  let bandName, bandMember, dateBandCreated = false
  let name, choice, instrument, formed
  if (checkList(music)) {
    while (!bandName) {
      name = prompt("the band is called: ");
      if (name.length < 1 || name.trim() === '') {
        console.log("the name must contain at least 1 letter or symbol!");
      } else {
        bandName = true
      }
    }
    while (!bandMember) {
      music.displayAllMusician();
      choice = prompt("the number of musician and add as the first member:")
      if (choice < 1 || choice > music.getLenght() || isNaN(choice)) {
        console.log("the choice does not exist!")
      } else {
        instrument = prompt("instrument/role the musician has: ").trim().toLowerCase();
        bandMember = true;
      }
      while (!dateBandCreated) {
        formed = prompt("date the band was formed (YYYYMMDD): ");
        if (checkDate(formed)) {
          dateBandCreated = true;
        }
      }
    }
    mid.createBand((choice - 1), instrument, name, formed);
  }
}

function showInfoOfOneBand() {
  let chooseBand = false;
  if (checkList(band)) {
    while (!chooseBand) {
      band.displayAllband();
      let choice = prompt('the number of the band you want to see more about: ');
      if (choice > band.getLenght() || choice < 1 || isNaN(choice)) {
        console.log('the choice is invalid');
      } else {
        band.displayBand(choice);
        chooseBand = true;
      }
    }
  }
}

function addMusicianToBand() {
  let chooseMusican, chooseBand = false;
  let musicanChoice, instrument, bandChoice
  if (checkList(music) && checkList(band)) {
    while (!chooseMusican) {
      music.displayAllMusician();
      musicanChoice = prompt("the number of musician you want: ");
      if (musicanChoice > music.getLenght() || musicanChoice < 1 || isNaN(musicanChoice)) {
        console.log("the choice is invalid")
      } else {
        instrument = prompt("instrument/role the musician has: ").trim().toLowerCase();
        chooseMusican = true
      }
    }
    while (!chooseBand) {
      const bandList = band.displayAvaliableBand(music.musicianList[musicanChoice - 1].memberID);
      if (bandList.length === 0) {
        console.log("there are no bands to add!")
        chooseBand = true
      } else {
        bandChoice = prompt("the number of the band you wanna add the musician to: ");
        if (bandChoice > bandlist.length || bandChoice < 1 || isNaN(bandChoice)) {
          console.log("the choice is invalid")
        } else {
          mid.addMusicanToBand((val1 - 1), instrument, templist[val2 - 1].bandID, templist[val2 - 1].index);
          chooseBand = true
        }
      }
    }
  }
}

function removeMusicianFromBand() {
  let chooseBand, chooseMusican = false;
  let bandChoice, bandList, musicanList, musicanChoice
  if (checkList(music) && checkList(band)) {
    while (!chooseBand) {
      bandList = band.displayOngoingBand();
      if (bandList.length === 0) {
        console.log("there are no bands available!")
        return
      } else {
        bandChoice = prompt("the number of bands you want:");
        if (bandChoice > bandList.length || bandChoice < 1 || isNaN(bandChoice)) {
          console.log("the choice is invalid")
        } else {
          chooseBand = true
        }
      }
    }
    while (!chooseMusican) {
      musicanList = band.displayCurrentMember(bandList[val1 - 1].index);
      musicanChoice = prompt("the number of the musician you want to remove: ");
      if (musicanChoice > musicanList.length || musicanChoice < 1 || isNaN(musicanChoice)) {
        console.log("the choice is invalid")
      } else {
        mid.moveMusican(bandList[bandChoice - 1].bandID, bandList[bandChoice - 1].index, musicanList[musicanChoice - 1]);
        chooseMusican = true
      }
    }
  }
}

function removeOneMusician() {
  let chooseMusican = false;
  if (checkList(music)) {
    while (!chooseMusican) {
      music.displayAllMusician();
      let musicanChoice = prompt('the number of musician you want to remove: ');
      if (musicanChoice > music.getLenght() || isNaN(musicanChoice) || musicanChoice <= 0) {
        console.log('the choice is invalid');
      } else {
        mid.removeMusician(musicanChoice - 1);
        chooseMusican = true
      }
    }
  }
}

function removeOneBand() {
  let chooseBand = false;
  if (checkList(band)) {
    band.displayAllband()
    while (!chooseBand) {
      let bandChoice = prompt('the number of the band you want to delete: ');
      if (bandChoice > band.getLenght() || isNaN(bandChoice) || bandChoice <= 0) {
        console.log('the choice is invalid');
      } else {
        mid.removeBand(bandChoice - 1);
        chooseBand = true;
      }
    }
  }
}

function getAge(dateString) {
  let year = Number(dateString.substr(0, 4));
  let month = Number(dateString.substr(4, 2)) - 1;
  let day = Number(dateString.substr(6, 2));
  if (month > 11 || month < 0 || day > 31 || day < 1) {
    return false;
  } else {
    const today = new Date();
    let age = today.getFullYear() - year;
    if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
      age--;
    }
    return age;
  }
}

function checkList(list) {
  if (list.getLenght() === 0) {
    if (list === music) {
      console.log("there are no musicians, need to create musicians first!");
    } else if (list === band) {
      console.log("there are no bands, need to create bands first!");
    }
    return false;
  }
  return true;
}

function checkDate(date) {
  if (date.length != 8 || isNaN(date)) {
    console.log("the date must contain 8 digits and be numbers only")
    return false;
  } else if (!getAge(date) || getAge(date) < 0) {
    console.log("wrong wirh the date")
    return false;
  }
  return true;
}