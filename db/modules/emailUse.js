import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: {
    type: string,
    require: true,
    unique: true,
  },
});

const Emails = mongoose.model("Emails", emailSchema);
export default Emails;
