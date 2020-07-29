//Install express server
const express = require('express');
const path = require('path');

const app = express();
const forceSSL = function () {
    return function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'http') {
        return res.redirect(
          ['http://', req.get('Host'), req.url].join('')
        );
      }
      next();
    }
  };
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/index.html'));
});
app.use(forceSSL());
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);