const dotenv= require('dotenv');
dotenv.config({path: './config.env'}); //CANT READ PROCESS IN AP BECAUSE IT WASNT CONFIGURED THATS WHY ITS UP

const app = require('./app');

// console.log(process.env);

const port= process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`App running on port ${port}....`);
})