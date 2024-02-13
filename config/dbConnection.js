import mongoose from "mongoose";


export const dbConnection = ()=> {
    mongoose.connect('mongodb://localhost:27017/inventory-management-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('MongoDB connection failed:', error);
});
}