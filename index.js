// Require all Hapi dependencies for the project
const Path = require('path'),
  Hapi = require('hapi'),
  Hoek = require('hoek');

// Create the server
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({ port: process.env.PORT || 3000, host: 'localhost' });

// Register the view
server.register([require('vision'), require('inert')], (err) => {
  // Check errors
  Hoek.assert(!err, err);
  // Configure Handlebars as the template system
  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates',
    layout: true,
    layoutPath: Path.join(__dirname, 'templates/layout')
  });

  // GET /css/styles.css
  server.route({
    method: 'GET',
    path: '/css/styles.css',
    handler: function (_req, reply) {
      reply.file('css/styles.css');
    }
  });

  // GET /
  server.route({
    method: 'GET',
    path: '/',
    handler: (_req, reply) => {
      reply.view('index', { title: 'Hello PReview!' })
    }
  });
});

// Initialize the server
server.start(err => {
  // Check errors
  Hoek.assert(!err, err);
  console.log('Server running at:', server.info.uri);
});
