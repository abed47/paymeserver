
const fasterpay = require('fasterpay-node');
const dotenv = require('dotenv');
const { getProduct, createTransaction, updateTransaction, updateUser, getTransaction, getUser } = require('../utils/fb');
const { errorResponse, successResponse } = require('../utils/helpers');
const { fork } = require('child_process');
const chance = require('chance');

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
        let merchant_order_id = chance().string({numeric: true, alpha: true, length: 8})
        await createTransaction(merchant_order_id, {user_id: userId, product_id: id, status: 'pending'});

        let paymentForm = gateway.PaymentForm().buildForm({
            'description': 'Test order',
            'amount': product.price,
            'currency': 'USD',
            'merchant_order_id': merchant_order_id,
            'sign_version': 'v2',
            //TODO: change urls
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
    let c = fork('utils/helpers/pingback-handler.js', {detached: true});
    c.send(JSON.stringify({body: req.body}));
    c.on('message', () => {
        res.status(200);
        res.json({});
        res.end();
    })
}