var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 3000));

// app.use('/', express.static(__dirname));
// app.use('/', express.static(__dirname + '/public'));
app.use('/', express.static(path.resolve('../../public')));
// app.use(express.static(path.join(__dirname, 'public')))
// app.get('/', function (req, res) {
//   res.send('root');
// });

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
