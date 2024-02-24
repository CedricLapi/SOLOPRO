const express = require("express");
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors())                 

    
require("./config/mongoose.config");
    
app.use(express.json(), express.urlencoded({ extended: true }));

const AllMyUserRoutes = require("./routes/book.routes");
AllMyUserRoutes(app);

require('./routes/user.routes')(app);
    

    
app.listen(8000, () => console.log("The server is all fired up on port 8000"));