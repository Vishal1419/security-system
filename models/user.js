const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  mobile_no: {type: String, required: true},
  licenses: [{type: Schema.Types.ObjectId, ref: 'License'}]
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getAll = (callback) => {
  User.find().sort('name').populate('licenses').exec((err, users) => {
    if (err) return callback(err, null);
    callback(null, users);
  });
};
  
module.exports.getById = (id, callback) => {
  User.findById(id, (err, user) => {
    if(err) return callback(err, null);
    callback(null, user);
  });
};

module.exports.getByName = (name, callback) => {
  User.find({name: new RegExp('^'+name+'$', "i")}).sort('name').populate('licenses').exec((err, users) => {
    if(err) return callback(err, null);
    callback(null, users);
  });
};

module.exports.getByMobileNo = (mobile, callback) => {
  User.find({mobile_no: new RegExp('^'+mobile+'$', "i")}).sort('mobile_no').populate('licenses').exec((err, mobiles) => {
    if(err) return callback(err, null);
    callback(null, mobiles);
  });
};

module.exports.getByKey = (key, callback) => {
  User.find().populate('licenses').exec((err, users) => {
  if(err) {
    return callback(err);
  }
  users.some((user) => {
    return user.licenses.some((license) => {
      if(license.key == key) {
        callback(null, user);
        return true;
      }
    }, this);
  }, this);
  // return callback({error: "Invalid Key"});
	});
}

module.exports.createUser = (user, callback) => {
  const newUser = new User(user)
  newUser.save(callback);                
};

module.exports.updateUser = (user, callback) => {
  User.update(
    {"_id": user._id},
    {
      "$set": {
        "name": user.name, 
        "mobile_no": user.mobile_no, 
        "licenses": user.licenses
      }
    },
    {multi: false},
    callback
  );
};

//delete user will be added if needed as it looks challenging.
//if it will be added then it will active and deactive a key instead of deleting it.
//If a record is deleted then we will not get exact sold and updated number of copies.
