'use client';
import { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Loader2 } from 'lucide-react';

export default function ProfileEdit() {
  const { data: session, loading: sessionLoading } = useSession();
  const user = session?.user;
  const uploadRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [picture, setPicture] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        accountPassword: '',
        newPassword: '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  if (sessionLoading || !user) {
    return <div>Loading...</div>;
  }

  const handleImageClick = () => {
    uploadRef.current.click();
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const handleUserData = (e) => {
    const { name, accountPassword , newPassword  ,  value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    const { name } = userData;
    if (name.trim() === '') {
      setLoading(false);
      return toast.error("Name Can't be empty");
    }
    try {
    let pictureUrl = '';
    if (picture) {
        const formData = new FormData();
        formData.append('photos', picture); // changed 'photo' to 'photos'
        const res = await fetch('/api/upload/profile-photo', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        pictureUrl = data.url;
    }
      const userDetails = {
        name: userData.name,
        password: userData.accountPassword,
        newPassword: userData.newPassword,
        image: pictureUrl,
      };

      console.log(userDetails);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Internal server error');
    }
  };

  return (
    <>
      <div className="rounded-xl bg-white p-1 px-4 dark:bg-slate-900  sm:p-7 md:px-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 md:text-5xl">
            Profile
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your account settings.
          </p>
        </div>

        <form>
          <div class="grid gap-2 sm:grid-cols-12 sm:gap-6">
            <div class="sm:col-span-3">
              <label class="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200">
                Profile photo
              </label>
            </div>

            <div class="sm:col-span-9">
              <div class="flex items-center gap-5">
                {picture ? (
                  <Avatar className="inline-block h-16 w-16 rounded-full ring-2 ring-gray-200 dark:ring-gray-800 ">
                    <AvatarImage
                      src={URL.createObjectURL(picture)}
                      alt={`${user.name || 'user'} profile picture`}
                    />
                    <AvatarFallback>
                      <div className="h-10 w-10 animate-pulse bg-gray-400"></div>
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="inline-block h-16 w-16 rounded-full ring-2 ring-gray-200 dark:ring-gray-800 ">
                    <AvatarImage
                      src={user?.image}
                      alt={`${user?.name || 'user'} profile picture`}
                    />
                    <AvatarFallback>
                      {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="flex gap-x-2">
                  <div
                    className="inline-flex cursor-pointer items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={handleImageClick}
                  >
                    <Upload width={20} height={20} />
                    <span>Upload photo</span>
                    <input
                      type="file"
                      ref={uploadRef}
                      onChange={handlePictureChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="af-account-full-name"
                class="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
              >
                Full name
              </label>
            </div>

            <div className="sm:col-span-9">
              <div className="">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="relative -ms-px -mt-px block w-full rounded-lg border-2 border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600 sm:mt-0 sm:first:ms-0"
                  onChange={handleUserData}
                  value={userData.name}
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="account-email"
                class="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
              >
                Email
              </label>
            </div>

            <div className="sm:col-span-9">
              <div
                disabled
                name="account-email"
                className="scrollbar-hide block w-full max-w-full select-none overflow-x-auto rounded-lg border-2 border-gray-200 px-3 py-2 pe-11 text-sm opacity-70 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
              >
                <span className="hidden  sm:flex">{user.email}</span>
                <span className="flex  sm:hidden">
                  {user.email.length > 24
                    ? user.email.substring(0, 24) + '...'
                    : user.email}
                </span>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="account-password"
                class="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
            </div>

            <div class="sm:col-span-9">
              <div class="space-y-2">
                <input
                  id="password"
                  name="account_password"
                  type="text"
                  className="block w-full rounded-lg border-2 border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="current password"
                  value={userData.accountPassword}
                  onChange={handleUserData}
                />
                <input
                  type="text"
                  id="confirm_password"
                  name="new_password"
                  className="block w-full rounded-lg border-2 border-gray-200 px-3 py-2 pe-11 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="confirm password"
                  value={userData.newPassword}
                  onChange={handleUserData}
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label
                for="af-account-bio"
                class="mt-2.5 inline-block text-sm text-gray-800 dark:text-gray-200"
              >
                BIO
              </label>
            </div>

            <div class="sm:col-span-9">
              <textarea
                id="bio"
                name="bio"
                value={userData.bio}
                onChange={handleUserData}
                className="block w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                rows="6"
                placeholder="Type your Bio..."
              ></textarea>
            </div>
          </div>

          <div class="mt-5 flex justify-end gap-x-2">
            <button
              type="button"
              disabled={loading}
              onClick={handleSaveChanges}
              className=" mx-auto inline-flex w-56 items-center  justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 sm:mx-0"
            >
              <Loader2
                width={20}
                height={20}
                className={`animate-spin ${loading ? 'block' : 'hidden'}`}
              />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
