import { axios } from "axios";
export const makeAdminLogin=(state)=>{

    return (dispatch)=>{
        try {
            let result = axios.post('/admin/signin',state);
            result.
                then((res)=>{
                    if(res.data.message)
                    {
                        dispatch({
                            type : "login message",
                            payload : res.data.message
                        })
                    }
                    else{
                        let { token,...admin} = res.data;
                    dispatch({
                        type : "makeAdminLogin",
                        payload : admin
                    })
                    }
                }) 
            
        } catch (error) {
            console.log(error);
        }
    }
}