   const dotenv = require('dotenv');
   dotenv.config();

   const app = require('./app');
   const connectDB = require('./config/db.config');
   connectDB();
   const PORT = process.env.PORT || 5000;


   //start the server 
    app.listen(PORT,()=>{
        console.log(`Server is running on port No http://localhost:${PORT}`);
    })
