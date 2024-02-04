import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  title: {
    type: String,
  },
  transactions: [
    {
      title: {
        type: String,
        required: true,
      },
      donation: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
