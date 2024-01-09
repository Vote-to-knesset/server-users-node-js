import { getOneUser } from "../../db/controller/functionsDBUser.js"; 

const userNameFunction = async (req, res) => {
  const {username} = req.body;
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
