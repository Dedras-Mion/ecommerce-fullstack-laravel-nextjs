import EditProfileForm from '@/src/components/profile/info/EditProfileForm';
import {getFetch} from '@/src/utils/fetch';
import {cookies} from 'next/headers';
import React from 'react';

export default async function profilePage() {
  const token = cookies().get('token');
  const user = await getFetch('/profile/info', {Authorization: `Bearer ${token.value}`});
  // console.log(user);
  return (
    <div>
      <EditProfileForm user={user} />
    </div>
  );
}
