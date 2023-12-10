import { getOneEmail,addOneEmail } from "../../db/controller/functionsDBEmails.js";
import calculateDateDifference from "../../functions/calculateDateDifference.js";
import { addOneUser } from "../../db/controller/functionsDBUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const googleLogin = async (req, res) => {
  try {
    const googleToken = req.headers.authorization;
    console.log(googleToken,"efr");
    if (!googleToken)
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });
    const decodedToken = jwt.decode(googleToken);

    const { email, name } = decodedToken;
    const emailUser = await getOneEmail({
      email: email,
    });
    if (emailUser) {
      const token = jwt.sign(
        {
          userName:name,
        },
        process.env.SECRET_KEY_TOKEN,
        {
          expiresIn: 3600000,
        }
      );

      res.status(200).json({
        token: token,
      });
    } else {
      const userSave = await addOneEmail({
        email: email,
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
    }
  } catch (error) {
    console.log(error);
  }
};
const signupWithGoogle = async (req, res) => {

    try{
  const { email, userName, party, identity, gender } = req.body;
  console.log(req.body);

  const emailUser = await getOneEmail({
    email: email,
  });

  if (!emailUser) {
    return res.status(401).json({
      msg: "one of the informtion is wrong",
    });
  }
  let user = await getOneUser({ userName: userName });

  if (user){
    userName += "o"
  }
  const addUser = await addOneUser({
    userName: userName,
    password: "",
    date: new Date(),
    party: party,
    identity: identity,
    gender: gender,
  });
  const token = jwt.sign(
    {
      userName,
    },
    process.env.SECRET_KEY_TOKEN,
    {
      expiresIn: 3600000,
    }
  );
  if (addUser == true) {
    return res.status(200).json({token
        ,
      msg: "the user is added",
    });
  } else {
    return res.status(401).json({
      msg: "erorr",
    });
  }}
  catch(error){
    console.log(error);
  }
};

export {signupWithGoogle,googleLogin}