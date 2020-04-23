const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

let readMe = {};

function getProjectName() {
  return inquirer.prompt([{
    type: "input",
    message: "What is the name of your project?",
    name: "projectName"
  }])
} //end getProjectName

function selectSections() {
  return inquirer.prompt([{
    type: "checkbox",
    name: "readmeSections",
    message: "Select the sections you want to include in your readMe",
    choices: [
      { name: 'Description', short: 'Description' },
      { name: 'Badges' },
      { name: 'Visuals' },
      { name: 'Installation' },
      { name: 'Usage' },
      { name: 'Support' },
      { name: 'Contributing' },
      { name: 'Authors and acknowledgments' },
      { name: 'License' },
      { name: 'Project status' }
    ]
  }])
} // end selectSections

function fillSection(sectionSelection) {
  return new Promise((resolve, reject) => {

    switch (sectionSelection) {
      case 'Description': case 'Badges': case 'Installation': case 'Usage': case 'Support':
      case 'Contributing': case 'Authors and acknowledgments': case 'License': case 'Project status':
        inquirer.prompt([{
          type: "input",
          message: "What would you like " + sectionSelection + " to say?",
          name: sectionSelection
        }]).then(answers => resolve(answers));
        break;
      case 'Visuals':
        inquirer.prompt([{
          type: "input",
          message: "What image would you like to put in the file?",
          name: sectionSelection
        }]).then(answers => resolve(answers));
        break;
      default:
        console.log('Not valid section');
        break;
    }
  });
}

function createReadMeObject(name, sections, content) {
  readMe = {
    readMeName: name,
    readMeSections: sections,
    readMeContent: content
  };

}


async function init(resolve, reject) {
  try {
    const name = await getProjectName();
    const sections = await selectSections();
    const content = [];
    // for(let section of sections.readmeSections){
    //   content.push( await fillSection(section));
    // }
    // sections.readmeSections
    console.log("init -> sections.readmeSections", sections.readmeSections);
    sections.readmeSections.forEach(async section => {
      //  let test = await fillSection(section);
      console.log("hit");
      content.push('hi')
    });
    createReadMeObject({ ...name, ...sections, content });
    // createReadMeObject(name, sections, content);
    console.log({ ...name, ...sections, content })
    // console.log(readMe);
  } catch (error) {
    console.log(error);
  }
} //end init

init();