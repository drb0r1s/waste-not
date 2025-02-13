# WasteNot
**WasteNot** is a high-fidelity prototype in a form of PWA, simulating the real-world application.

**Video:** [WasteNot high fidelity prototype](https://www.youtube.com/watch?v=DlChuqUrb0Q)

## Getting started
Application is live on the link: **[WasteNot](https://drb0r1s.github.io/waste-not/)**.

**Run as a developer:** If you want to run the development application, please follow the instructions:
- Open terminal on */waste-not/* path.
- In the terminal run: `npm start` to start the development server.

**Installation requirements:** To run the development application, you should have the following packages installed:
- Node.js ([Download](https://nodejs.org/en/download))
- React (`npm i react react-dom`)
- React Router (`npm i react-router react-router-dom`)
- React Webcam (`npm i react-webcam`)
- Gun (`npm i gun`)
- UUID (`npm i uuid`)
- SASS Compiler (It is recommened to install VSCode dependency)

## Limitations
Application is using database built entirely in browser's local storage instead of real database. This leads to the usage of the Wizard of Oz technique in order to simulate some user interaction. Because of that, the following things are hardcoded:
- List of users, articles and recipes, as well as their icons.

## Operating instructions
Overall application design is pretty straightforward to navigate through, however some further instructions are needed in order to trigger every functionallity. For simulation purposes, you should:
- Create a household starting with the letter "a" (or "A") in order to have other users inside your household. Once you create the household, a couple of users will "join" after a couple of seconds.
- Join a household using a code starting with the letter "a" (or "A") as a "valid" code, that will actually add you to the random household. Once you write the "valid" code and click "Join", some randomly generated household will be displayed.
- Scan anything with your camera. Once you click "Scan", you will be added to some random generated household, simulating the real QR code scanning system.
- Scan anything with your camera while adding an article. There is an option to scan barcode and expiration date, once you click "Scan", you will get random data for article name (barcode) and expiration date.
## Simulation
- Households are generated in a way to simulate "live" groups of people, with articles, shopping lists and members with profile pictures and banners. Even a notification system is implemented, letting the user know about the history of the household.
- Fake loadings are implemented every time application should load large dynamic data.