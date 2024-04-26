const mongoose = require('mongoose');
mongoose.set('strictQuery', false);


mongoose
    .connect('mongodb+srv://premktechworkspace23:RJGreQ1Y9v88Oa55@cluster0.zukfz06.mongodb.net/')
    .then(() => console.log('Connected Mongo DB'))
    .catch((err) => console.log(err))


// RJGreQ1Y9v88Oa55
// premktechworkspace23

