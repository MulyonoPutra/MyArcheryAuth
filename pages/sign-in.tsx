import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { login } from '../services/auth.service';

const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [checkbox, setCheckbox] = useState<boolean>(false);

    const enabled = email.length > 0 && password.length > 0;

    const router = useRouter();

    const onSubmit = async () => {
        const data = { email, password };

        if (!email || !password) {
            toast.error('Email dan Password wajib di isi..');
        } else {
            const response = await login(data);
            console.log(response)
            if (response.errors) {
                toast.error(response.message);
            } else {
                toast.success('Login Success!');
                const { accessToken } = response.data.data;
                console.log(accessToken)
                const tokenBase64 = btoa(accessToken);
                Cookies.set('token', tokenBase64, { expires: 1 });
                router.push('/');
            }
        }
    };
    return (
        <>
            <div class="flex flex-row">
                <div className="bg-blue-600 hidden lg:block w-[200px] md:w-1/2 h-screen">
                    <img
                        src="/archery-bg.png"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="forms">
                    <div class="flex flex-col space-y-1">
                        <div>
                            <h3 className="title">Selamat Datang</h3>
                        </div>
                        <div>
                            <h4 className="subtitle">
                                Satu akun untuk daftar berbagai event
                            </h4>
                        </div>
                        <div>
                            <form>
                                <div class="mb-6 mt-6">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div class="mb-6">
                                    <input
                                        type="password"
                                        class="form-control"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div class="flex justify-between items-center mb-6">
                                    <div class="form-group form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            checked={checkbox} onChange={() => setCheckbox(!checkbox)}
                                        />
                                        <label
                                            class="form-check-label inline-block text-gray-800"
                                        >
                                            Ingat Saya
                                        </label>
                                    </div>
                                    <a
                                        href="#!"
                                        class="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >
                                        Lupa Sandi
                                    </a>
                                </div>

                                <button
                                    type="button"
                                    class="inline-block px-7 py-3 bg-[#0d47a1] text-white font-medium text-sm leading-snug uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    disabled={!enabled}
                                    onClick={onSubmit}
                                >
                                    Masuk
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;