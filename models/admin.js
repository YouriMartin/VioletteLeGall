const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const AdminSchema = new Schema({
  pseudo: String,
  password: String,
});
mongoose.model("Admin", AdminSchema);
