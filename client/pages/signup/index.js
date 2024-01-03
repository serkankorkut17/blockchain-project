import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/Auth';

const SignupPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { username, password, confirmPassword } = form;

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, confirmPassword }),
    });

    const { message, user } = await response.json();

    if (message === 'User created') {
      router.push('/login');
    } else {
      alert(message);
      setForm({ ...form });
    }
  };

  return (
    <div className="relative">
      <span className="coverLine"></span>
      <div className="relative bg-opacity-75 backgroundMain">
        <svg
          className="absolute inset-x-0 bottom-0 text-white"
          viewBox="0 0 1160 163"
        >
          <path
            fill="currentColor"
            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
          />
        </svg>
        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl sm:leading-none">
                Crypto King <br className="hidden md:block" />
                Voltran Funding
              </h2>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white    rounded shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Welcome to Voltran Funding
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="username"
                      className="inline-block mb-1 font-medium"
                    >
                      Username
                    </label>
                    <input
                      placeholder="Username"
                      required
                      onChange={e => handleFormFieldChange('username', e)}
                      value={form.username}
                      type="text"
                      name="username"
                      id="username"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="password"
                      className="inline-block mb-1 font-medium"
                    >
                      Password
                    </label>
                    <input
                      placeholder="Password"
                      required
                      onChange={e => handleFormFieldChange('password', e)}
                      value={form.password}
                      type="text"
                      name="password"
                      id="password"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="confirmPassword"
                      className="inline-block mb-1 font-medium"
                    >
                      Confirm Password
                    </label>
                    <input
                      placeholder="Confirm Password"
                      required
                      onChange={e =>
                        handleFormFieldChange('confirmPassword', e)
                      }
                      value={form.confirmPassword}
                      type="text"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none newColor"
                    >
                      Sign Up
                    </button>
                  </div>
                  <Link
                    href="/login"
                    className="text-xs text-gray-600 sm:text-sm px-3 py-2 rounded-md hover:bg-gray-200 transition duration-300"
                  >
                    Already a member? Log In
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
