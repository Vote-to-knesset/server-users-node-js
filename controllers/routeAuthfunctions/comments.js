import { getOneUser } from "../../db/controller/functionsDBUser.js";
import jwt from "jsonwebtoken";
import User from '../../db/modules/usermodule.js';
import {BillComments} from '../../db/modules/billsModule.js';
import axios from 'axios';


 const getDiscussions = async (req, res) => {
    const { billId } = req.query;
  console.log(billId);
    try {
      const bill = await BillComments.findOne({ billId: billId });
      if (!bill) {
        return res.status(404).json({ message: 'Bill not found.' });
      }
  
      res.status(200).send({comments : bill.discussions});
    } catch (error) {
      res.status(500).json({ message: 'Error fetching discussions.', error: error.message });
    }
  };

const setDiscussion = async (req, res) => {
    const { billId, discussionTitle } = req.body;
    try {
      let bill = await BillComments.findOne({ billId: billId });


      if (!bill) {
        bill = await BillComments.create({ billId: billId });

        
      }
      if (!bill.discussions) {
        bill.discussions = []; 
    }
      let targetDiscussion = bill.discussions.find(
        (item) => item.title === discussionTitle
      );
      if (!targetDiscussion) {
        targetDiscussion = {
          title: discussionTitle,
          comments: [],
        };

        bill.discussions.push(targetDiscussion);
        await bill.save();
        res.status(200).send({ message: 'Discussion created successfully.' });
      } else {
        res.status(400).send({ message: 'Discussion with this title already exists.' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error creating discussion.', error: error.message });
    }
  };
  

  const setComment = async (req, res) => {
    const { billId, discussionTitle, commentText } = req.body;
  
  
    try {
      let bill = await BillComments.findOne({ billId: billId });
  
      if (!bill) {
        return res.status(404).send({ message: 'Bill not found.' });
      }
  
      let targetDiscussion = bill.discussions.find(
        (item) => item.title === discussionTitle
      );
      
  
      if (!targetDiscussion) {
        return res.status(404).send({ message: 'Discussion not found.' });
      }
  
      const newComment = {
        text: commentText,
        timestamp: new Date(),
        like: 0,
      };
  
      targetDiscussion.comments.push(newComment);
 
      await bill.save();
      res.status(200).send({ message: 'Comment added successfully.' });
    } catch (error) {
      res.status(500).send({ message: 'Error adding comment.', error: error.message });
    }
  };
  
  export { setDiscussion, setComment, getDiscussions };
  