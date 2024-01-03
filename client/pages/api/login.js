import mongoose from 'mongoose';
import connectDatabase from '../../utils/database';
import bcrypt from 'bcryptjs';
import User from '../../models/User';

export default async function handler(req, res) {
  try {
    await connectDatabase();
    if (req.method === 'POST') {
      const { username, password } = req.body;
      const user = await mongoose.models.User.findOne({
        username: username,
      });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: 'Password incorrect' });
        return;
      }
      res.status(200).json({ message: 'User authenticated', user });
    }
  } catch (error) {
    console.log(error);
  }
}
