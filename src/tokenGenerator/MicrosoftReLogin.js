// Copyright (c) 2022, Lunnos
// https://github.com/LunnosMp4/MouliBot
// License: MIT

const fs = require('fs');
const config = require("../../config.json");
const core = require("../core/include.js");
const axios = require("axios");

const cmd = require("./MicrosoftLogin.js"); // This File is Private, You can't see it

function ReLogin(data) {
    if (data.users.length < 1) return;

    Object.keys(data.users).forEach(async key => {
        let userID = data.users[key].user;
        let userToken = data.users[key].token;

        axios.get('https://api.epitest.eu/me/2021' , { headers : {
        Authorization : userToken }}).then(response => {
            if (response.status == 200) return;
        }).catch(error => {
            console.log("Token Expired for " + userID + "renewing token");
        });

        cmd.CreateBrowser(userID).then(async ({browser, page}) => {
            if (page.url().startsWith("https://my.epitech.eu/")) {

                await core.scrapToken(data, page, message);
                console.log("Re Generating Token For " + userID);
                browser.close();
            } else {
                console.log("Error: " + userID + " is not logged in");
                browser.close();
                return;
            }
        });
    });
}

module.exports = { ReLogin };