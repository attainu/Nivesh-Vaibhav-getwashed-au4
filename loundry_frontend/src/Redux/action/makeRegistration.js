const axios = require('axios');

const  makeRegistration=(state)=>{
  console.log('inside reg function');
    return (dispatch)=>{
      console.log('inside reg func')
      const result = axios.post('http://localhost:8080/user/signup',state);
      result
        .then((response)=>{ console.log('inside then'); 
                            dispatch(register(response.data.message)) })
        .catch((error)=>{console.log(error);})
    }  
} 
const register=(obj)=>({
  type: 'make_registration',
  payload : obj
})

module.exports = makeRegistration;