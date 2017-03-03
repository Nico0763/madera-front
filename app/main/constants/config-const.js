'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'SERVER_URL': 'http://maderaapp.herokuapp.com/',
    'SOME_OTHER_URL': '',
    'CLOUNDINARY_URL': 'http://res.cloudinary.com/hejvjmwx8/image/upload/'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
