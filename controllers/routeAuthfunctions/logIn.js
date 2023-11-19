import { getOneUser } from "../../db/controller/functionsDBUser.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const loginFunction = async (req, res) => {
  // get the user name and the password.
  const { userName, password } = req.body.sendData;
  // check if the user is in the DB.
  let user = await getOneUser({ userName: userName });
  // if it's empty it's send a erorr.
  if (!userName) {
    return res.status(400).json({
      errors: {
        msg: "Invalid Credentials",
      },
    });
  }
  // check if the password is corecct.
  let corectPassword = await bcrypt.compare(password, user.password);
  // if it's not a corect password it's send a eroor.
  if (!corectPassword) {
    return res.status(400).json({
      errors: {
        msg: "Invalid Credentials",
      },
    });
  }

  const sendInformtionUser = {
    id: user._id,
    billsVote: user.billsVote,
    gender: user.gender,
    identity: user.identity,
    party: user.party,
    userName: user.userName,
  };
  // creat a token with the email inside.
  const token = JWT.sign(
    {
      userName,
    },
    process.env.SICRET_KEY_TOKEN,
    {
      expiresIn: 3600000,
    }
  );
  // send the token.
  res.status(200).json({
    token: token,
    user: sendInformtionUser,
  });
};

export default loginFunction;
