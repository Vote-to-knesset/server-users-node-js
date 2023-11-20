import { getOneEmail } from "../../db/controller/functionsDBEmails.js";
import calculateDateDifference from "../../functions/calculateDateDifference.js";
import { addOneUser } from "../../db/controller/functionsDBUser.js";
import bcrypt from 'bcrypt'
const signupUserFunction = async (req, res) => {
  const { emailCode, email, userName, password, party, identity, gender } =
    req.body;
    console.log(req.body);
  if (
    !emailCode ||
    !email ||
    !userName ||
    !password ||
    !party ||
    !identity ||
    !gender
  ) {
    return res.status(401).json({
      msg: "one is empty",
    });
  }
  const emailUser = await getOneEmail({
    email: email,
    "verifyEmail.value": emailCode,
  });
  console.log(emailUser);
  if (!emailUser) {
    return res.status(401).json({
      msg: "one of the informtion is wrong",
    });
  }
  const time = calculateDateDifference(emailUser.verifyEmail.date, new Date());
  if (time.hours > 0 || time.minutes > 10) {
    return res.status(401).json({
      msg: "time is over",
    });
  }
  let hashePassword = await bcrypt.hash(password, 10);
  const addUser = await addOneUser({
    userName: userName,
    password: hashePassword,
    date: new Date(),
    party: party,
    identity: identity,
    gender: gender,
  });

  if (addUser == true) {
    return res.status(200).json({
      msg: "the user is added",
    });
  } else {
    return res.status(401).json({
      msg: "erorr",
    });
  }
};

export default signupUserFunction;
