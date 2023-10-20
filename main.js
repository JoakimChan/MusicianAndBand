import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });
import Musican from './musiker.js';
import Band from './band.js';
import Mid from './mid.js';
let agien = true;

/*
console.log("1.skapa 2.ta bort 3.lägg till 4.kolla efter q.avsluta programmet");
let mainChoice = prompt('vad vill du göra?: ').trim().toLocaleLowerCase();
switch (mainChoice) {
  case '1':
    console.log("1.musiker 2.band q.tillbaka")
    let createChoice = prompt('vad vill du skapa?: ').trim().toLocaleLowerCase();
    switch (createChoice) {
      case '1':
        Musican.createMusican();
        break;
      case '2':
        Band.createBand();
        break;
      case 'q':
        break;
      default:
        console.log('valet finns inte!');
    }
    break;
  case '2':
    console.log('1.ett band 2.en musiker 3. en medlem i ett band 4. ett band från en musiker q.tillbaka')
    break;
  case '3':
    console.log('1.en musiker till ett band 2. ett band till en musiker q.tillbaka');
    break;
  case '4':
    console.log('1.ett band 2.en musiker q.tillbaka')
    break;
  default:
    console.log('valet finns inte!');
}
*/

while (agien) {
  const music = new Musican();
  const band = new Band();
  console.log("1.skapa en musiker 2.visa en spesifik musiker 3.ta bort en artist 4.skapa band 5.visa en spesifik band 6.lägg till en musiker till ett band q.avsluta");
  let val = prompt('val: ');
  switch (val) {
    case '1':
      let name = prompt("namn på musikern: ");
      let birthYear = parseInt(prompt("födelsdags år (YYYY): "));
      music.createNewArtist(name, birthYear);
      break;
    case '2':
      if (music.getLenght() === 0) {
        console.log('listan är tom')
      } else {
        music.displayAllArtist();
        let agien = true;
        while (agien) {
          console.log('skriv ett nummret på artisent du vill se mer in på')
          let val = prompt('val: ');
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
      if (music.getLenght === 0) {
        console.log('listan är tom')
      } else {
        music.displayAllArtist();
        let agien = true;
        while (agien) {
          console.log('skriv ett nummret på artisent du vill ta bort')
          let val = prompt('val: ');
          if (val > music.getLenght() || isNaN(val) || val <= 0) {
            console.log('valet är ogtiltig');
          } else {
            Mid.removeArtist(val);
            music.removeArtist(val);
            agien = false;
          }
        }
      }
      break;
    case '4':
      if (music.getLenght() === 0) {
        console.log("kan tyvärr inte skapa band, det finns inga musiker");
      } else {
        music.displayAllArtist();
        let val = prompt("lägg till en musiker som första medlem: ")
        let instrument = prompt("instrument/roll musikern har: ")
        let bandName = prompt("bandet heter: ");
        let yearCreated = parseInt(prompt("årtal bandet bildades: "));
        Mid.createBand(val, instrument, bandName, yearCreated);
      }
      break;;
    case '5':
      if (band.getLenght() === 0) {
        console.log('listan är tom')
      } else {
        band.displayAllband();
        let agien = true;
        while (agien) {
          console.log('skriv ett nummret på bandet du vill se mer in på')
          let val = prompt('val: ');
          if (val > band.getLenght() || isNaN(val) || val <= 0) {
            console.log('valet är ogtiltig');
          } else {
            band.displayBand(val);
            agien = false;
          }
        }
      }
      break;
    case '6':
      if (music.getLenght() === 0) {
        console.log("kan tyvärr inte lägga till en musiker till ett band, det finns inga musiker");
      } else if (band.getLenght() === 0) {
        console.log("kan tyvärr inte lägga till en musiker till ett band, det finns inga band");
      } else {
        music.displayAllArtist();
        let val1 = prompt("musiker som du vill ha: ");
        let instrument = prompt("instrument/roll musikern har: ")
        band.displayAllband();
        let val2 = prompt("band du till lägga till i: ");
        Mid.addArtistToBand(val1, instrument, val2);
      }
      break;
    case 'q':
      agien = false;
      break;
  }
}

