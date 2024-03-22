import CreateAddressForm from '@/src/components/profile/address/CreateAddressForm';
import EditAddressForm from '@/src/components/profile/address/EditAddressForm';
import {getFetch} from '@/src/utils/fetch';
import {cookies} from 'next/headers';
import React from 'react';

export default async function AddressesPage() {
  const token = cookies().get('token');
  const {addresses, provinces, cities} = await getFetch('/profile/addresses', {Authorization: `Bearer ${token.value}`});
  // const data = await getFetch('/profile/addresses', {Authorization: `Bearer ${token.value}`});

  return (
    <div>
      <CreateAddressForm provinces={provinces} cities={cities} />
      <br />
      {addresses.map((address, index) => (
        <div key={address.id}>
          <EditAddressForm address={address} provinces={provinces} cities={cities} index={index} />
        </div>
      ))}
    </div>
  );
}
