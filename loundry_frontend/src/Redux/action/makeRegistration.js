const axios = require('axios');

export const  makeRegistration=(state)=>{
 
    return (dispatch)=>{
     
      const result = axios.post('http://localhost:8080/user/signup',state);
      result
        .then((response)=>{ dispatch(register(response.data.message)) })
        .catch((error)=>{console.log(error);})
    }  
} 
const register=(obj)=>({
  type: 'make_registration',
  payload : obj
})

