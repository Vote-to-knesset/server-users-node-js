import {
  addOneEmail,
  getOneEmail,
} from "../../db/controller/functionsDBEmails";
import sendEmail from "../../functions/sendEmail/sendEmail";
import rundomCode from "../../functions/rundomCode";

const signupFunction = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({
      msg: "one is empty",
    });
  }
  const emailUsed = getOneEmail({ email: email, "verifyEmail.verify": true });
  if (emailUsed) {
    return res.status(401).json({
      msg: "the email is used",
    });
  }
  const rundomCodeForEmail = rundomCode;
  const emailSended = sendEmail(email, rundomCodeForEmail);
  if (!emailSended) {
    return res.status(401).json({
      msg: "erorr to send email",
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
