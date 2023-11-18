import Emails from "../modules/emailUse";


export async function addOneEmail(objectEmail) {
    // creat a object to add to do DB.
    const addEmail = new Emails(objectEmail);
  
    try {
      let responsAddEmail = await addEmail.save();
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  
  export async function allDBEamil() {
    try {
      const allEmails = await Emails.find({});
      console.log(allEmails);
      return allEmails;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  
  export async function getOneEmail(objectEmail) {
    try {
      return await Emails.findOne(objectEmail);
    } catch (error) {
      return undefined;
    }
  }
  
  