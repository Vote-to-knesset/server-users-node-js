import {
  getOneEmail,
  addOneEmail,
} from "../../db/controller/functionsDBEmails.js";
import calculateDateDifference from "../../functions/calculateDateDifference.js";
import { addOneUser, getOneUser } from "../../db/controller/functionsDBUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";


const googleLogin = async (req, res) => {
  try {
    const googleToken = req.headers.authorization;
    if (!googleToken)
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });


        const CLIENT_ID = "208654069925-gbk9o70num7emv3ugghitfhlbk675h9l.apps.googleusercontent.com";

        const client = new OAuth2Client(CLIENT_ID);
    
        const ticket = await client.verifyIdToken({
          idToken: googleToken,
          audience: CLIENT_ID,
        });
    
        const { email, name } = ticket.getPayload();
    // const decodedToken = jwt.decode(googleToken);

    // const { email, name } = decodedToken;
    const emailUser = await getOneEmail({
      email: email,
    });
    if (emailUser) {
      const token = jwt.sign(
        {
          userName: name,
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
          userName: name,
          email: email,
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
  try {
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
    console.log(user);

    if (user) {
      userName += "o";
    }
    let password =  process.env.SECRET_KEY_TOKEN
    let hashePassword = await bcrypt.hash(password, 10);

    console.log(hashePassword);

    const addUser = await addOneUser({
      userName: userName,
      password: hashePassword,

      date: new Date(),
      party: party,
      identity: identity,
      gender: gender,
    });
    console.log(addUser);
    const token = jwt.sign(
      {
        userName,
      },
      process.env.SECRET_KEY_TOKEN,
      {
        expiresIn: 3600000,
      }
    );
    console.log(token);
    if (addUser == true) {
      return res.status(200).json({ token, msg: "the user is added" });
    } else {
      return res.status(401).json({
        msg: "erorr",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { signupWithGoogle, googleLogin };
