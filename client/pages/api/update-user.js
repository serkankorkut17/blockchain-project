import mongoose from 'mongoose';
import connectDatabase from '../../utils/database';

export default async function handler(req, res) {
  try {
    await connectDatabase();
    if (req.method === 'PUT') {
      const { username, role, title, titleOfCampaign, donation } = req.body;
      const user = await mongoose.models.User.findOne({
        username: username,
      });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      if (!user.role) {
        user.role = role;
        user.title = title;
      } else if (user.role === role) {
        user.title = title;
      } else if (user.role !== role) {
        user.role = 'Both';
        user.title = '-';
      }
      user.transactions.push({ title: titleOfCampaign, donation });
      user.save();
      res.status(200).json({ message: 'User updated', user });
    }
  } catch (error) {
    console.log(error);
  }
}
