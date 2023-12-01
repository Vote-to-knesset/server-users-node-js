import { getOneUser } from "../../db/controller/functionsDBUser.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";




const loginFunction = async (req, res) => {
  // get the user name and the password.
  const { userName, password } = req.body;
  // check if the user is in the DB.
  let user = await getOneUser({ userName: userName });
  // if it's empty it's send a erorr.
  console.log(userName);
  if (!user) {
    return res.status(400).json({
      errors: {
        msg: "Invalid Credentials",
      },
    });
  }
  let corectPassword = await bcrypt.compare(  password,user.password);
  console.log(corectPassword);
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
  
  const token = JWT.sign(
    {
      userName,
    },
    process.env.SECRET_KEY_TOKEN,
    {
      expiresIn: 3600000,
    }
  );
  
  res.status(200).json({
    token: token,
    user: sendInformtionUser,
  });
};

export default loginFunction;
