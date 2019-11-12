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
            name: "color",
            text: "What is your favorite color?"
        },
        {
            type: "input",
            name: "username",
            text: "Enter your GitHub username here"
        }
    ])
}



promptUser()
    .then(function (response) {
        console.log(response);
        axios.get(`https://api.github.com/users/${response.username}`)
            .then(function (user) {
                const joinedData = {
                    color: response.color,
                    ...user.data
                }
                console.log(joinedData);
                const html = generateHTML(joinedData);
                // console.log(html);
                writeFileAsync("index.html", html);
            })
    })
    .catch(function (err) {
        console.log(err);
    })


function generateHTML(response) {
    console.log(response);
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
            <title>Document</title>
            </head>
            <body>
            <div class="jumbotron jumbotron-fluid" style="background-color: ${response.color}">
            <div class="container">
            <img href="${response.avatar_url}" style="size: 200px, 200px"/>
            <br>
            <h1 class="display-4">Hi! <br> My name is ${response.name}</h1>
            <ul class="list-group">
            <li class="list-group-item">GitHub: ${response.html_url}</li>
            <li class="list-group-item">Location: ${response.location}</li>
            </ul>
            <h3>${response.bio}</h3>
            </div>
            <div class="section">
            <h3>Public Repositories: ${response.public_repos}</h3>
            <h3>Followers: ${response.followers}</h3>
            <h3>Following: ${response.following}</h3>
            <h3>Starred: ${response.starred_url}</h3>
            
            </div>
            </div>
            </body>
            </html>`;
}