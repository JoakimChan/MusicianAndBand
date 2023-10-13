import PromptSync from `prompt-sync`;
const prompt = PromptSync({ sigint: true });

console.log(`1.skapa en musiker 2.ta bort  3.lägg till 4.kolla efter q.avsluta programmet`);
let mainChoice = prompt('vad vill du göra? :');
switch (mainChoice) {
  case '1':
    console.log(`1.skapa ett band med musikern i q.tillbaka`)
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
    console.log('valet finns inte!')
    break;
}

