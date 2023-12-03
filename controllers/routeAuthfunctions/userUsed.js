import { getOneUser } from "../../db/controller/functionsDBUser.js"; 

const userNameFunction = async (req, res) => {
  // get the userName.
  const {username} = req.body;
  // check if the username is in the DB.
  try {
    let user = await getOneUser({ userName: username });
    if (!user) {
      return res.status(200).json({ msg: "Not exist" });
    } else {
      return res.status(400).json({ msg: "exist" });
    }
  } catch (error) {
    return res.status(200).json({ msg: "Not exist" });
  }
};

export default userNameFunction;
