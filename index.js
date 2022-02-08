const Express = require('express');
const app = Express();
const dotenv = require('dotenv');
const checkoutRoutes = require('./routes/checkout.routes');
const cors = require('cors');

dotenv.config();

app.use(cors())
app.use(Express.json());

app.use('/checkout', checkoutRoutes);
app.get('/', (req, res) => res.send('App started'));

app.listen(process.env.PORT || 3001, () => {
    console.log('server started')
})