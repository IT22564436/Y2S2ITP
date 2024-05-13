const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const L_RequestSchema = new Schema({
  EmpID: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Contact: {
    type: Number,
    required: true,
  },

  Destination: {
    type: String,
    required: true,
  },

  LDateF: {
    type: Date,
    required: true,
  },

  LdateT: {
    type: Date,
    required: true,
  },

  LType: {
    type: String,
    required: true,
  },

  Lduration: {
    type: String,
  },

  attachments: {
    type: Object,
  },

  remarks: {
    type: String,
  },

  //supervisor
  Sup_name: {
    type: String,
  },

  Sup_des: {
    type: String,
  },

  //employee who cover his part
  Backup: {
    type: String,
  },
  Status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

const L_Request = mongoose.model("L_Request", L_RequestSchema);
module.exports = L_Request;