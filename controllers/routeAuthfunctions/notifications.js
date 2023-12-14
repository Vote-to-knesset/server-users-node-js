import { getOneUser } from "../../db/controller/functionsDBUser.js";
import axios from "axios";

export const getNotifications = async (req, res) => {
  try {
    const { userName } = req.body;

    let user = await getOneUser({ userName: userName });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const response = await axios.get(
      "https://kns-data-votes.onrender.com/api/data_laws"
    );

    let laws = response.data
    let userVotes = user.billsVote


    let notes = laws.filter((bill) => userVotes.includes(bill.FK_ItemID));
    console.log(notes.length);

    res.status(200).send({ data: notes });
    


    

  } catch (error) {
    console.log(error);
  }
};
