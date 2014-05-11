'use strict';

define(['underscore'], function (_) {

  var environment,
      defaults,
      development,
      production;

  defaults = {
    port: 3000,
    session: {
      secret: 'M=~fas{&%&HOas_',
      maxAge: 1800000
    },
    twitter: {
      consumer_key: 'VZ7lN4rSX5Idd23wwhrpJ4FVO',
      consumer_secret: 'YbgIwlWiJiUkSzwwWNYrQCiUVOQl8vHBtf7LRDhDGJmQt134tt',
      access_token_key: '17973773-8UjELGt8UHDTqUGBzDhPVyS6wR77k3Y4jFZmXYK0U',
      access_token_secret: 'CAFyGFLpqCuyyMlQsrfgBzAC1Bi3GcxU5yVwyNOWi7Z68'
    }
  };

  development = _.defaults({}, defaults);

  production = _.defaults({}, defaults);


  if ('production' === process.env.NODE_ENV) {
    environment = production;
  } else {
    environment = development;
  }

  return environment;

});
