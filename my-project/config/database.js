const path = require('path');

module.exports = ({ env }) => ({
  defaultconnection:'default',
    connection: {
      default:{
        connector: 'bookshelf',
        settings:{
          client:'postgres'
          host: env('DATABASE_HOST', 'localhost'),
          port:env.int('DATABASE_PORT', 5432),
          database: env('DATABASE_NAME','blog'),
          username: env ('DATABASE_USERNAME', 'blog'),
          password: env('DATABASE_PASSWORD', 'blog'),
          ssl:env.bool('DATABASE_SSL',false),

        },
      },

});
