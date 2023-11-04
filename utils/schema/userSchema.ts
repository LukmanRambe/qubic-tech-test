import * as Yup from 'yup';

import type { UpdateUserFormValues } from '@/ts/types/schema/UserSchema';

export const updateUserSchema: Yup.ObjectSchema<UpdateUserFormValues> =
  Yup.object().shape({
    name: Yup.string().required('Username is required'),
    old_password: Yup.string().min(8).required('Old Password is required'),
    new_password: Yup.string().min(8).required('New Password is required'),
  });
