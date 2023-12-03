import {
  getOneEmail,
  updeteOneEmail,
} from "../../db/controller/functionsDBEmails.js";

const verifyEmailFunction = async (req, res) => {
  try{
  const { email, code } = req.body;


  const userEmail = await getOneEmail({ email: email});
  console.log(userEmail);


  if (!userEmail) {
    return res.status(401).json({
      msg: "one of the informtion is wong",
    });
  }

  if (userEmail.verifyEmail.value !== code){
    return res.status(401).json({
      msg: "one of the informtion is wong",
    });

  }
  
  const updateEmail = await updeteOneEmail(email, { "verifyEmail.verify": true });
  if (updateEmail == true) {
    return res.status(200).json({
      msg: "the email is verify",
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
export default verifyEmailFunction;
