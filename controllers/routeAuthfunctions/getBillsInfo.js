import { getOneUser } from "../../db/controller/functionsDBUser.js";

const setHoverBills = async (req, res) => {
  const { userName, hoveredBill } = req.body;
  try {
    const user = await getOneUser({ userName: userName });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    user.billsHover.push(hoveredBill);

    await user.save();

    return res.status(200).send({ message: "Bills hovered successfully." });
  } catch (error) {
    console.error("Error in setHoverBills:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};



const getSelctedBills = async (req, res) => {
  const { userName } = req.body;
  try {
    let user = await getOneUser({ userName: userName });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    let selectedBills = user.billsVote;
    const hoverbills = user.billsHover || []
    const selectedHoverBills = [selectedBills,hoverbills]

    res.status(200).send({ data: selectedHoverBills });
  } catch (error) {
    console.log(error);
  }
};

export  {getSelctedBills,setHoverBills}
