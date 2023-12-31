import { getOneUser } from "../../db/controller/functionsDBUser.js";
import CivilBills from "../../db/modules/civilBillsModule.js";
import axios from "axios";
import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

 const setCivilBill = async (req, res) => {
  try {
    const { userName, name, summery , date} = req.body;

    let user = await getOneUser({ userName: userName });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const billId = uuidv4(); 

    const newCivilBill = new CivilBills({
      billId: billId,

      name: name,
      summery: summery,
      parson: userName,
      date: date, 
      votesInFavor: [],
      votesAgainst: [],
    });

    await newCivilBill.save();

    res.status(200).send({ data: newCivilBill });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating civil bill." });
  }
};
 const getAllCivilBills = async (req, res) => {
    try {
      const allCivilBills = await CivilBills.find({});
  
      res.status(200).send({ data: allCivilBills });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error fetching all civil bills." });
    }
  };

export {getAllCivilBills, setCivilBill};
