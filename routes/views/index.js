var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'home';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};
	
	// Load other posts
	view.on('init', function(next) {
		
		var q = keystone.list('Post').model.find()
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author');
		
		q.exec(function(err, results) {
			locals.data.posts = results;
			console.log('locals.data.posts = results;', locals.data.posts);
			next(err);
		});
	});
	
	// Render the view
	view.render('index');
	
};
