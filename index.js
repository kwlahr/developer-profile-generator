const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
const electron = require("electron");
const electronHTMLTo = require("electron-html-to");

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "Favorite Color",
            text: "What is your favorite color?"
        },
        {
            type: "input",
            name: "username",
            text: "Enter your GitHub username here"
        }
    ]).then(function (data) {
        console.log(data);
        axios.get(`https://api.github.com/users/${data.username}`)
            .then(function (user) {
                console.log(user.data);
            })
    })
}



promptUser();