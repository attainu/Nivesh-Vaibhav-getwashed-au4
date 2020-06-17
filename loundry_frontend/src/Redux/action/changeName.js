const axios = require('axios');
const changeName=(name)=>{
    return (dispatch)=>{
      try {
        if(name){
            dispatch(UserName('vaibhavvv'));
      }else{
        console.log('inside else');
      }
      } catch (error) {
        console.log(error);
      }
      
    }  
  }
  const UserName = (obj)=>({
    type: "change_name",
    payload : obj
});
  module.exports = changeName;