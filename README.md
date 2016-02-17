**Loopback Demo Project**
===================


This is a demo project which demonstrates the basic concepts of **[Loopback.io](http://loopback.io/)** API Framework

----------


Getting started
-------------
Clone the repository:
https://github.com/vicky-gonsalves/loopback-demo.git


**Install**

Assuming you have already installed Node...

**Install the StrongLoop tools for LoopBack applications.**

    $ npm install -g strongloop

**Install Bower**

    $ npm install -g bower

**node package installation**

    $ npm install

**bower package installation**

    $ bower install


**Update providers.json with configs for Third party login**
   
    {
      "local": {
        "provider": "local",
        "module": "passport-local",
        "usernameField": "email",
        "passwordField": "password",
        "authPath": "/auth/local",
        "successRedirect": "/auth/account",
        "failureRedirect": "/",
        "failureFlash": true
      },
      "facebook-login": {
        "provider": "facebook",
        "module": "passport-facebook",
        "clientID": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
        "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
        "callbackURL": "/auth/facebook/callback",
        "authPath": "/auth/facebook",
        "callbackPath": "/auth/facebook/callback",
        "successRedirect": "/",
        "failureRedirect": "/",
        "scope": ["email"],
        "failureFlash": true
      },
      "google-login": {
        "provider": "google",
        "module": "passport-google-oauth",
        "strategy": "OAuth2Strategy",
        "clientID": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
        "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
        "callbackURL": "/auth/google/callback",
        "authPath": "/auth/google",
        "callbackPath": "/auth/google/callback",
        "successRedirect": "/",
        "failureRedirect": "/",
        "scope": ["email", "profile"],
        "failureFlash": true
      },
      "twitter-login": {
        "provider": "twitter",
        "authScheme": "oauth",
        "module": "passport-twitter",
        "callbackURL": "/auth/twitter/callback",
        "authPath": "/auth/twitter",
        "callbackPath": "/auth/twitter/callback",
        "successRedirect": "/",
        "failureRedirect": "/",
        "consumerKey": "{twitter-consumer-key}",
        "consumerSecret": "{twitter-consumer-secret}",
        "failureFlash": true
      },
      "facebook-link": {
        "provider": "facebook",
        "module": "passport-facebook",
        "clientID": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
        "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
        "callbackURL": "/link/facebook/callback",
        "authPath": "/link/facebook",
        "callbackPath": "/link/facebook/callback",
        "successRedirect": "/auth/account",
        "failureRedirect": "/auth/account",
        "scope": ["email"],
        "link": true,
        "failureFlash": true
      },
      "google-link": {
        "provider": "google",
        "module": "passport-google-oauth",
        "strategy": "OAuth2Strategy",
        "clientID": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
        "clientSecret": "xxxxxxxxxxxxxxxxxxxxxxxxxx",
        "callbackURL": "/link/google/callback",
        "authPath": "/link/google",
        "callbackPath": "/link/google/callback",
        "successRedirect": "/auth/account",
        "failureRedirect": "/auth/account",
        "scope": ["email", "profile"],
        "link": true,
        "failureFlash": true
      }
    }



**Start server**

    node .