'use client';
import React, {useEffect, useState} from 'react';
import SubmitButton from '../../button/submitButton/SubmitButton';
import {toast} from 'sonner';
import {useFormState} from 'react-dom';
import {motion} from 'framer-motion';
import {EditAddressAction} from '@/src/actions/ProfileAction';
import {ChevronDown, ChevronUp} from 'lucide-react';
import DeleteAddressForm from './DeleteAddressForm';

export default function EditAddressForm({address, cities, provinces, index}) {
  const [citiesFilter, setCitiesFilter] = useState(cities);
  const [stateEditForm, formActionEditForm] = useFormState(EditAddressAction, {});
  const [show, setShow] = useState(true);

  function changeProvince(e) {
    setCitiesFilter(cities.filter((city) => city.province_id == e.target.value));
  }

  useEffect(() => {
    if (stateEditForm?.message && stateEditForm?.status) {
      toast(stateEditForm.message, {type: stateEditForm.status});
    }
  }, [stateEditForm]);
  return (
    <>
      <div>
        <div className='divider before:bg-black after:bg-black'>{`Address ${index + 1}`}</div>
        <div className='flex justify-end'>
          <DeleteAddressForm addressId={address.id} />

          <button onClick={() => setShow(!show)} className='btn btn-circle btn-ghost size-12 text-black'>
            {show == true ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
        {show && (
          <div>
            <form action={formActionEditForm}>
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}>
                <div className='mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2'>
                  <div>
                    <label className='form-control mb-4 mt-4 w-full max-w-xs'>
                      <div className='label'>
                        <span className='label-text'>Title</span>
                      </div>
                      <input
                        name='title'
                        defaultValue={address.title}
                        type='text'
                        className='input input-bordered w-full max-w-xs bg-black'
                      />
                    </label>
                    <label className='form-control mb-4 mt-4 w-full max-w-xs'>
                      <div className='label'>
                        <span className='label-text'>Phone number</span>
                      </div>
                      <input
                        name='cellphone'
                        defaultValue={address.cellphone}
                        type='text'
                        className='input input-bordered w-full max-w-xs bg-black'
                      />
                    </label>
                    <label className='form-control mb-4 mt-4 w-full max-w-xs'>
                      <div className='label'>
                        <span className='label-text'>Postal code</span>
                      </div>
                      <input
                        name='postal_code'
                        defaultValue={address.postal_code}
                        type='text'
                        className='input input-bordered w-full max-w-xs bg-black'
                      />
                    </label>
                  </div>
                  <div>
                    <label className='form-control mb-4 mt-4 w-full max-w-xs'>
                      <div className='label'>
                        <span className='label-text'>Country</span>
                      </div>
                      <div className='w-full max-w-xs'>
                        <select
                          name='province_id'
                          defaultValue={address.province_id}
                          className='select select-bordered w-full max-w-xs bg-black'
                          onChange={changeProvince}>
                          <option disabled value=''>
                            Choose a province
                          </option>
                          {provinces.map((province) => (
                            <option key={province.id} value={province.id}>
                              {province.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </label>
                    <label className='form-control mb-4 mt-4 w-full max-w-xs'>
                      <div className='label'>
                        <span className='label-text'>City</span>
                      </div>
                      <select
                        name='city_id'
                        defaultValue={address.city_id}
                        className='select select-bordered w-full max-w-xs bg-black'>
                        <option disabled value=''>
                          Choose a city
                        </option>
                        {citiesFilter.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className='form-control'>
                      <div className='label'>
                        <span className='label-text'>Address</span>
                      </div>
                      <textarea
                        name='address'
                        defaultValue={address.address}
                        placeholder=''
                        className='textarea textarea-bordered textarea-md w-full max-w-xs bg-black'></textarea>
                    </label>
                    <input name='address_id' type='hidden' value={address.id} />
                  </div>
                  <SubmitButton title='Edit address' style='btn btn-wide btn-neutral mb-8' isFormValid={true} />
                </div>
              </motion.div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
