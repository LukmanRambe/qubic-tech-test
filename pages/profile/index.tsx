import { useContext, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Loading from '@/components/artifacts/Loading';
import Toast from '@/components/artifacts/Toast';
import Layout from '@/components/Layout';
import { LayoutContext } from '@/context/LayoutContext';
import { useMutate } from '@/hooks/useMutate';
import type { NextPageWithLayout } from '@/ts/types/NextPageWithLayout';
import type { UpdateUserFormValues } from '@/ts/types/schema/UserSchema';
import { updateUserSchema } from '@/utils/schema/userSchema';

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const { toast, setToast, userData } = useContext(LayoutContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateUserFormValues>({
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      name: userData.name,
      old_password: '',
      new_password: '',
    },
  });

  const updateUser = useMutate({
    url: `/user`,
    method: 'PATCH',
    mutationKey: 'updateUser',
    reqBody: {
      name: watch('name'),
      old_password: watch('old_password'),
      new_password: watch('new_password'),
    },
  });

  const handleUpdateUser = async () => {
    updateUser.mutate();
  };

  useEffect(() => {
    if (updateUser.status === 'success') {
      if (updateUser.data?.status === 200) {
        setToast({
          type: 'success',
          message: 'User Data Updated',
          isShown: true,
        });

        setTimeout(() => {
          setToast({
            type: '',
            message: '',
            isShown: false,
          });

          router.reload();
        }, 2000);
      }
    } else if (updateUser.status === 'error') {
      setToast({
        type: 'error',
        message:
          (updateUser.error as AxiosError<{ errors: string }>).response?.data
            .errors ?? '',
        isShown: true,
      });

      setTimeout(() => {
        setToast({
          type: '',
          message: '',
          isShown: false,
        });
      }, 2000);
    }
  }, [updateUser.status]);

  useEffect(() => {
    if (userData) {
      setValue('name', userData.name);
    }
  }, [userData]);

  return (
    <>
      <Head>
        <title>Qubic | Profile - {userData.name}</title>
      </Head>

      {toast.isShown && <Toast type={toast.type} message={toast.message} />}

      <section className="w-full max-w-lg my-5">
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <article className="flex flex-col space-y-1 mb-6">
            <label
              htmlFor="email"
              className="tracking-wide font-medium text-blue-900"
            >
              Email
            </label>

            <div
              id="email"
              placeholder="Email"
              className="py-2 px-3 rounded-md text-gray-600 border border-gray-300 bg-gray-200"
            >
              {userData.email}
            </div>
          </article>

          <article className="flex flex-col space-y-1 mb-6">
            <label
              htmlFor="name"
              className="tracking-wide font-medium text-blue-900"
            >
              Name
            </label>

            <input
              {...register('name')}
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              className="w-full py-2 px-3 rounded-md focus:outline-none text-black border border-gray-400 active:border-blue-600 focus:border-blue-600 resize-none"
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </article>

          <article className="flex flex-col space-y-1 mb-6">
            <label
              htmlFor="old_password"
              className="tracking-wide font-medium text-blue-900"
            >
              Old Password
            </label>

            <input
              {...register('old_password')}
              id="old_password"
              type="password"
              name="old_password"
              placeholder="Old Password"
              autoComplete="off"
              className="w-full py-2 px-3 rounded-md focus:outline-none text-black border border-gray-400 active:border-blue-600 focus:border-blue-600 resize-none"
            />

            {errors.old_password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.old_password.message}
              </p>
            )}
          </article>

          <article className="flex flex-col space-y-1 mb-6">
            <label
              htmlFor="new_password"
              className="tracking-wide font-medium text-blue-900"
            >
              New Password
            </label>

            <input
              {...register('new_password')}
              id="new_password"
              type="password"
              name="new_password"
              placeholder="New Password"
              autoComplete="off"
              className="w-full py-2 px-3 rounded-md focus:outline-none text-black border border-gray-400 active:border-blue-600 focus:border-blue-600 resize-none"
            />

            {errors.new_password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.new_password.message}
              </p>
            )}
          </article>

          <section className="flex justify-end">
            <button
              type="submit"
              disabled={
                watch('name') === '' ||
                watch('old_password') === '' ||
                watch('new_password') === ''
              }
              className="bg-blue-600 p-2 w-40 rounded-md focus:outline-none hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed font-semibold text-white tracking-wide transition-all duration-75 ease-in-out"
            >
              {updateUser.isLoading ? (
                <span className="flex w-full justify-center text-white">
                  <Loading size={6} isButton />
                </span>
              ) : (
                'Update'
              )}
            </button>
          </section>
        </form>
      </section>
    </>
  );
};

Profile.getLayout = (page) => <Layout>{page}</Layout>;

export default Profile;
