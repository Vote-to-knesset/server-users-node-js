import User from "../modules/usermodule";


export async function addOneUser(objectUser) {
    // creat a object to add to do DB.
    const addUser = new User(objectUser);
  
    try {
      let responsAddUser = await addUser.save();
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  
  export async function allDB() {
    try {
      const allUsers = await User.find({});
      console.log(allUsers);
      return allUsers;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  
  export async function getOneUser(objectUser) {
    try {
      return await User.findOne(objectUser);
    } catch (error) {
      return undefined;
    }
  }
  
  export async function updeteOneUser(userName, objectUpdate) {
    try {
      const resDB = await User.updateOne({ userName: userName }, { $set: objectUpdate });
      return true
    } catch (error) {
      return false
    }
  }
  