const express = require('express');
     const cors = require('cors');
     const dotenv = require('dotenv');

     dotenv.config();
     const ExpressApp = express();
     ExpressApp.use(cors());
     ExpressApp.use(express.json());

     ExpressApp.get('/', (req, res) => 
     {
       res.send('Backend Ready');
     });

     const ServerPort = process.env.PORT || 5000;
     ExpressApp.listen(ServerPort, () => 
     {
       console.log(`Server running on port ${ServerPort}`);
     });