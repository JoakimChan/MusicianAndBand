import PromptSync from 'prompt-sync';
import Musican from './musiker.js';
import Band from './band.js';
import Mid from './mid.js';
const prompt = PromptSync({ sigint: true });
const music = new Musican();
const band = new Band();
const mid = new Mid();

function main() {
  console.log(`
  1.skapa en musiker
  2.visa en spesifik musiker
  3.skapa band
  4.visa en spesifik band
  5.lägg till en musiker till ett band
  6.ta bort en musiker från ett band
  7.ta bort allt info av en musiker
  8.ta bort allt info av ett band
  q.avsluta
  `);
  let choice = prompt('meny val: ');
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
      removeMusicanFromBand();
      break;
    case '7':
      removeMusician();
      break;
    case '8':
      removeBand();
      break;
    case 'q':
      run = false;
      break;
    default:
      console.log("valet finns inte!");
  }
}

function createMusician() {
  console.log("1.skapa en musiker")
  let createMusicer = false
  while (!createMusicer) {
    let name = prompt("namn på musikern: ")
    if (name.length < 1 || name.trim() === '') {
      console.log("namnet måste innehålla minst 1 bokstav eller synbol!");
    } else {
      let birthdate = prompt("födelsedatum (YYYYMMDD): ");
      if (birthdate.length != 8 || isNaN(birthdate)) {
        console.log("felaktig födelsedag!")
      } else if (!music.getAge(birthdate) || music.getAge(birthdate) < 0) {
        console.log("felaktig födelsedatum")
      } else {
        music.createNewArtist(name, birthdate);
        createMusicer = true;
      }
    }
  }
}

function showInfoOfOneMusician() {
  console.log("2.visa en spesifik musiker")
  if (checkMusicianList()) {
    music.displayAllArtist();
    let agien = true;
    while (agien) {
      let val = prompt("nummret på musikern du vill se mer in på: ");
      if (val > music.getLenght() || val < 1 || isNaN(val)) {
        console.log('valet är ogtiltig');
      } else {
        music.displayArtist(val - 1);
        agien = false;
      }
    }
  }
}

function createBand() {
  console.log("3.skapa band");
  if (checkMusicianList()) {
    music.displayAllArtist();
    let val = prompt("lägg till en musiker som första medlem: ")
    if (val < 1 || val > music.getLenght() || isNaN(val)) {
      console.log("valet finns inte!")
    } else {
      let instrument = prompt("instrument/roll musikern har: ").trim().toLowerCase();
      let bandValues = false;
      while (!bandValues) {
        let bandName = prompt("bandet heter: ");
        if (bandName.length < 1 || bandName.trim() === '') {
          console.log("namnet måste innehålla minst 1 bokstav eller synbol!");
        } else {
          let Created = prompt("datum bandet bildades (YYYYMMDD): ");
          if (Created.length != 8 || isNaN(Created)) {
            console.log("felaktig födelsedag!")
          } else if (!music.getAge(Created) || music.getAge(Created) < 0) {
            console.log("felaktig bildad datum")
          } else {
            mid.createBand((val - 1), instrument, bandName, Created);
            bandValues = true;
          }
        }
      }
    }
  }
}

function showInfoOfOneBand() {
  console.log("4.visa en spesifik band");
  if (checkBandList()) {
    band.displayAllband();
    let agien = true;
    while (agien) {
      let val = prompt('nummret på bandet du vill se mer in på: ');
      if (val > band.getLenght() || val < 1 || isNaN(val)) {
        console.log('valet är ogtiltig');
      } else {
        band.displayBand(val);
        agien = false;
      }
    }
  }
}

function addMusicianToBand() {
  console.log("5.lägg till en musiker till ett band");
  if (checkMusicianList() && checkBandList()) {
    music.displayAllArtist();
    const val1 = prompt("nummret på musiker som du vill ha: ");
    if (val1 > music.getLenght() || val1 < 1 || isNaN(val1)) {
      console.log("valet är ogiltlig")
    } else {
      const instrument = prompt("instrument/roll musikern har: ").trim().toLowerCase();
      const templist = band.displayAvaliableBand(music.musicList[val1 - 1].memberID);
      if (templist.length === 0) {
        console.log("finns inga band som man kan lägga till!")
      } else {
        const val2 = prompt("band du till lägga till i: ");
        if (val2 > templist.length || val2 < 1 || isNaN(val2)) {
          console.log("valet är ogiltig")
        } else {
          mid.addArtistToBand((val1 - 1), instrument, templist[val2 - 1].bandID, templist[val2 - 1].index);
        }
      }
    }
  }
}

function removeMusicanFromBand() {
  console.log("6.ta bort en musiker från ett band");
  if (checkMusicianList() && checkBandList()) {
    const tempBandList = band.displayOngoingBand();
    if (tempBandList.length === 0) {
      console.log("det finns inga tillgängliga band!")
    } else {
      let val1 = prompt("band du vill ha: ");
      if (val1 > tempBandList.length || val1 < 1 || isNaN(val1)) {
        console.log("valet är ogiltig")
      } else {
        const tempArtisList = band.displayCurrentMember(tempBandList[val1 - 1].index);
        const val2 = prompt("musikern du till ta bort: ");
        if (val2 > tempArtisList.length || val2 < 1 || isNaN(val2)) {
          console.log("valet är ogiltig")
        } else {
          mid.moveArtist(tempBandList[val1 - 1].bandID, tempBandList[val1 - 1].index, tempArtisList[val2 - 1]);
        }
      }
    }
  }
}

function removeMusician() {
  console.log("7.ta bort allt info av en musiker")
  if (checkMusicianList()) {
    music.displayAllArtist();
    let agien = true;
    while (agien) {
      let val = prompt('nummret på musiker du vill ta bort: ');
      if (val > music.getLenght() || isNaN(val) || val <= 0) {
        console.log('valet är ogtiltig');
      } else {
        mid.removeArtist(val - 1);
        agien = false;
      }
    }
  }
}

function removeBand() {
  console.log("8.ta bort allt info av ett band")
  if (checkBandList()) {
    band.displayAllband()
    let agien = true;
    while (agien) {
      let val = prompt('nummret på bandet du vill ta bort: ');
      if (val > band.getLenght() || isNaN(val) || val <= 0) {
        console.log('valet är ogtiltig');
      } else {
        mid.removeBand(val - 1);
        agien = false;
      }
    }
  }
}

function checkMusicianList() {
  if (music.getLenght() === 0) {
    console.log("finns inga musiker, behöver skapa musiker först!");
    return false;
  }
  return true;
}

function checkBandList() {
  if (band.getLenght() === 0) {
    console.log("finns inga nån band, behöver skapa band först!");
    return false;
  }
  return true;
}

main();