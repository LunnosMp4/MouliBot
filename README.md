
# MouliBot

## A Discord Bot for [my.epitech.eu](https://my.epitech.eu/)

This discord bot aims to make life easier for epitech students !<br/>Thanks to this bot you will be able to directly access your latest notes directly from discord !<br/>
It will be active 24/7 as long as I would consider him fit for duty !
## Setup

You need to install this :
 

```bash
    sudo apt install nodejs npm
    npm install discordjs
    npm install axios
```

Then you have to create a *config.json* and a *data.json* file at the root of the project.<br/>
The *config.json* file will contain important information about your bot such as its name, its description but also its token, the *data.json* file will serve as a database and will contain the token from [my.epitech.eu](https://my.epitech.eu/) associated with each user.

In the *config.json* file you must write what is below, the other file must remain empty.

```json
{
    "prefix": "'",
    "bottoken": "bot_token",
    "botname": "bot_name",
    "botdesc": "bot_description",
    "botimg": "bot_picture",
    "data": "./data.json"
}
```
Then you just have to launch the bot !

```bash
    node bot.js
```


## Token

For the moment you have to enter your token yourself, so you have to go get it manually, but this will change in the future to make it much easier

#### Where to find this token?

First you need to go and login to [my.epitech.eu](https://my.epitech.eu/) then right click, inspect, and go to the networks section.<br/>Once done you will probably have to do **ctrl + r** to refresh the requests. Once done at the top of the section, check Fetch/XHR and search for the "2021" query.<br/>Once inside you will find the Authentication variable which contains our token, so copy it without the "Bearer" at the beginning !
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

