
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Demo using jQuery pub sub and socket.io' })
};