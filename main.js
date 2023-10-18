import PromptSync from 'prompt-sync';
const prompt = PromptSync({ sigint: true });
import Musican from './musiker.js';
import Band from './band.js';
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
  console.log("1.skapa en musiker 2.visa en spesicik musiker 3.ta bort en artist 4. skapa band q.avsluta");
  let val = prompt('val: ');
  switch (val) {
    case '1':
      Musican.createNewArtist();
      break;
    case '2':
      Musican.displayArtist();
      break;
    case '3':
      Musican.removeArtist();
      break;
    case '4':
      Band.createBand();
      break;
    case 'q':
      Musican.writeToJson();
      agien = false;
      break;
  }
}

