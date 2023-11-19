import {
  addOneEmail,
  getOneEmail,
  updeteOneEmail,
} from "../../db/controller/functionsDBEmails.js";
import sendEmail from "../../functions/sendEmail/sendEmail.js";
import rundomCode from "../../functions/rundomCode.js";

const signupFunction = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({
      msg: "one is empty",
    });
  }
  const emailUsed = await getOneEmail({ email: email });
  if (emailUsed && emailUsed.verifyEmail.verify == true) {
    return res.status(401).json({
      msg: "the email is used",
    });
  }

  const rundomCodeForEmail = rundomCode;
  const emailSended = await sendEmail(email, rundomCodeForEmail);
  if (!emailSended) {
    return res.status(401).json({
      msg: "erorr to send email",
    });
  }
  if (emailUsed && emailUsed.verifyEmail.verify == false) {
    const updateUser = await updeteOneEmail(email, {
      "verifyEmail.value": rundomCodeForEmail,
      "verifyEmail.date": new Date(),
    });
    if (updateUser == false) {
      return res.status(401).json({
        msg: "erorr DB",
      });
    }
    return res.status(200).json({
      msg: "the email is save",
    });
  }
  const userSave = await addOneEmail({
    email: email,
    "verifyEmail.value": rundomCodeForEmail,
  });
  if (userSave == true) {
    return res.status(200).json({
      msg: "the email is save",
    });
  } else {
    return res.status(401).json({
      msg: "erorr",
    });
  }
};

export default signupFunction;
