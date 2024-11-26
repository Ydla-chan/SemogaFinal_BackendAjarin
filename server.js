const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router/router');  
const response = require('./response/response');  
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());


// Route Awal ApI 
app.get('/', (req, res) => {
   response.success('Selamat datang di API Ajarin by SemogaFinal', res);  
 });


// Routing API 
router(app);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
