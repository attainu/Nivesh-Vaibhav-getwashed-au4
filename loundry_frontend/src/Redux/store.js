import {
    combineReducers,
    createStore,
    applyMiddleware
} from "redux";
import thunk from 'redux-thunk';
import ls from 'local-storage';
import localStorage from "local-storage";
const axios = require("axios");

let loginState = {
    loginUser: {

    },
    message: "",
    loginMessage: "",
    isLoggedIn: false
}
const loginReducer = (state = loginState, action) => {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {

        case 'login_user':
            stateCopy.loginUser = action.payload;
            stateCopy.isLoggedIn = true;
            console.log(stateCopy.loginUser);
            return stateCopy;

        case 'make_registration':
            stateCopy.message = action.payload;
            console.log(stateCopy.message);
            return stateCopy;

        case 'login_message':
            stateCopy.loginMessage = action.payload;
            console.log(stateCopy.message);
            return stateCopy;
        default:
            return stateCopy;
    }
}


let userOrderState = {
    items: [],
    washAction: ['Wash', 'Dry Clean', 'Iron'],
    paymentMode: ['Card', 'UPI', 'Google_pay', 'Cash_On_Delivery'],
    date: "",
    address: "",
    userSelectedActionType: "",
    timeSloat: ['9am-10am', "10am-11am", "11am-12am", "12pm-1pm", "1pm-2pm", "2pm-3pm", '3pm-4pm', '4pm-5pm', '5pm-6pm'],
    userSelectedTimeSloat: "",
    orderName: "Vaibhav",
    totalCost: 0
}


const orderReducer = (state = userOrderState, action) => {

    let totalvalue;

    let stateCopy = JSON.parse(JSON.stringify(state));
    //     console.log('items in orderReducer',stateCopy.items);

    //     let result = ls.get("LoundryCart");
    //     console.log(result);

    // if(result)
    // {
    //     if(result.Items.length>=1){
    //         console.log('result',result);
    //         stateCopy.items = result.Items;
    //         stateCopy.totalCost = result.CartTotal;
    //     }}


    switch (action.type) {

        case 'change_action':
            console.log(action.payload);
            stateCopy.userSelectedActionType = action.payload;
            return stateCopy;
        case 'select_date':
            console.log(action.payload);
            stateCopy.date = action.payload;
            return stateCopy;
        case 'change_time':
            console.log(action.payload);
            stateCopy.userSelectedTimeSloat = action.payload;
            return stateCopy;

        case 'fetch_user':

            stateCopy.order = action.payload;
            console.log(stateCopy.order);
            return stateCopy;

        case 'change_name':

            stateCopy.orderName = action.payload;
            return stateCopy;

        case 'selectAddressForOrder':
            stateCopy.address = action.payload;
            console.log(stateCopy.address);
            return stateCopy;

        case 'selectNewAddressForOrder':

            stateCopy.address = action.payload;
            return stateCopy;
        case 'paymentMode':
            stateCopy.userSelectedPaymentMode = action.payload;
            console.log(action.payload);
            return stateCopy;
        case 'book_order':
            console.log(action.payload);
            let order = {}
            let orderId = 0;
            order.order_userId = action.payload;
            order.order_date = stateCopy.date;
            order.order_collection_time = stateCopy.userSelectedTimeSloat;
            order.order_status = "Booked";
            order.order_totalprice = stateCopy.totalCost;
            order.order_paymentmode = stateCopy.userSelectedPaymentMode;

            order.order_address = stateCopy.address
            if (order.date === "") {
                alert('Please select Date For Order');
                return stateCopy;
            }
            if (order.order_collection_time === "") {
                alert('Please Select Timeslot For Order');
                return stateCopy;
            }

            let result = axios.post('http://localhost:8080/order/add', order);
            result
                .then((response) => {

                    orderId = response.data.order.id;

                    for (let item in stateCopy.items) {
                        stateCopy.items[item].order_orderId = orderId;
                    }
                 
                  
                        result = axios.post('http://localhost:8080/cloth/add', stateCopy.items);
                        result
                            .then((response) => {
                                 alert('order Placed Successfully');                
                            return stateCopy;
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    
                })
                .catch((error) => {
                    console.log(error)
                });
                stateCopy.items = [];                          
                stateCopy.totalCost = 0;
                return stateCopy;
        case 'add_cloth':
            let itemsCopy = stateCopy.items.slice();

            let {
                ...newItem
            } = action.payload;
            newItem.action = action.payloadAction;
            let total = newItem.cloth_quantity * newItem.price;
            newItem.total = total;
            stateCopy.totalCost = stateCopy.totalCost + total;

            itemsCopy.push(newItem);
            stateCopy.items = itemsCopy;
            //   console.log(stateCopy.items);
            //   ls.set('LoundryCart',{
            //       "Items": stateCopy.items,
            //       "CartTotal" : stateCopy.totalCost
            //   }); 

            return stateCopy;
        case 'addQuantity':

            let index = action.payload;
            stateCopy.items[index].cloth_quantity++;
            totalvalue = stateCopy.items[index].total + stateCopy.items[index].price;

            stateCopy.items[index].total = totalvalue;
            stateCopy.totalCost = stateCopy.totalCost + stateCopy.items[index].price;
            // stateCopy.items = itemsCopy
            //    ls.set('LoundryCart',{
            //     "Items": stateCopy.items,
            //     "CartTotal" : stateCopy.totalCost
            // });

            return stateCopy;

        case 'removeQuantity':

            let itemindex = action.payload;
            if (stateCopy.items[itemindex].cloth_quantity > 1) {
                stateCopy.items[itemindex].cloth_quantity--;
                totalvalue = stateCopy.items[itemindex].total - stateCopy.items[itemindex].price;

                stateCopy.items[itemindex].total = totalvalue;
                stateCopy.totalCost = stateCopy.totalCost - stateCopy.items[itemindex].price;
            } else
                alert('Select 1 Piece For Order')

            // ls.set('LoundryCart',{
            //     "Items": stateCopy.items,
            //     "CartTotal" : stateCopy.totalCost
            // });
            return stateCopy;


        case 'removeItem':

            let itemIndex = action.payload;
            totalvalue = stateCopy.items[itemIndex].price * stateCopy.items[itemIndex].cloth_quantity;
            stateCopy.totalCost = stateCopy.totalCost - totalvalue;
            let newItems = stateCopy.items.filter((item, itemindex) => {
                return (itemIndex !== itemindex)
            })
            stateCopy.items = newItems;
            // ls.set('LoundryCart',{
            //     "Items": stateCopy.items,
            //     "CartTotal" : stateCopy.totalCost
            // });

            return stateCopy;
        default:
            return stateCopy;

    }

}

const rootReducer = combineReducers({
    loginReducer,
    orderReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;