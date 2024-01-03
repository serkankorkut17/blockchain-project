import mongoose from 'mongoose';

const MONGODB_URL =
  'mongodb+srv://serkankorkut17:Merhaba123@serkan.zbepuho.mongodb.net/CrowdFunding?retryWrites=true&w=majority';

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
  } catch (error) {
    console.log('Database connection failed');
  }
};

export default connectDatabase;
