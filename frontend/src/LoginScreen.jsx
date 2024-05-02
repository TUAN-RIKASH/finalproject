import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

function LoginScreen() {
    const [alert, setAlert] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    useEffect(() => {
        let timeout;
        if (alert.message !== '') {
            timeout = setTimeout(() => {
                setAlert({ message: '', type: '' });
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [alert.message]);

    const handleLogin = async (values, actions) => {
        try {
            const response = await fetch('http://127.0.0.1:3001/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: values.username,
                    password: values.password,
                }),
            });
            if (response.status === 200) {
                setAlert({ message: 'Login success', type: 'success' });
                localStorage.setItem('login', "true");
                navigate('/admin');
            } else {
                const responseData = await response.json();
                setAlert({ message: responseData.error || 'Login failed', type: 'error' });
            }
        } catch (error) {
            console.error('Login error:', error);
            setAlert({ message: 'Login error: ' + error.message, type: 'error' });
        }
        actions.setSubmitting(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700" 
            style={{ backgroundColor: '#333' }}>
            {alert.message && (
                <div className={`fixed top-5 w-full flex justify-center z-50`}>
                    <div className={`py-2 px-4 rounded ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {alert.message}
                    </div>
                </div>
            )}
            <div className="p-6 bg-gray-200 shadow-md rounded w-full max-w-md">
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div className="text-2xl font-bold text-gray-800 text-center">
                                Login
                            </div>
                            <div>
                                <Field type="text" name="username" placeholder="Username" className="w-full p-2 border border-gray-300 rounded"/>
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm"/>
                            </div>
                            <div>
                                <Field type="password" name="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded"/>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default LoginScreen;