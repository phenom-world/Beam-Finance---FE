import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { LoginFormData, RegisterFormData } from '../../schemas/auth';
import { User } from '../../types';
import { handleErrorResponse } from '../../util/helper';
import axiosInstance from '../../util/setupAxios';
import { useAuth } from '../useAuth';
import useQuery from '../useQuery';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);
      login({
        accessToken: response.data.data.accessToken,
        tokenExpiry: response.data.data.tokenExpiry,
      });
      toast.success('Login successful!');
      navigate('/wallet');
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return { handleLogin };
};

export const useRegister = () => {
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormData) => {
    try {
      const response = await axiosInstance.post('/auth/register', data);
      console.log('Registration successful:', response.data);
      toast.success('Registration successful! Please login to continue.');
      navigate('/login');
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  return { handleRegister };
};

export const useGetMe = () => {
  return useQuery<User>(`/auth/me`);
};
