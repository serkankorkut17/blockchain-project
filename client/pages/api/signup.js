import mongoose from 'mongoose';
import connectDatabase from '../../utils/database';
import bcrypt from 'bcryptjs';
import User from '../../models/User';

export default async function handler(req, res) {
  try {
    await connectDatabase();

    if (req.method === 'POST') {
      const { username, password, confirmPassword } = req.body;
      if (!username || !password) {
        res.status(422).json({ message: 'Username and password required' });
        return;
      }
      if (password !== confirmPassword) {
        res.status(422).json({ message: 'Passwords do not match' });
        return;
      }
      const userExists = await User.findOne({
        username: username,
      });
      if (userExists) {
        res.status(422).json({ message: 'User already exists' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await mongoose.models.User.create({
        username: username,
        password: hashedPassword,
      });
      res.status(201).json({ message: 'User created', user });
    }

    if (req.method === 'GET') {
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
