const { errorResponse, successResponse } = require(".");
const { getProduct, getTransaction, getUser, updateTransaction, updateUser } = require("../fb");

process.on("message", async (req) => {
    try{
        req = JSON.parse(req);
        let orderId = req.body.payment_order.merchant_order_id;
        let transaction = await getTransaction(orderId);
        if(!transaction || transaction?.status === "paid") return process.send(false);
        let product = await getProduct(transaction.product_id);
        let user = await getUser(transaction.user_id);
        await updateTransaction(orderId, {status: 'paid'});
        await updateUser(transaction.user_id, {balance: +product.amount + +user.balance});
        process.send(true);
    }catch(err){
        process.send(false);
    }
});