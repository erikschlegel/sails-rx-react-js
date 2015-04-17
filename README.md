sails-browserify-example
========================

An example of how it works grunt in sails adding browserify, with React support

# Usage

Clone this repo and download with npm the packages:

```

  git clone https://github.com/Josebaseba/sails-browserify-example

  cd sails-browserify-example

  sudo npm install

  sails lift

```

Check the assets/js/app.js file to see a small example.

To modify the Browserify main file please modify tasks/pipeline.js file (line 15) for the new main file path.

```
  var browserifyMainFile = '.tmp/public/js/app.js';

```

## IMPORTANT

The sails.io.js file has a small modification, just commenting a few lines of code that uses require('request'). Because Browserify understands that it has to require that package, but we don't need that in the browser.

You can see that change in the line 673 (until the 692 line).

### More details in [this repository](https://github.com/Josebaseba/sails-browserify)

