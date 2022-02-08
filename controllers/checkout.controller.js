
const fasterpay = require('fasterpay-node');
const dotenv = require('dotenv');
const { getProduct, createTransaction, updateTransaction, updateUser, getTransaction } = require('../utils/fb');
const { errorResponse, successResponse } = require('../utils/helpers');
dotenv.config();

let gateway = new fasterpay.Gateway({
    publicKey: process.env.FP_PUBLIC_KEY,
    privateKey: process.env.FP_PRIVATE_KEY,
    isTest: 1 // Use 1 for Test Method
});

exports.checkout = async (req, res) => {
    try{

        let { amount, id, price, userId } = req?.query;

        if(!amount || !id || !price || !userId) res.status(401).send('unauthorized action');

        //get item id
        let product = await getProduct(id);
        if(!product?.price) return errorResponse(res, 500, 'product not found');
        //create transaction
        let merchant_order_id = new Date().getTime().toString() + "A";
        await createTransaction(merchant_order_id, {user_id: userId, product_id: id, status: 'pending'});

        let paymentForm = gateway.PaymentForm().buildForm({
            'description': 'Test order',
            'amount': product.price,
            'currency': 'USD',
            'merchant_order_id': merchant_order_id,
            'sign_version': 'v2',
            'success_url': 'http://localhost:3001/checkout/payment/success',
            'pingback_url': 'http://18.158.65.243:3001/checkout/payment/pingback'
        },{
            'autoSubmit': false,
            'hidePayButton': false,
        });

        res.send(paymentForm);

    }catch(err){
        res.status(200).json({
            type: "error",
            status: false,
            data: null,
            message: err?.message || 'server error'
        });
    }
}

exports.success = (req, res) => {
    console.log(req.body);
    console.log(req.params);
    console.log(req.search);
    res.send({
        params: req.params,
        search: req.search,
        body: req.body
    })
}

exports.pingBack = async (req, res) => {
    try{
        let orderId = req.body.payment_order.merchant_order_id;
        let transaction = await getTransaction(orderId);
        let product = await getProduct(transaction.product_id);
        await updateTransaction(orderId, {status: 'paid'});
        await updateUser(transaction.user_id, {balance: product.amount});
        
        return successResponse(res, 200, 'updated successfully');
    }catch(err){
        return errorResponse(res, 500, err?.message || 'server error');
    }
}