var mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = mongoose.Schema({

    username: { type: String, unique: true, required: true },
    hashedUsername: { type: String, default: "" },
    title: { type: String, default: "" },
    ext: { type: String, default: "" },
    email: { type: String, required: true },

    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },

    phoneNumber: { type: String, default: "" },
    sysRole: [{
        appSys: { type: String, default: "" },
        role: { type: String, default: "" },
        org: [{
            orgId: { type: String, default: "" },
            IsActive: { type: Boolean },
            program: [{
                programId: { type: ObjectId, ref: "program" },
                programCode: { type: String, default: "" },
                template: [{
                    templateTypeId: { type: ObjectId, ref: "templateType" },
                    templateCode: { type: String, default: "" },
                }]
            }]
        }]
    }],

    startDate: { type: Date, default: Date.now, required: true },
    endDate: { type: Date, default: Date.now, required: true },
    IsActive: { type: Boolean, required: true, default: true }

}, { collection: 'User' });

module.exports = mongoose.model('User', userSchema);
