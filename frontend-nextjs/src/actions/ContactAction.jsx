'use server';

import {postFetch} from '../utils/fetch';
import {handleError} from '../utils/helpers';

export async function ContactAction(state, formData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const text = formData.get('text');

  if (name === '' || email === '' || subject === '' || text === '') {
    return {
      status: 'error',
      message: 'All items in our contact form are required',
    };
  }

  const data = await postFetch('/contact-us', {name, email, subject, text});

  if (data.status === 'success') {
    return {
      status: data.status,
      message: 'Your message was successfully registered',
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}
