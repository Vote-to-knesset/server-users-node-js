import { getOneUser } from "../../db/controller/functionsDBUser.js";
import jwt from "jsonwebtoken";
import User from '../../db/modules/usermodule.js';
import Bills from '../../db/modules/billsModule.js';
import axios from 'axios';


function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token.split(' ')[1], process.env.SECRET_KEY_TOKEN, (err, decoded) => {
    if (err) {
        console.log(err);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ auth: false, message: 'Token expired.' });
      }
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    req.body.userName = decoded.userName;
    
    next();
  });
}

function verifyUser(req, res) {
    const token = req.headers.authorization;
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token.split(' ')[1], process.env.SECRET_KEY_TOKEN, (err, decoded) => {
      if (err) {
          console.log(err);
        if (err.name === 'TokenExpiredError') {
          return res.status(401).send({ auth: false, message: 'Token expired.' });
        }
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
  
      return res.status(200).send({ auth: true, message: 'find user.' });

    });
  }

const submitVoteFunction = async (req, res) => {
  const { userName, billId, vote } = req.body;

  try {
    console.log(userName);
    let user = await getOneUser({ userName: userName });

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    let bill = await Bills.findOne({ billId: billId });

    if (!bill) {
      bill = await Bills.create({ billId: billId });
    }

    if (user.billsVote.includes(billId)) {
      return res.status(403).send({ auth: false, message: 'You have already voted on this bill.' });
    }
    let userParty = user.party
    if (vote === 'in_favor') {
      bill.votesInFavor.push(userName);
      userParty = userParty + '_For'
    } else if (vote === 'against') {
      bill.votesAgainst.push(userName);
      userParty = userParty + '_Against'
    }

    await bill.save();

    user.billsVote.push(billId);
    await User.findOneAndUpdate({ userName: userName }, { billsVote: user.billsVote });

    const dataToUpdate = {
        BillID: billId,
        choice: vote , 
        party:userParty,
      
      };

    const pythonServerUrl = 'https://kns-data-votes.onrender.com/api/update_data'; 
    await axios.post(pythonServerUrl, dataToUpdate, {
      headers: {
        Authorization: process.env.SECRET_API_KEY
      }
    });

    res.status(200).send({ message: 'Vote submitted successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Error submitting vote.', error: error.message });
  }
};

export { verifyToken, submitVoteFunction, verifyUser };
