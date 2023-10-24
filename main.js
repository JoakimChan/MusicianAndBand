import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });
import Musican from './musiker.js';
import Band from './band.js';
import Mid from './mid.js';

let run = true;
while (run) {
  const music = new Musican();
  const band = new Band();
  const mid = new Mid();
  console.log(`
  1.skapa en musiker
  2.visa en spesifik musiker
  3.skapa band
  4.visa en spesifik band
  5.lägg till en musiker till ett band
  6.ta bort en musiker från ett band
  7.ta bort allt info med en musiker
  8.ta bort allt info med ett band
  q.avsluta
  `);
  let val = prompt('val: ');
  switch (val) {
    case '1':
      console.log("1.skapa en musiker")
      let createMusicer = false
      while (!createMusicer) {
        let name = prompt("namn på musikern: ")
        if (name.length < 1 || name.trim() === '') {
          console.log("namnet måste innehålla minst 1 bokstav eller synbol!");
        } else {
          let birthYear = prompt("födelsdags år (YYYYMMDD): ");
          if (birthYear.length != 8 || isNaN(birthYear)) {
            console.log("felaktig födelsedag!")
          }
          //        else if (birthYear > parseInt(new Date().getFullYear() + new Date().getMonth() + new Date().getDate())) {}
          else {
            music.createNewArtist(name, birthYear);
            createMusicer = true;
          }
        }
      }
      break;
    case '2':
      console.log("2.visa en spesifik musiker")
      if (music.getLenght() === 0) {
        console.log('det finns inga musiker, behöver skapa en musiker först!')
      } else {
        music.displayAllArtist();
        let val = prompt("nummret på musikern du vill se mer in på: ");
        if (val > music.getLenght() || val < 1 || isNaN(val)) {
          console.log('valet är ogtiltig');
        } else {
          music.displayArtist(val);
          agien = false;
        }
      }
      break;
    case '3':
      console.log("3.skapa band");
      if (music.getLenght() === 0) {
        console.log("kan tyvärr inte skapa band när det inte finns nån musiker, behöver skapa en musiker först!");
      } else {
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
              let yearCreated = prompt("årtal bandet bildades: ");
              if (yearCreated.length != 8 || isNaN(yearCreated)) {
                console.log("felaktig födelsedag!")
              } else {
                mid.createBand(val, instrument, bandName, yearCreated);
                bandValues = true;
              }
            }
          }
        }
      }
      break;;
    case '4':
      console.log("4.visa en spesifik band");
      if (band.getLenght() === 0) {
        console.log('det finns inga band, behöver skapa ett band först!')
      } else {
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
      break;
    case '5':
      console.log("5.lägg till en musiker till ett band");
      if (checkList()) {
        music.displayAllArtist();
        const val1 = prompt("nummret på musiker som du vill ha: ");
        if (val > band.getLenght() || val < 1 || isNaN(val)) {
          const instrument = prompt("instrument/roll musikern har: ").trim().toLowerCase();
          const templist = band.displayOngoingBand();
          if (templist.length === 0) {
            console.log("finns inga band som man kan lägga till!")
          } else {
            const val2 = prompt("band du till lägga till i: ");
            if (val2 > templist.length || val2 < 1 || isNaN(val2)) {
              console.log("valet är ogiltig")
            } else {
              mid.addArtistToBand(val1, instrument, templist[val2 - 1]);
            }
          }
        }
      }
      break;
    case '6':
      console.log("6.ta bort en musiker från ett band");
      if (checkList()) {
        const tempBandList = band.displayOngoingBand();
        if (tempBandList.length > 0) {
          let val1 = prompt("band du vill ha: ");
          if (val1 > tempBandList.length || val1 < 1 || isNaN(val1)) {
            console.log("valet är ogiltig")
          } else {
            const tempArtisList = band.displayCurrentMember(val1);
            const val2 = prompt("musikern du till ta bort: ");
            if (val2 > tempArtisList.length || val2 < 1 || isNaN(val2)) {
              console.log("valet är ogiltig")
            } else {
              mid.moveArtist(tempBandList[val1 - 1], tempArtisList[val2 - 1]);
            }
          }
        }
      }
      break;
    case '7':
      console.log("7.ta bort allt info med en musiker")
      if (music.getLenght === 0) {
        console.log('det finns inga musiker, behöver skapa en musiker först!')
      } else {
        music.displayAllArtist();
        let agien = true;
        while (agien) {
          let val = prompt('nummret på musiker du vill ta bort: ');
          if (val > music.getLenght() || isNaN(val) || val <= 0) {
            console.log('valet är ogtiltig');
          } else {
            mid.removeArtist(val);
            agien = false;
          }
        }
      }
      break;
    case '8':
      console.log("8.ta bort allt info med ett band")
      if (band.getLenght() === 0) {
        console.log('det finns inga band, behöver skapa ett band först!')
      } else {
        band.displayAllband()
        let agien = true;
        while (agien) {
          let val = prompt('nummret på bandet du vill ta bort: ');
          if (val > band.getLenght() || isNaN(val) || val <= 0) {
            console.log('valet är ogtiltig');
          } else {
            mid.removeBand(val);
            agien = false;
          }
        }
      }
      break;
    case 'q':
      run = false;
      break;
    default:
      console.log("valet finns inte!");
  }
}

function checkList() {
  if (music.getLenght() === 0) {
    console.log("kan tyvärr inte ta bort en musiker från ett band när det inte finns nån musiker, behöver skapa en musiker först!");
    return false;
  } else if (band.getLenght() === 0) {
    console.log("kan tyvärr inte ta bort en musiker från ett band när det finns inga nån band, behöver skapa ett band först!");
    return false;
  }
  return true;
}