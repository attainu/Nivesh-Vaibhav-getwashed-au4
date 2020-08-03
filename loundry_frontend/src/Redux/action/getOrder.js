const axios = require('axios');
export const getOrder=(id)=>
{
   return async(dispatch)=>{
    const token = localStorage.token;
    
     if (token){
      console.log('inside if',id);
      let result =  await axios.get(`http://localhost:8080/order/read/user/${id}`,{
          headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'authorization': `${token}`
        }
      }); 
    result
      .then((response)=>{       
        if(response.data.message){
             localStorage.removeItem("token");
        }
        else{
          console.log('inside else');
            dispatch(makeOrder(response.data))
        }})
        
      .catch((error)=>{ console.log(error)})
  }
}   
}
const makeOrder=(obj)=>({
  type:"fetch_user",
  payload:obj
})

