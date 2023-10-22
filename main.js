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
  7.ta bort en musiker
  8.ta bort ett band
  
  q.avsluta `);
  let val = prompt('val: ');
  switch (val) {
    case '1':
      console.log("1.skapa en musiker")
      let name = prompt("namn på musikern: ");
      let birthYear = parseInt(prompt("födelsdags år (YYYY): "));
      music.createNewArtist(name, birthYear);
      break;
    case '2':
      console.log("2.visa en spesifik musiker")
      if (music.getLenght() === 0) {
        console.log('det finns inga musiker, behöver skapa en musiker först!')
      } else {
        music.displayAllArtist();
        let agien = true;
        while (agien) {
          let val = prompt("nummret på musikern du vill se mer in på: ");
          if (val > music.getLenght() || isNaN(val) || val <= 0) {
            console.log('valet är ogtiltig');
          } else {
            music.displayArtist(val);
            agien = false;
          }
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
        let instrument = prompt("instrument/roll musikern har: ")
        let bandName = prompt("bandet heter: ");
        let yearCreated = parseInt(prompt("årtal bandet bildades: "));
        mid.createBand(val, instrument, bandName, yearCreated);
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
          if (val > band.getLenght() || isNaN(val) || val <= 0) {
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
      if (music.getLenght() === 0) {
        console.log("kan tyvärr inte lägga till en musiker till ett band när det inte finns nån musiker, behöber skapa en musiker först!");
      } else if (band.getLenght() === 0) {
        console.log("kan tyvärr inte lägga till en musiker till ett band när det finns inga nån band, behöver skapa ett band först!");
      } else {
        music.displayAllArtist();
        const val1 = prompt("nummret på musiker som du vill ha: ");
        const instrument = prompt("instrument/roll musikern har: ")
        const templist = band.displayOngoingBand();
        if (templist.length === 0) {
          console.log("finns inga band som man kan lägga till!")
        } else {
          const val2 = prompt("band du till lägga till i: ");
          mid.addArtistToBand(val1, instrument, templist[val2 - 1]);
        }
      }
      break;
    case '6':
      console.log("6.ta bort en musiker från ett band");
      if (music.getLenght() === 0) {
        console.log("kan tyvärr inte ta bort en musiker från ett band när det inte finns nån musiker, behöber skapa en musiker först!");
      } else if (band.getLenght() === 0) {
        console.log("kan tyvärr inte ta bort en musiker från ett band när det finns inga nån band, behöver skapa ett band först!");
      } else {
        const tempBandList = band.displayOngoingBand();
        let val1 = prompt("band du vill ha: ");
        const tempArtisList = band.displayCurrentMember(val1);
        const val2 = prompt("musikern du till ta bort: ");
        mid.moveArtist(tempBandList[val1 - 1], tempArtisList[val2 - 1]);
      }
      break;
    case '7':
      console.log("7.ta bort en musiker")
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
      console.log("8.ta bort ett band")
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
