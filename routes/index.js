
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' }, function (err, data) {
    if (!err) {
      res.write (data);
      res.end ();
    } else {
      console.log (err);
    }
  });
};
