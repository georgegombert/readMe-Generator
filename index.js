const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);


function genarateReadMe(readMe){
  const file = `## ${readMe.name}
  ****
  ### Description
  
  ### Table of Contents
  [Installation](#Installation)
  [Usage](#Usage)
  [Badges](#Badges)
  [Licence](#Licence)
  [Contributing](#Contributing)
  [Tests](#Tests)
  [Questions](#Questions)
  [Project Status](#Project-status)
  
  ### Installation
  
  ### Usage(#Usage)
  
  ### Badges
  
  ### License
  
  ### Contributing
  
  ### Tests
  
  ### Questions
  
  ### Project Status`
  console.log('hit');
  return file;
} // end genarateReadMe

function getProjectName() {
    return inquirer
      .prompt([{
        type: "input",
        message: "What is the name of your project?",
        name: "name"
      }])
  } //end getProjectName

function getUsername() {
  return inquirer
    .prompt([{
      type: "input",
      message: "What is your Github username?",
      name: "id"
    }])
} //end getProjectName


async function init(){
  const readMe = {
    id : (await getUsername()).id,
    name : (await getProjectName()).name,
  };


  console.log(readMe);

  // writeFile("readme2.md", genarateReadMe(readMe))
  //   .then(() => console.log("file created successfully with promisify!"))
  //   .catch(error => console.log(error));
};

init();