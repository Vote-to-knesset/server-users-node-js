
import { getOneUser } from "../../db/controller/functionsDBUser.js";



const getSelctedBills = async (req, res) => {

    const { userName} = req.body
    console.log(userName);
try{
    let user = await getOneUser({ userName: userName });
    
    if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }
  

    let selectedBills = user.billsVote
    console.log(selectedBills);

    res.status(200).send({ data:selectedBills });


}
catch(error){
    console.log(error);

}


}

export default getSelctedBills ;