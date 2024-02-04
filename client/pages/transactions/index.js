import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/Auth';
import connectDatabase from '../../utils/database';
import mongoose, { set } from 'mongoose';
import User from '../../models/user';

const TransactionsPage = props => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);

  //console.log(props);
  console.log(user);
  /* const users = props.users;
  console.log(users); */

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
    console.log(user);
    console.log(props);
    const thisUser = props.users.find(u => u.username === user.username);
    //console.log(thisUser);
    setTransactions(thisUser.transactions);
  }, [user]);
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 rounded-s-lg">
              Title of Campaign
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions &&
            transactions.map(transaction => (
              <tr key={transaction._id} className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {transaction.title}
                </th>
                <td className="px-6 py-4">{transaction.donation}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export async function getServerSideProps(context) {
  await connectDatabase();
  // get all users from database but only transactions and username
  const users = await User.find({}, { transactions: 1, username: 1 });

  /* console.log(users); */

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}

export default TransactionsPage;
