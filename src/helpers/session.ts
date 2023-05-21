import { signOut } from 'next-auth/react';

export const logout = async () => {
  await signOut();
  window.location.href = `${process.env.NEXT_PUBLIC_COGNITO_URL}/logout?client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&logout_uri=${process.env.NEXT_PUBLIC_LOGOUT_URL}&redirect_uri=${process.env.NEXT_PUBLIC_LOGOUT_URL}`;
};
