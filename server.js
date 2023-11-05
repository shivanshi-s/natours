const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);


mongoose
    // .connect(process.env.DATABASE_LOCAL,{
    .connect(DB, {
        useNewUrlParser : true,
        useCreateIndex : true,
        useFindAndModify : false
    }).then(() => console.log("DB Connected !!"));


//instance of the tour model
// const testTour = new Tour({
//     name : "The Park Camper",
//     price : 400 
// })
// testTour.save().then( doc => {
//     console.log(doc);
// }).catch( err => {
//     console.log("ERROR!!", err)
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});