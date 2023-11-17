import bcrypt from "bcrypt";

import { getOneEmail } from "../../db/controller/functionsDBEmails";
import { addOneUser } from "../../db/controller/functionsDBUser";
import sendEmail from "../../functions/sendEmail/sendEmail";
import rundomCode from "../../functions/rundomCode";

const signupFunction = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      msg: "one is empty",
    });
  }
  const emailUsed = getOneEmail({ email: email });
  if (emailUsed) {
    return res.status(401).json({
      msg: "the email is use",
    });
  }
  const emailSended = sendEmail(email,rundomCode)
  let hashePassword = await bcrypt.hash(password, 10);
  const userSave = await addOneUser({
    userName: email,
    password: hashePassword,
  });
};

export default signupFunction;
