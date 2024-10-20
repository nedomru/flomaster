import React, {useEffect, useState} from 'react';
import {supabase} from '../lib/supabase';

export default function AdminPanel() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    async function handleLogin(e) {
        e.preventDefault();
        setError('');
        try {
            const {error} = await supabase.auth.signInWithPassword({email, password});
            if (error) throw error;
        } catch (error) {
            setError(error.message);
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut();
    }

    function handleNavigation(path) {
        window.location.href = path;
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-gray-900 text-white">Загрузка...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
                {session ? (
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-center text-white">Привет, админ</h1>
                        <div className="space-y-2">
                            <button onClick={() => handleNavigation('/admin/api-manager')}
                                    className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                Менеджер API
                            </button>
                            <button onClick={() => handleNavigation('/admin/reports')}
                                    className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                Репорты
                            </button>
                            <button onClick={handleLogout}
                                    className="w-full px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                                Выйти
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-center text-white">Авторизация админа</h1>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="email"
                                placeholder="Почта"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-3 py-2 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="submit"
                                    className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                Войти
                            </button>
                        </form>
                        {error && <div className="p-3 text-sm text-red-500 bg-red-100 rounded">{error}</div>}
                    </div>
                )}
            </div>
        </div>
    );
}