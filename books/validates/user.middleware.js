

module.exports.validateCreate = function (req, res, next) {
    var errors = [];
    if (req.body.name.length > 30) {
        errors.push("The name is too long to be available");
        return;
    }
    if (errors.length) {
        res.render('./users/createuser.pug', {
            errors: errors,
            values: req.body
        })
        return;
    }

    next();
}