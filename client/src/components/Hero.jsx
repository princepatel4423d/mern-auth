import React, { use, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Hero = () => {

    const { userData } = useContext(AppContext);

    return (
        <section className="py-20">
            <div className="max-w-4xl mx-auto text-center px-4">
                <img
                    className="w-48 h-48 max-w-3xl mx-auto rounded-full shadow-lg object-cover my-5"
                    src="https://images.unsplash.com/photo-1674544362969-a4269ef0ea69?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Developer setup"
                />

                <h1 className="text-3xl font-medium text-gray-900 mb-4">
                    Hey {userData ? userData.name : 'Developer'}!
                </h1>
                <h2 className="text-5xl font-semibold text-gray-900 mb-4">
                    Welcome to our app
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                    This is a simple MERN authentication starter. Build faster and focus on what matters.
                    It includes a pre-configured MongoDB, Express.js, React, and Node.js setup with JWT-based authentication, user registration and login forms, protected routes, and clean folder structure. Designed for developers who want to skip the boilerplate and jump straight into building full-stack apps.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-4xl text-lg transition">
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default Hero;