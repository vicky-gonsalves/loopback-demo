module.exports = function(app) {
  var Role = app.models.Role;
  Role.create([
      {name: 'admin'},
      {name: 'user'}]
    , function(err, role) {
      if (err) throw err;
      console.log('Created roles:', role);
    });
};