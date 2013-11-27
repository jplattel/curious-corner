
// Local server setup for API
var fs = require('fs');
var express = require('express'); // Framework 
var swig = require('swig');

// Setup render engine
var web = express(); // Setup app and configure
web.engine('html', swig.renderFile);
web.set('view engine', 'html');

// Configure views dir
web.set('views', __dirname + '/views');

// Configure static dir
web.use(express.static(__dirname + '/static'));

// Serving homepage
web.get('/', function(req, res){

	// Get all URLs
	var data = fs.readFileSync('/Volumes/Oneirology/Projects/curious-corner/urls.txt','utf8').split('\r\n')
	data.pop() // Pop the last one as it's empty

	// Loop trough URLs to create objects.
	// TODO: Why not save as objects to skip this?
	urls = []
	for (var i = data.length - 1; i >= 0; i--) {
		var d = data[i].split('\t');
		urls.push({'url': d[0], 'title': d[1]});
	};

	// Render index template with URLs
	res.render('index', { 'urls': urls });
});

// Adding a URL by bookmarklet
web.get('/add/:url/:title', function(req, res) {
	var u = req.params.url
	var title = req.params.title
	console.log('Saving: ' + title);

	// Save to file, if succesfull redirect
	fs.appendFile('/Volumes/Oneirology/Projects/curious-corner/history.txt', u + '\r\n');
	fs.appendFile('/Volumes/Oneirology/Projects/curious-corner/urls.txt', u + '\t'+ title + '\r\n', function (err) {
	 	if (err) throw err;
		res.redirect('/'); // Redirect to managing page, might change this around later, for editing purposes
	});
});

// Adding manually
// TODO
web.get('/add_url', function(req, res) {
	
	// Process form when submitted on the same page
	// TODO

	console.log('Saving: ' + title);
	// Save to file, if succesfull redirect
	fs.appendFile('history.txt', u + '\r\n');
	fs.appendFile('urls.txt', u + '\t'+ title + '\r\n', function (err) {
	 	if (err) throw err;
		res.redirect('/add_url'); // Redirect to adding page for adding another link
	});
});


// Starting function
web.listen(9191);
console.log('Listening on: http://localhost:9191/');