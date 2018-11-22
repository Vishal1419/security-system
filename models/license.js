const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const licenseSchema = new Schema({
  key: {type: String, required: true},
  hdd: {type: String, required: false},
  is_used: {type: Boolean, required: true},
  updated_times: {type: Number, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
});

const License = module.exports = mongoose.model('License', licenseSchema);

module.exports.getAll = (callback) => {
  License.find().populate('user').exec((err, licenses) => {
    if (err) return callback(err, null);
    callback(null, licenses);
  });
};

module.exports.getUsed = (callback) => {
  License.find({is_used: true}).populate('user').exec((err, licenses) => {
    if (err) return callback(err, null);
    callback(null, licenses);
  });
};

module.exports.getUnused = (callback) => {
  License.find({is_used: false}).exec((err, licenses) => {
    if (err) return callback(err, null);
    callback(null, licenses);
  });
};

module.exports.getUpdated = (callback) => {
  License.find({updated_times: { $gt : 0 }}).populate('user').exec((err, licenses) => {
    if (err) return callback(err, null);
    callback(null, licenses);
  });
};

module.exports.getById = (id, callback) => {
  License.findById(id).populate('user').exec((err, license) => {
    if(err) return callback(err, null);
    callback(null, license);
  });
};

module.exports.getByKey = (key, callback) => {
  License.find({key: new RegExp('^'+key+'$', "i")}).populate('user').exec((err, licenses) => {
    if(err) return callback(err, null);
    callback(null, licenses);
  });
};

module.exports.getUnusedLicenseCount = (callback) => {
  License.count({is_used: false}, (err, count) => {
    if(err) return callback(err, null);
    callback(null, count);
  });
}

module.exports.getDuplicateGeneratedLicenses = (generatedLicenses, callback) => {
  License.find({key: { $in: generatedLicenses.map(o => o.key) }}, (err, foundLicenses) => {
    if(err) return callback(err, null);
    callback(null, foundLicenses);
  });
}

module.exports.createLic = (newLicense, callback) => {
  newLicense.save(callback);
};

module.exports.bulkCreateLic = (licenses, callback) => {
  License.collection.insertMany(licenses, (err, result) => {
    if(err) return callback(err);
    callback(null, result);
  });
}

module.exports.updateLic = (license, callback) => {
  License.update(
    {"_id": license._id},
    {
      "$set": {
        "key": license.key, 
        "hdd": license.hdd,
        "is_used": license.is_used,
        "updated_times": license.updated_times,
        "user": license.user,
      }
    },
    {multi: false},
    callback
  );
};

//delete license will be added if needed as it looks challenging.
//if it will be added then it will active and deactive a key instead of deleting it.
//If a record is deleted then we will not get exact sold and updated number of copies.
