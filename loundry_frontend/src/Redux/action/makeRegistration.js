const axios = require('axios');

export const  makeRegistration=(state)=>{
 
    return (dispatch)=>{
     
      const result = axios.post('/user/signup',state);
      result
        .then((response)=>{ 
          console.log(response.data.message);
          dispatch(register(response.data.message)) })
        .catch((error)=>{console.log(error);})
    }  
} 
const register=(obj)=>({
  type: 'make_registration',
  payload : obj
})

