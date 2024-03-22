'use server';

import {cookies} from 'next/headers';
import {postFetch} from '../utils/fetch';
import {handleError} from '../utils/helpers';

async function AuthActionLogin(stateLogin, formData) {
  const cellphone = formData.get('cellphone');

  if (cellphone === '') {
    return {
      status: 'error',
      message: 'Entering a phone number is required',
    };
  }
  const pattern = /^(\+98|0)?9\d{9}$/;
  if (!pattern.test(cellphone)) {
    return {
      status: 'error',
      message: 'Invalid phone number',
    };
  }

  // Create login_token in cookies
  const data = await postFetch('/auth/login', {cellphone});
  if (data.status === 'success') {
    cookies().set({
      name: 'login_token',
      value: data.data.login_token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return {
      status: data.status,
      message: 'Login successful',
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}

async function AuthActionOtp(stateOtp, formData) {
  const otp = formData.get('otp');

  if (otp === '') {
    return {
      status: 'error',
      message: 'OTP code is required.',
    };
  }

  const pattern = /^[0-9]{6}$/;
  if (!pattern.test(otp)) {
    return {
      status: 'error',
      message: 'Invalid OTP code.',
    };
  }

  const loginToken = cookies().get('login_token');
  if (!loginToken) {
    return {
      status: 'error',
      message: 'Your login token is invalid. Please try again.',
    };
  }

  const data = await postFetch('/auth/check-otp', {otp, login_token: loginToken.value});

  if (data.status === 'success') {
    cookies().delete('login_token');
    cookies().set({
      name: 'token',
      value: data.data.token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return {
      status: data.status,
      message: 'You have successfully logged in',
      user: data.data.user,
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}
// stateResendOtp
async function AuthActionResendOtp() {
  const loginToken = cookies().get('login_token');
  if (!loginToken) {
    return {
      status: 'error',
      message: 'Your login token is invalid. Please try again.',
    };
  }

  const data = await postFetch('/auth/resend-otp', {login_token: loginToken.value});

  if (data.status === 'success') {
    cookies().set({
      name: 'login_token',
      value: data.data.login_token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return {
      status: data.status,
      message: 'The login code has been sent again',
    };
  } else {
    return {
      status: data.status,
      message: handleError(data.message),
    };
  }
}

async function AuthActionMe() {
  const token = cookies().get('token');

  if (!token) {
    return {
      error: 'You are not logged in' /* Not Authorized */,
    };
  }
  // Authorization: `Bearer ${token.value}`
  const data = await postFetch('/auth/me', {}, {Authorization: `Bearer ${token.value}`});
  if (data.status === 'success') {
    return {
      user: data.data,
    };
  } else {
    return {
      error: 'User Forbidden',
    };
  }
}

async function AuthActionLogout() {
  const token = cookies().get('token');

  const data = await postFetch('/auth/logout', {}, {Authorization: `Bearer ${token.value}`});
  if (data.status === 'success') {
    cookies().delete('token');
    return {
      success: 'You are logged out',
    };
  } else {
    return {
      error: 'User Forbidden',
    };
  }
}

export {AuthActionLogin, AuthActionOtp, AuthActionMe, AuthActionResendOtp, AuthActionLogout};
