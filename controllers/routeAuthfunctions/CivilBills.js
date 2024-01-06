import { getOneUser } from "../../db/controller/functionsDBUser.js";
import CivilBills from "../../db/modules/civilBillsModule.js";
import bcrypt from 'bcryptjs'

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

  const setCivilBillVote = async (req, res) => {
    try {
      const { userName, billId , vote} = req.body;
  
      let user = await getOneUser({ userName: userName });
  
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      const civilBill = await CivilBills.findOne({billId:billId})
      const hasheUser = await bcrypt.hash(userName, 10);

      if (!civilBill) {
        return res.status(404).send({ message: "Civil bill not found." });
      }

      if (vote == "against"){
        civilBill.votesAgainst.push(hasheUser)
      }
      else{
        civilBill.votesInFavor.push(hasheUser)
      }
      
      await civilBill.save()

     
  
      res.status(200).send({ data: "submit vote" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error vote civil bill." });
    }
  };

export {getAllCivilBills, setCivilBill,setCivilBillVote};
