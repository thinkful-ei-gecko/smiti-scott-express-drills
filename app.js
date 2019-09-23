const express = require('express');

const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.get('/', (req, res) => {
    console.log('The root path was called');
    res.send('Hello Express!');
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
});
app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
})


app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
  });

app.get('/sum', (req, res) => {

    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    if(!a){
        return res.status(400).send('Please provide a number in a'); 
    }
    if(!b){
        return res.status(400).send('Please provide a number in b'); 
    }

    const c = a + b;

    const sum =  `The sum of ${a} and ${b} is ${c}`;

    res.send(sum);

});

app.get('/cipher', (req, res) => {

    const text = req.query.text.toUpperCase();
    const shift = parseInt(req.query.shift);

    if (!text) {
        return res.status(400).send('Please provide text to encrypt');
    }

    if (!shift) {
        return res.status(400).send('Please provide an encryption key');
    }

    const textArr = text.split('')

    const encryptedText = textArr.map(letter => {
        let shiftedInt = letter.charCodeAt(0) + shift;
        shiftedInt = (shiftedInt % 26) + 65;
        return String.fromCharCode(shiftedInt);
    }).join('')
    res.send(encryptedText);
})