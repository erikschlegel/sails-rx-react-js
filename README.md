sails-rx-react-js
========================

A ES 6 ReactJS themed starter site running on the SailsJS platform, which bootstraps you with ReactJS, RXJS, RxReact, Twitter Bootstrap 3, Font Awesome, Babel and Browserify. 

This flavor of SailsJS is packaged with a Babel Grunt task, which converts all ECMA 6 scripts into ECMA 5 files, eleviating ES6 browser compatibility concerns.

You can have a modern ES6 based full stack site up and running in minutes after cloning this repo, and running the 4 instalation steps below.

Future development: 
 1) Build a Waterline ORM adapter for Azure structured and unstrcutured data storage.
 2) Integrate Felix Rieseberg's Azure Sails Deploy repo https://github.com/felixrieseberg/sails-deploy-azure
 3) Integrate Flipboards react canvas for High performance <canvas> rendering for React components

# Pre-requisites: This install assumes you have npm and bower installed.

Clone this repo and download with npm the packages:
```

  git clone https://github.com/erikschlegel/sails-rx-react-js.git

  cd sails-rx-react-js

  sudo npm install

  sudo npm -g install sails
  sudo npm install --global babel
  bower install

  sails lift

```
