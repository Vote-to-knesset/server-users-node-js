import {
  getOneEmail,
  updeteOneEmail,
} from "../../db/controller/functionsDBEmails.js";

const verifyEmailFunction = async (req, res) => {
  const { email, code } = req.body;
  const userEmail = getOneEmail({ email: email, "verifyEmail.value": code });
  if (!userEmail) {
    return res.status(401).json({
      msg: "one of the informtion is wong",
    });
  }
  const updateEmail = updeteOneEmail(email, { "verifyEmail.verify": true });
  if (updateEmail == true) {
    return res.status(200).json({
      msg: "the email is verify",
    });
  } else {
    return res.status(401).json({
      msg: "erorr",
    });
  }
};
export default verifyEmailFunction;
