import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../AuthProvider/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

interface SignUpForm {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
}

const SignUp: React.FC = () => {
    const { createUser, updateUserProfile, setUser, loading, setLoading, googleLogin } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SignUpForm>();
    const [passError, setPassError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = (data: SignUpForm) => {
        setPassError('');

        if (data.password.length < 6) {
            setPassError('Password length must be at least 6 characters');
            return;
        } else if (!/[A-Z]/.test(data.password)) {
            setPassError('Password must contain at least one uppercase letter');
            return;
        } else if (!/[a-z]/.test(data.password)) {
            setPassError('Password must contain at least one lowercase letter');
            return;
        }

        setLoading(true);

        createUser(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;

                updateUserProfile(data.name, '', data.mobileNumber)
                    .then(() => {
                        setUser({
                            ...user,
                            displayName: data.name,
                            phoneNumber: data.mobileNumber,
                        });

                        reset();
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error('Profile update error:', error);
                    })
                    .finally(() => setLoading(false));
            })
            .catch((error) => {
                setPassError(error.message);
                setLoading(false);
            });
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await googleLogin();
            navigate('/');
        } catch (error) {
            console.error('Google login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-Poppins p-6 bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-blue-300">
                <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">Let’s Get Started</h2>
                <p className="text-gray-600 text-center text-base mb-2">
                    Create an account and get the Deals 
                </p>
                <div className="flex items-center justify-between">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500">Sign up</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            {...register('name', { required: "Name is required" })}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                        <input
                            type="text"
                            {...register('mobileNumber', { required: "Mobile Number is required" })}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your mobile number"
                        />
                        {errors.mobileNumber && <p className="text-red-600">{errors.mobileNumber.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: "Email is required" })}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: "Password is required" })}
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                        {passError && <p className="text-red-600">{passError}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                <div className="flex pt-2 items-center justify-between">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                    {loading ? 'Logging in with Google...' : 'Login with Google'}
                </button>
            </div>
            <div className="text-center">
                    <p className="mt-4 text-sm text-gray-600">
                        already user?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Log In here
                        </Link>
                    </p>
                </div>
        </div>
    );
};

export default SignUp;