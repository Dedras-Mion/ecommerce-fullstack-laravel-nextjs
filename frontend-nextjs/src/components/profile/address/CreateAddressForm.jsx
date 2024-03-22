'use client';
import {useState} from 'react';
import SubmitButton from '../../button/submitButton/SubmitButton';
import {useFormState} from 'react-dom';
import {motion} from 'framer-motion';
import {CreateAddressAction} from '@/src/actions/ProfileAction';
import SonnerToast from '../../libraries/sonnerToast/SonnerToast';

export default function CreateAddressForm({cities, provinces}) {
  const [show, setShow] = useState(false);
  const [citiesFilter, setCitiesFilter] = useState(cities.filter((city) => city.province_id == provinces[0].id));
  const [stateCreateForm, formActionCreateForm] = useFormState(CreateAddressAction, {});

  function changeProvince(e) {
    setCitiesFilter(cities.filter((city) => city.province_id == e.target.value));
    /* console.log(e.target.value); */
  }

  return (
    <div>
      <button onClick={() => setShow(!show)} className='btn bg-black'>
        create address
      </button>
      <form action={formActionCreateForm}>
        {show && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}}>
            <div className='mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2'>
              <div>
                <label className='form-control mb-4 mt-4 w-full max-w-xs'>
                  <div className='label'>
                    <span className='label-text'>Title</span>
                  </div>
                  <input name='title' type='text' className='input input-bordered w-full max-w-xs bg-black' />
                </label>
                <label className='form-control mb-4 mt-4 w-full max-w-xs'>
                  <div className='label'>
                    <span className='label-text'>Phone number</span>
                  </div>
                  <input name='cellphone' type='text' className='input input-bordered w-full max-w-xs bg-black' />
                </label>
                <label className='form-control mb-4 mt-4 w-full max-w-xs'>
                  <div className='label'>
                    <span className='label-text'>Postal code</span>
                  </div>
                  <input name='postal_code' type='text' className='input input-bordered w-full max-w-xs bg-black' />
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
                  <select name='city_id' className='select select-bordered w-full max-w-xs bg-black'>
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
                    placeholder=''
                    className='textarea textarea-bordered textarea-md w-full max-w-xs bg-black'></textarea>
                </label>
              </div>
              <SubmitButton title='Create address' style='btn btn-wide btn-neutral mb-8' isFormValid={true} />
            </div>
          </motion.div>
        )}
      </form>
      <SonnerToast status={stateCreateForm.status} message={stateCreateForm.message} />
    </div>
  );
}
