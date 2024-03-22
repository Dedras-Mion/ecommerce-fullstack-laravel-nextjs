'use client';

import {X} from 'lucide-react';
import SubmitButton from '../../button/submitButton/SubmitButton';
import {deleteFormAction} from '@/src/actions/ProfileAction';
import {useFormState} from 'react-dom';
import SonnerToast from '../../libraries/sonnerToast/SonnerToast';

export default function DeleteAddressForm({addressId}) {
  const [stateDelete, formActionDelete] = useFormState(deleteFormAction, {});

  return (
    <form action={formActionDelete}>
      <SubmitButton title={<X />} style='btn btn-ghost btn-circle text-red-500' isFormValid={true} />
      <input type='hidden' name='address_id' value={addressId} />
      <SonnerToast status={stateDelete.status} message={stateDelete.message} />
    </form>
  );
}
