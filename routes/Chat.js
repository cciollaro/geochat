exports.index = function(req, res){
	res.render('home.ejs', {title: 'geochat'});
};

exports.chat=function(req,res){
	console.log('chat happening');
	console.log('user_id: ' + req.session.user_id)
	if(!req.session.user_id){
		res.redirect('/');
	} else {
		res.render('chat.ejs');
	}
}
