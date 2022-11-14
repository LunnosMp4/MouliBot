
# MouliBot

## A Discord Bot for [my.epitech.eu](https://my.epitech.eu/)

This discord bot aims to make life easier for epitech students !<br/>Thanks to this bot you will be able to directly access your latest notes directly from discord !<br/>

**This bot is not affiliated with Epitech in any way, it is a personal project that I have developed for my own use and decided to share.**<br>

The bot will be active 24/7 the First January 2023.
**[Add MouliBot to your server](https://discord.com/api/oauth2/authorize?client_id=1020042521105158284&permissions=8&scope=applications.commands%20bot)**
<br>
 
## Overview
 
You can see below examples of the main commands that can be used on discord.
**This bot use slash commands, just type / on discord to see the list of commands.**
 
- `/login <email> <password>` : Connect you to [my.epitech.eu](https://my.epitech.eu/) using your epitech mail and password. **Your Password and Email are not saved.**

 - `/last` : Shows the last test performed on [my.epitech.eu](https://my.epitech.eu/), you can also change the test by clicking on the arrows under the message.
 
<a href="https://zupimages.net/viewer.php?id=22/40/y4xv.png"><img src="https://zupimages.net/up/22/40/y4xv.png" alt="" height="400"/></a>

 - `/total` : Shows the total of syntax errors of all your projects combined per units. You can also look at the syntax errors per units by doing the command `/total <unit_name>`
 
<a href="https://zupimages.net/viewer.php?id=22/40/px2q.png"><img src="https://zupimages.net/up/22/40/px2q.png" alt="" height="400"/></a>


## IMPORTANT

**Please read the following lines.**

When you will have done the command `/login` the bot will ask you to write a verification code. This is a code that you will receive by SMS on your phone. This code is to be written in the Discord chat. It comes the two steps authenticator of Microsoft **(I remind you that all your personal information (email and password) are in no way saved)**.<br>

Your token will be recovered thanks to this connection and updated regularly (every hour).
If you receive the following message (see photo below) is that your token and being updated **(it's completely normal)**, you just have to wait a few seconds that the message changes (see photo below) and you can try the command again !

- When the token is updating:<br>
<a href="https://zupimages.net/viewer.php?id=22/40/wubu.png"><img src="https://zupimages.net/up/22/40/wubu.png" alt="" height="200"/></a>

- Afer a few seconds:<br>
<a href="https://zupimages.net/viewer.php?id=22/40/712t.png"><img src="https://zupimages.net/up/22/40/712t.png" alt="" height="200"/></a>

## Token

This bot works with a recoverable token on the site my.epitech.eu. Token recovery is done automatically, you just need to log in once with the command `/login`.


If you want to get your token manually follow the step below.<br/>
First you need to go and login to [my.epitech.eu](https://my.epitech.eu/) then right click, inspect, and go to the networks section.<br/>Once done you will probably have to do **ctrl + r** to refresh the requests. Once done at the top of the section, check Fetch/XHR and search for the "2021" query.<br/>Once inside you will find the Authentication variable which contains our token !
## API

For this bot I use the api of **api.epitest.eu** but this one is not documented, here is what I can show you about it, hoping to help you !

First you have to request on this link : https://api.epitest.eu/me/${CurrentYears}/your_token<br/>
*⚠️ Oddly the year in the ${Current Years} variable is one year back (example: 2022 => 2021) ⚠️*

Then the response from the api looks like this :

```json
[{
    {
        "project": {
            "slug": "dante",            → Short Project Name
            "name": "Dante's star",     → Project Name
            "module": {
                "code": "B-CPE-200"     → Unit
            },
            "skills": []
        },
        "results": {
            "testRunId": 4736784,
            "logins": ["name@epitech.eu"],
            "prerequisites": 2.0,
            "externalItems": [{
                "type": "lint.note",    → Project Note
                "value": -3.0
            }, {
                "type": "lint.major",   → Major Error
                "value": 0.0
            }, {
                "type": "lint.minor",   → Minor Error
                "value": 3.0
            }, {
                "type": "lint.info",    → Info Error
                "value": 3.0
            }],
            "mandatoryFailed": 0,
            "skills": {
                "00 - Basics": {
                    "count": 2,          → Total Test of this part
                    "passed": 2,         → Number of Test passed
                    "crashed": 0,        → NUmber of Test crashed
                    "mandatoryFailed": 0
                },
                ...
                "05 - Solving": {
                    "count": 6,
                    "passed": 2,
                    "crashed": 0,
                    "mandatoryFailed": 0
                }
            }
        },
        "date": "2022-05-19T08:07:02Z"  → Test Date
    },
    ...
}]
    
```

**If you like this project don't hesitate to star it !**
## Authors

- [Lunnos](https://www.github.com/LunnosMp4)
