module.exports = function(app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  User.observe('after save', function setDefaultUsername(ctx, next) {
    if (ctx.instance) {
      if (ctx.isNewInstance) {
        var userRole = ctx.instance.city && ctx.instance.city.trim() != '' ? 'admin' : 'user';
        Role.findOne({where: {name: userRole}}, function(err, role) {
          if (err) {
            return console.log(err);
          }
          RoleMapping.create({
            principalType: RoleMapping.USER,
            principalId: ctx.instance.id,
            roleId: role.id
          }, function(err, roleMapping) {
            if (err) {
              return console.log(err);
            }
          });
        });
      }
    }
    next();
  });
};