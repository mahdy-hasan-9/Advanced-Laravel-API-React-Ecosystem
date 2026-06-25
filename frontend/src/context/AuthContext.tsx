import { createContext } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType } from './types';
import { fetchUserProfile } from './AuthContextMethods/fetchUserProfile';
import { logoutMutation } from './AuthContextMethods/userAuth';
import toast from 'react-hot-toast';
import { loginService, registerService } from '../services/authService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();

    const {
        data: profile,
        isLoading: isProfileLoading,
        refetch: refetchProfile,
    } = fetchUserProfile();

    const logoutHandlerMutation = logoutMutation();
    const logoutHandler = () => logoutHandlerMutation.mutate();

    const loginHandlerMutation = useMutation({
        mutationFn: loginService,
        onSuccess: (resp) => {
            if (resp.status === 200) {
                localStorage.setItem('token', resp.token);
                navigate('/', { replace: true });
                toast.success(resp.message || 'Logged In Successfully');
            } else {
                toast.error(resp.message || 'Login failed');
            }
        },
        onError: (error: any) => {
            if (error.status !== 422) {
                toast.error(error.message || 'Something went wrong');
            }
        },
    });

    const registerHandlerMutation = useMutation({
        mutationFn: registerService,
        onSuccess: (resp) => {
            if (resp.status === 201) {
                navigate('/login', { replace: true });
                toast.success(resp.message || 'Account Created Successfully');
            } else {
                toast.error(resp.message || 'Registration failed');
            }
        },
        onError: (error: any) => {
            if (error.status !== 422) {
                toast.error(error.message || 'Something went wrong');
            }
        },
    });

    return (
        <AuthContext.Provider
            value={{
                profile,
                isProfileLoading,
                refetchProfile,
                logoutHandler,
                loginHandlerMutation,
                registerHandlerMutation
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};