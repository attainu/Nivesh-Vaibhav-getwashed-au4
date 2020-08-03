export const bookOrder=(id)=>{
    console.log(id);
return (dispatch)=>{
    try {
            dispatch(order(id));
    } catch (error) {
        console.log(error);
    }
}
}
const order=(id)=>({
    type:"book_order",
    payload : id
})

// dispatch function for add Cloth to order
export const addCloth=(item,action)=>{
    return (dispatch)=>{
        try{
            dispatch(cloth(item,action));
        }catch(error){
            console.log(error);
        }   
    }
}
const cloth=(product,action)=>({
    type: "add_cloth",
    payload : product,
    payloadAction : action
})
//dispatch function for change date
export const selectDate = (date)=>{
return (dispatch)=>{
        try{
            dispatch(setDate(date));
        }catch(error){
            console.log(error)
        }
    }
}
const setDate=(date)=>({
    type: 'select_date',
    payload: date
})
// dispatch function for change actionType
export const action = (actionType)=>{
    return (dispatch)=>{
    try {
            dispatch(takeAaction(actionType));
    } catch (error) {
        console.log(error);
    }
}}
const takeAaction=(obj)=>({
    type:"change_action",
    payload: obj
})

// dispact function for change time slote
export const timeSloat = (timesloat)=>{
    return (dispatch)=>{
    try {
       
            dispatch(changeTimeSloat(timesloat));
    } catch (error) {
        console.log(error);
    }
}}
const changeTimeSloat=(obj)=>({
    type:"change_time",
    payload: obj
});
 
//Dispatch Function for edit [ADD] item quantity
export const addItemQuantity =(index)=>{
    return (dispatch)=>{
        try {
            console.log('inside dispatch');
            dispatch(addQuantity(index))
        } catch (error) {
            console.log(error);
        }
    }
}
const addQuantity=(index)=>({
    type : 'addQuantity',
    payload : index
})

// Dispatch Function for remove item Quantity
export const removeItemQuantity=(index)=>{
    return (dispatch)=>{
        try {
            dispatch(removeQuantity(index));
        } catch (error) {
            console.log(error);
        }
    }
}
const removeQuantity=(index)=>({
    type : 'removeQuantity',
    payload : index
})

// dispatch function for remove item from Cart
export const removeItem=(index)=>{
    return (dispatch)=>{
        try {
            console.log('inside dispatch');
            dispatch(removeOrderItem(index));
        } catch (error) {
            console.log(error);
        }
    }
}
const removeOrderItem=(index)=>({
    type : 'removeItem',
    payload : index
})

export const selectSameAddress=(address)=>{
   
    return (dispatch)=>{
        try {
            
            dispatch(sendsameAddress(address))
        } catch (error) {
            console.log(error);
        }
    }
}
const sendsameAddress=(address)=>({
       type : "selectAddressForOrder",
    payload :address
});

export const selectNewAddress=(obj)=>{
    return (dispatch)=>{
        try {
           
            dispatch(sendNewAddress(obj));
        } catch (error) {
            console.log(error);
        }
    }
}
const sendNewAddress=(obj)=>({
    type : "selectNewAddressForOrder",
    payload : obj
});

export const selectedPaymentMode =(mode)=>{
    
    return (dispatch)=>{
        try{
            dispatch(sendPaymentMode(mode));
        }
        catch(error){
            console.log(error);
        }
    }
} 
const sendPaymentMode =(obj)=>({
    type : "paymentMode",
    payload : obj
})

