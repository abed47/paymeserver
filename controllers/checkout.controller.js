
const fasterpay = require('fasterpay-node');
const dotenv = require('dotenv');
dotenv.config();

let gateway = new fasterpay.Gateway({
    publicKey: process.env.FP_PUBLIC_KEY,
    privateKey: process.env.FP_PRIVATE_KEY,
    isTest: 1 // Use 1 for Test Method
});

exports.checkout = (req, res) => {
    let { amount, id, price, userId } = req?.query;

    if(!amount || !id || !price || !userId) res.status(401).send('unauthorized action');

    let paymentForm = gateway.PaymentForm().buildForm({
        'description': 'Test order',
        'amount': amount,
        'currency': 'USD',
        'merchant_order_id': new Date().getTime().toString() + "A",
        'sign_version': 'v2',
        'success_url': 'http://localhost:3001/checkout/payment/success',
        'pingback_url': 'http://18.158.65.243:3001/checkout/payment/pingback'
    },{
        'autoSubmit': false,
        'hidePayButton': false,
    });

    res.send(paymentForm);
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

exports.pingBack = (req, res) => {
    console.log('hello')
    let html = 'NOK';
    if(gateway.Pingback().validate(req)){
        html = 'OK';
    }
    res.send(html);
}