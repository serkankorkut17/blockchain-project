import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/Auth';
import connectDatabase from '../../utils/database';
import mongoose from 'mongoose';
import User from '../../models/user';

const MembersPage = props => {
  const { user } = useAuthContext();
  const router = useRouter();

  /* console.log(props); */

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  return (
    <div className="relative overflow-x-auto h-screen m-0 dark:bg-gray-800">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Member Username
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user => (
            <tr
              key={user._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.username}
              </th>
              <td className="px-6 py-4">{user.role || '-'}</td>
              <td className="px-6 py-4">{user.title || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export async function getServerSideProps(context) {
  await connectDatabase();
  //const users = await mongoose.models.User.find({}).select('-password');
  const users = await User.find({}).select('-password');
  /* console.log(users); */

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}

export default MembersPage;
