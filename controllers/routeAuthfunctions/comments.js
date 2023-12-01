import { getOneUser } from "../../db/controller/functionsDBUser.js";
import jwt from "jsonwebtoken";
import User from '../../db/modules/usermodule.js';
import {BillComments} from '../../db/modules/billsModule.js';
import axios from 'axios';


 const getDiscussions = async (req, res) => {
    const { billId } = req.query;
    try {
      const bill = await BillComments.findOne({ bill: billId });
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
      let bill = await BillComments.findOne({ bill: billId });
  
      if (!bill) {
        bill = await BillComments.create({ bill: billId });
      }
  
      const existingDiscussion = bill.discussions.find(
        (item) => item.title === discussionTitle
      );
  
      if (!existingDiscussion) {
        const newDiscussion = {
          title: discussionTitle,
          comments: [],
        };
  if (newDiscussion.title !== ""){
        bill.discussions.push(newDiscussion);
  
  
        await bill.save();
  
        return res.status(200).send({ message: 'Discussion created successfully.' });}
      } else {
        return res.status(400).send({ message: 'Discussion with this title already exists.' });
      }
    } catch (error) {

      console.error(error);
      res.status(500).send({ message: 'Error creating discussion.', error: error.message });
    }
  };

  const setComment = async (req, res) => {
    const { billId, discussionTitle, commentText } = req.body;
  
  
    try {
      let bill = await BillComments.findOne({ bill: billId });
  
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
  const addLike = async(req,res)=>{
    const { billId, discussionTitle, commentText } = req.body;
  
  
    try {
      let bill = await BillComments.findOne({ bill: billId });
  
      if (!bill) {
        return res.status(404).send({ message: 'Bill not found.' });
      }
  
      let targetDiscussion = bill.discussions.find(
        (item) => item.title === discussionTitle
      );
      
  
      if (!targetDiscussion) {
        return res.status(404).send({ message: 'Discussion not found.' });
      }
      let targetComment = targetDiscussion.find((item)=> item.commentText === commentText);
      if (!targetComment) {
        return res.status(404).send({ message: 'comment not found.' });
      }
      targetComment.like += 1

      await bill.save()
      res.status(200).send({ message: 'like added successfully.' });


  }
  catch(error){
        
  }
}
  export { setDiscussion, setComment, getDiscussions ,addLike};
  