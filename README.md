# Chat App With React and Firebase (v. 9)

This project is built with React and Firebase version 9.

## About project

The project allows you chat with other people in real time.
For convenience was created authentication and authorization (including through the Google).

Сhat already has a static list of contacts, some of them are bots (Barrera, Velazquez, Josefina and Alice Freeman). You can chat with them and recieve automatic response. For the responces was used Chuck Norris API, which generated random jokes about Chuck Norris.

If you sign in through the Google and you do it for the first time generated some messages in conversations with bots.
If you creating new user through standard form you get an empty conversations with all users.

Chat has filter by contacts.
After refreshing of the page messages gets from firebase automatically.

Link of the Chuck Norris API: https://api.chucknorris.io/

## TODO
- improving of filtering (inc. message search);
- lift up a contact if there is a new incoming message;
- add tablet and mobile version (for this moment min allowable width - 780px)

## Run the app
In the project directory, you can run:

**npm install**

This command installs a package and any packages that it depends on.

**npm start**

Runs the app in the development mode. Open http://localhost:3000 to view it in your browser.

