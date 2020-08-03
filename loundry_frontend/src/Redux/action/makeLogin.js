const axios = require('axios');
export const makeLogin=(state)=>{
    return (dispatch)=>{
        const result = axios.post(`http://localhost:8080/user/signin`,state);
            result
              .then((response)=>{  
              console.log(response);           
                if(response.data.message)
                {  
                  console.log('inside response if',response.data.message);   
                  dispatch(sendMassage(response.data.message))          
                  
                }
                else{
                  let {token,...user} = response.data;
                  localStorage.setItem("token", token)
                  dispatch(loginUser(user));
                }  
              })
              .catch((error)=>{
                console.log(error);
              })
    }
}
const loginUser = (obj)=>({
      type: "login_user",
      payload : obj
})
const sendMassage= (obj)=>({
  type: "login_message",
  payload : obj
})

