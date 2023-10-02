const fs = require('fs');
const express =  require('express');
const app = express();
const port = 3000;
app.use(express.json()); //middleware -> modify incoming request data

// app.get('/', (req, res) => {
//     res
//     .status(200)
//     .json({message : "Hello from the server side!", app : 'Natours'});
// }) // http method for request, response is only sent when get method is sent to the server

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint..');
// })

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status : 'success',
        results : tours.length,
        data : {
            tours : tours
        }
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1; //conversion to a number as params returns a string
    const tour = tours.find(el => el.id === id)

    // if ( id > tours.length ){
    if (!tour){
        return res.status(404).json({
            status : "fail",
            message : 'Invalid ID'
        });
    }
    res.status(200).json({
        status : 'success',
        data : {
            tours : tour
        }
    });
})

app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id : newId},  req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status : 'success',
            data : {
                tour : newTour
            }
        });
    });
});

//simply update properties
app.patch('api/v1/tours/:id', (req, res) => {
    if ( req.params.id * 1 > tours.length ){
        return res.status(404).json({
            status : "fail",
            message : 'Invalid ID'
        });
    }

    res.status(200).json({
        status : "success", 
        data : {
            tour : '<Updated tour here...>'
        }
    });
})

app.delete('api/v1/tours/:id', (req, res) => {
    if ( req.params.id * 1 > tours.length ){
        return res.status(404).json({
            status : "fail",
            message : 'Invalid ID'
        });
    }

    res.status(204).json({
        status : "success", 
        data : null 
    });
})





//port
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});


