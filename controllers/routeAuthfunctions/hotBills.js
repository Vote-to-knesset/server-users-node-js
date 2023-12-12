import Bills from "../../db/modules/billsModule.js";
import mongoose from "mongoose";
import axios from 'axios';



export const getHotBills = async (req, res) => {
  try {
    const hotBills = await Bills.aggregate([
      {
        $project: {
          billId: 1,
          votesInFavorCount: { $size: "$votesInFavor" },
          votesAgainstCount: { $size: "$votesAgainst" },
        },
      },
      {
        $sort: {
          votesInFavorCount: -1,
          votesAgainstCount: -1,
        },
      },
      {
        $limit: 3,
      },
    ]);

    const billIds = hotBills.map((bill) => bill.billId);
    console.log(billIds);
    const data = {bills: billIds}


    const response = await axios.post(
        "https://kns-data-votes.onrender.com/api/data_bills/by_id",
       data
      );


    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
