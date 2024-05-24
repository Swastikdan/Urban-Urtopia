'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { LoaderCircle, Trash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import axios from 'axios';

export default function page() {
  const [users, setUsers] = useState([]);
  const [pageloading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [bookings, setBookings] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        console.log(data.users);
      } else {
        throw new Error('Failed to load bookings');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    setLoading(id);
    try {
      const res = await axios.delete(`/api/admin/users?id=${id}`);
      if (res.ok) {
        setUsers(res.data.users);
        toast.success(res.data.message);
        console.log(res.data);
        console.log('Deleted');
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setPageLoading(false);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {pageloading ? (
        <div className="flex min-h-[90vh] flex-col">
          <div className="flex flex-auto flex-col items-center justify-center p-4 md:p-5">
            <div className="flex justify-center">
              <div
                className="inline-block size-9 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mx-auto w-full py-10 sm:px-6 lg:px-8 lg:py-14">
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="inline-block min-w-96 p-1.5 align-middle">
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900">
                    <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Users
                      </h2>
                    </div>
                    {!Array.isArray(users) || users.length === 0 ? (
                      <div className="col-span-4 flex flex-1 items-center justify-center py-8 lg:py-16 ">
                        <div className="mx-auto w-[80vw] max-w-2xl px-4 py-8 text-center">
                          <p className="mt-4 text-gray-500 ">No user found.</p>
                        </div>
                      </div>
                    ) : (
                      <ScrollArea className="w-auto max-w-[92vw] whitespace-nowrap  md:max-w-[81.5vw]">
                        <div className="flex w-max">
                          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <TableHeader>
                              <TableRow>
                                <TableHead
                                  scope="col"
                                  className="py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0"
                                >
                                  <div className="flex items-center gap-x-2 ps-6">
                                    <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                      Image
                                    </span>
                                  </div>
                                </TableHead>
                                <TableHead
                                  scope="col"
                                  className="py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0"
                                >
                                  <div className="flex items-center gap-x-2 ps-6">
                                    <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                      Name
                                    </span>
                                  </div>
                                </TableHead>
                                <TableHead
                                  scope="col"
                                  className="px-6 py-3 text-start"
                                >
                                  <div className="flex items-center gap-x-2 ps-6">
                                    <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                      Email
                                    </span>
                                  </div>
                                </TableHead>

                                <TableHead
                                  scope="col"
                                  className="px-6 py-3 text-start"
                                >
                                  <div className="flex items-center gap-x-2 ps-6">
                                    <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
                                      Role
                                    </span>
                                  </div>
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {users &&
                                users.map((user) => (
                                  <TableRow key={user.id}>
                                    <TableCell className="size-px whitespace-nowrap">
                                      <Avatar>
                                        <AvatarImage
                                          src={user.image}
                                          alt="User Image"
                                        />
                                        <AvatarFallback>
                                          {user.name}
                                        </AvatarFallback>
                                      </Avatar>
                                    </TableCell>
                                    <TableCell className="size-px whitespace-nowrap">
                                      <div className="text-left">
                                        <span className="text-sm font-medium">
                                          {user.name}
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="size-px whitespace-nowrap">
                                      <div className="px-6 py-3 ">
                                        <span className="pl-2 text-sm">
                                          {user.email}
                                        </span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="size-px whitespace-nowrap">
                                      <div className="px-6 py-3 ">
                                        {user.role === 'user' ? (
                                          <span className="inline-flex items-center gap-x-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-500/10 dark:text-green-500">
                                            {user.role}
                                          </span>
                                        ) : (
                                          <span className="inline-flex items-center gap-x-1 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-500/10 dark:text-red-500">
                                            {user.role}
                                          </span>
                                        )}
                                      </div>
                                    </TableCell>
                                    <TableCell className="size-px whitespace-nowrap">
                                      <div className="px-6 py-3 ">
                                        <button
                                          className="inline-flex items-center gap-x-2 rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-red-600 shadow-sm hover:bg-red-50 disabled:pointer-events-none disabled:opacity-50"
                                          onClick={() =>
                                            handleDeleteUser(user.id)
                                          }
                                        >
                                          {loading == user.id ? (
                                            <LoaderCircle
                                              width={20}
                                              className="animate-spin"
                                            />
                                          ) : (
                                            <Trash width={20} />
                                          )}
                                          Delete
                                        </button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
