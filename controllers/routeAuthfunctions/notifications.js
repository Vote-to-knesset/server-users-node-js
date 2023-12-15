import { getOneUser } from "../../db/controller/functionsDBUser.js";
import Bills from "../../db/modules/billsModule.js";
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
    let userVote = await Bills.find({ billId: { $in: userVotes } });

    let notes = laws.filter((bill) => userVotes.includes(bill.FK_ItemID));
    console.log(notes);

    

    userVote.forEach((vote) => {
        let note = notes.find((n) => n.FK_ItemID == vote.billId);
        
        if (note) {
            
          if (vote.votesInFavor.includes(userName)){
            note.userVote = "בעד"

          }
          else{
            note.userVote = "נגד"

          }
        }
      });



    res.status(200).send({ data: notes });
    


    

  } catch (error) {
    console.log(error);
  }
};
