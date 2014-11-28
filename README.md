Technical Test solution by P. Hurst
===================================

Prerequisites: node/npm, mocha (to run test suite), mongodb running dev server on localhost

To run test suite:

  npm install
  npm install -g mocha
  npm test
  
The test suite demonstrates all requirements of the spec.

To run the web server:

  npm install
  npm server

The server can then be accessed on http://localhost:3000 .

Files are in these locations:

Express app:
  app/application.js

Angular app:
  app/public/application.js

Angular partial views:
  app/views/partials

Test suite:
  test/*.js

