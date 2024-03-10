'use client';
import React, { useState } from 'react';
import { signIn, SignUp, signOut, useSession } from 'next-auth/react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter , useSearchParams } from 'next/navigation';
import Link from 'next/link';
export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = data;
    if (password === '' || email === '') {
      toast.warning('Email and password are required');

      return;
    }

    if (password.length < 6) {
      toast.warning('Password must be at least 8 characters long');
      return;
    }

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl, // Use callback URL instead of router.push
      });
      setLoading(true);
      if (res?.error == null) {
        window.location.href = res.url;
        setLoading(false);
      } else {
        toast.error('Error occurred while logging in');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error('An unexpected error occurred');
      setLoading(false); // Add error handling
    }
  };

  async function handleOauthSignin(provider) {
    try {
      await signIn(provider, { callbackUrl });
    } catch (error) {
      console.log(error);
      toast.error('An unexpected error occurred'); // Add error handling
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <main className="-m-4 mx-auto mt-5 w-full max-w-md sm:mt-0 md:p-6">
      <div className="mt-7 rounded-xl border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:border">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-4xl font-bold text-gray-800 dark:text-white">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Don't have an account yet? ‎
              <Link
                className="font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="/register"
              >
                ‎ Sign up
              </Link>
            </p>
          </div>

          <div className="mt-5 items-center">
            <div className="flex w-full items-center justify-between space-x-5">
              <button
                onClick={() => handleOauthSignin('github')}
                type="button"
                class="inline-flex w-full items-center justify-center gap-x-5 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <img
                  src="https://authjs.dev/img/providers/github.svg"
                  alt="github"
                  class="h-auto w-4 "
                  width="46"
                  height="47"
                  viewBox="0 0 46 47"
                  fill="white"
                />
                Github
              </button>
              <button
                onClick={() => handleOauthSignin('google')}
                type="button"
                class="inline-flex w-full items-center justify-center gap-x-5 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <img
                  src="https://authjs.dev/img/providers/google.svg"
                  alt="github"
                  class="h-auto w-4 "
                  width="46"
                  height="47"
                  viewBox="0 0 46 47"
                  fill="white"
                />
                Google
              </button>
            </div>
            <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:me-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
              Or
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={(e) => {
                        setData({ ...data, email: e.target.value });
                      }}
                      className="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm dark:text-white"
                    >
                      Password
                    </label>
                    <div
                      className="mb-2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'} // Show or hide password based on state
                     
                      value={data.password}
                      onChange={(e) => {
                        setData({ ...data, password: e.target.value });
                      }}
                      className="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <Loader2
                    width={20}
                    height={20}
                    className={`animate-spin ${loading ? 'block' : 'hidden'}`}
                  />
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
