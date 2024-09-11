import PromptSync from 'prompt-sync';   // Importing the prompt-sync module to handle user input
import Musican from './classes/musician.js';  // Importing the Musician class
import Band from './classes/band.js';  // Importing the Band class
import Mid from './classes/mid.js';  // Importing the Mid class to manage band-musician relationships

const prompt = PromptSync({ sigint: true });   // Initialize prompt-sync for user input with Ctrl+C handling
const music = new Musican();  // Create a new Musican instance
const band = new Band();  // Create a new Band instance
const mid = new Mid();  // Create a new Mid instance

/**
 * Main function that controls the program's flow.
 * It loops through the menu options until the user decides to quit.
 */
function main() {
  let running = true;
  while (running) {
    music.fetchData();   // Fetch stored data for musicians
    band.fetchData();    // Fetch stored data for bands

    // Display menu options to the user
    console.log(`
      1. Create a musician
      2. Show a specific musician
      3. Create band
      4. Show a specific band
      5. Add a musician to a band
      6. Remove a musician from a band
      7. Remove all info of a musician
      8. Remove all info of a band
      q. Quit
    `);

    let choice = prompt('Menu selection: ');   // Prompt user for menu choice
    switch (choice) {
      case '1':
        createMusician();   // Create a new musician
        break;
      case '2':
        showInfoOfOneMusician();   // Show details of a specific musician
        break;
      case '3':
        createBand();   // Create a new band
        break;
      case '4':
        showInfoOfOneBand();   // Show details of a specific band
        break;
      case '5':
        addMusicianToBand();   // Add a musician to a band
        break;
      case '6':
        removeMusicianFromBand();   // Remove a musician from a band
        break;
      case '7':
        removeOneMusician();   // Remove a specific musician
        break;
      case '8':
        removeOneBand();   // Remove a specific band
        break;
      case 'q':
        running = false;   // Quit the program
        break;
      default:
        console.log("The choice does not exist!");  // Handle invalid input
    }
  }
}

/**
 * Function to create a new musician.
 * It prompts the user for the musician's name and birthdate, then adds the musician to the system.
 */
function createMusician() {
  let musicianName = false, musicianBirth = false;
  let name, birthdate;

  // Loop to ensure a valid musician name is entered
  while (!musicianName) {
    name = prompt('Name of the musician: ');
    if (name.length < 1 || name.trim() === '') {
      console.log("The name must contain at least 1 letter or symbol!");
    } else {
      musicianName = true;
    }
  }

  // Loop to ensure a valid birthdate is entered
  while (!musicianBirth) {
    birthdate = prompt("Date of birth (YYYYMMDD): ");
    if (checkDate(birthdate)) {
      musicianBirth = true;
    }
  }

  // Create and store the new musician
  music.createNewArtist(name, birthdate);
}

/**
 * Function to display information about a specific musician.
 * It prompts the user to choose a musician from the list and displays more details about them.
 */
function showInfoOfOneMusician() {
  if (checkList(music)) {
    music.displayAllMusician();  // Display all available musicians
    let chooseMusican = true;

    // Loop until a valid musician is selected
    while (chooseMusican) {
      let choice = prompt("The number of the musician you want to see more about: ");
      if (choice > music.getLenght() || choice < 1 || isNaN(choice)) {
        console.log('The choice is invalid');
      } else {
        music.displayMusician(choice - 1);  // Display the selected musician's information
        chooseMusican = false;
      }
    }
  }
}

/**
 * Function to create a new band.
 * The user is prompted for the band's name, formation date, and an initial member from the existing musicians.
 */
function createBand() {
  let bandName = false, bandMember = false, dateBandCreated = false;
  let name, choice, instrument, formed;

  if (checkList(music)) {
    // Loop to ensure a valid band name is entered
    while (!bandName) {
      name = prompt("The band is called: ");
      if (name.length < 1 || name.trim() === '') {
        console.log("The name must contain at least 1 letter or symbol!");
      } else {
        bandName = true;
      }
    }

    // Loop to add a musician as the first member
    while (!bandMember) {
      music.displayAllMusician();
      choice = prompt("The number of musician to add as the first member: ");
      if (choice < 1 || choice > music.getLenght() || isNaN(choice)) {
        console.log("The choice does not exist!");
      } else {
        instrument = prompt("Instrument/role the musician has: ").trim().toLowerCase();
        bandMember = true;
      }

      // Loop to ensure a valid formation date is entered
      while (!dateBandCreated) {
        formed = prompt("Date the band was formed (YYYYMMDD): ");
        if (checkDate(formed)) {
          dateBandCreated = true;
        }
      }
    }

    // Create and store the new band
    mid.createBand((choice - 1), instrument, name, formed);
  }
}

/**
 * Function to display information about a specific band.
 * The user is prompted to choose a band from the list and displays more details about them.
 */
function showInfoOfOneBand() {
  let chooseBand = false;

  if (checkList(band)) {
    // Loop until a valid band is selected
    while (!chooseBand) {
      band.displayAllband();  // Display all available bands
      let choice = prompt('The number of the band you want to see more about: ');
      if (choice > band.getLenght() || choice < 1 || isNaN(choice)) {
        console.log('The choice is invalid');
      } else {
        band.displayBand(choice);  // Display the selected band's information
        chooseBand = true;
      }
    }
  }
}

/**
 * Function to add a musician to a band.
 * The user selects a musician and a band, then assigns the musician to that band with a specific role.
 */
function addMusicianToBand() {
  let chooseMusican = false, chooseBand = false;
  let musicanChoice, instrument, bandChoice;

  if (checkList(music) && checkList(band)) {
    // Loop to select a musician
    while (!chooseMusican) {
      music.displayAllMusician();
      musicanChoice = prompt("The number of musician you want: ");
      if (musicanChoice > music.getLenght() || musicanChoice < 1 || isNaN(musicanChoice)) {
        console.log("The choice is invalid");
      } else {
        instrument = prompt("Instrument/role the musician has: ").trim().toLowerCase();
        chooseMusican = true;
      }
    }

    // Loop to select a band to add the musician
    while (!chooseBand) {
      const bandList = band.displayAvaliableBand(music.musicianList[musicanChoice - 1].memberID);
      if (bandList.length === 0) {
        console.log("There are no bands to add!");
        chooseBand = true;
      } else {
        bandChoice = prompt("The number of the band you wanna add the musician to: ");
        if (bandChoice > bandList.length || bandChoice < 1 || isNaN(bandChoice)) {
          console.log("The choice is invalid");
        } else {
          mid.addMusicanToBand((musicanChoice - 1), instrument, bandList[bandChoice - 1].bandID, bandList[bandChoice - 1].index);
          chooseBand = true;
        }
      }
    }
  }
}

// Additional functions for removing musicians/bands, validating dates, checking lists, etc., follow a similar structure.

main();  // Start the program
