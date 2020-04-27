const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const github = require('octonode'); //https://github.com/pksunkara/octonode recourses. use to create repo
const writeFile = util.promisify(fs.writeFile);


function genarateReadMe(readMe) {
  const file = `## ${readMe.name}
  ![Version](${readMe.version})
  ****
  ### Description
  ${readMe.description}
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
  ${readMe.install}
  ### Usage
  ${readMe.usage}
  ### Badges
  ${readMe.badges}
  ### License ![License](${readMe.licence})
  
  ### Contributing
  ${readMe.contributing}
  ### Tests
  ${readMe.tests}
  ### Questions
  ${readMe.questions}
  ### Project Status
  ${readMe.status}`
  // console.log('hit');
  return file;
} // end genarateReadMe

function githubInfo(id) {
  const client = github.client();
  return new Promise((resolve, reject) => {
    client.get('/users/' + id + '', {},
      function (err, status, body, headers) {
        if (err) {
          reject(err);
        }
        else{
          resolve(body.avatar_url); //json object
        }
      }
    );
  })
} // end githubInfo

function getUsername() {
  return inquirer
    .prompt([{
      type: "input",
      message: "What is your Github username?",
      name: "id"
    }])
} //end getUsername

function getProjectName() {
  return inquirer
    .prompt([{
      type: "input",
      message: "What is the name of your project?",
      name: "name"
    }])
} //end getProjectName

function getDescritpion() {
  return inquirer
    .prompt([{
      type: "input",
      message: "Write a brief description of your project",
      name: "description"
    }])
} //end getDescription

function getInstallation() {
  return inquirer
    .prompt([{
      type: "input",
      message: "Write installation instructions",
      name: "install"
    }])
} //end getInstall

function getUsage() {
  return inquirer
    .prompt([{
      type: "input",
      message: "How is your app used",
      name: "usage"
    }])
} //end getUsage

function getVersion() {
  return inquirer
    .prompt([{
      type: "input",
      message: "What version of your project is this?",
      name: "version"
    }])
} //end getVersion

function getLicense() {
  return inquirer
    .prompt([{
      type: "rawlist",
      message: "What licencing is this project under?",
      name: "licence",
      choices: ["Apache", "MIT", "BSD", "W3C", "GPL", "LGPL", "MPL", "EPL", "Other"]
    }])
} //end getLicence

function getContributing() {
  return inquirer
    .prompt([{
      type: "input",
      message: "who are the major contributors to the project",
      name: "contributing"
    }])
} //end getContributing

function getTests() {
  return inquirer
    .prompt([{
      type: "input",
      message: "Are there any tests that can be run on this project?",
      name: "tests"
    }])
} //end getTests

function getQuestions() {
  return inquirer
    .prompt([{
      type: "input",
      message: "If someone has a question, how do they contact you?",
      name: "questions"
    }])
} //end getQuestions

function getStatus() {
  return inquirer
    .prompt([{
      type: "input",
      message: "What is the current status of the project and are there any plans for the future?",
      name: "status"
    }])
} //end getStatus


async function init() {
  const readMe = {
    id: (await getUsername()).id,
    photo: await (githubInfo(this.id)),
    name : (await getProjectName()).name,
    description : (await getDescritpion()).description,
    install : (await getInstallation()).install,
    usage : (await getUsage()).usage,
    version : `https://img.shields.io/badge/Version-${(await getVersion()).version}-green`,
    licence : `https://img.shields.io/badge/License-${(await getLicense()).licence}-blue`,
    contributing: (await getContributing()).contributing,
    tests : (await getTests()).tests,
    questions : (await getQuestions()).questions,
    status : (await getStatus()).status,
  };
  

  console.log(readMe);

  writeFile("readme2.md", genarateReadMe(readMe))
    .then(() => console.log("file created successfully!"))
    .catch(error => console.log(error));
};

init();