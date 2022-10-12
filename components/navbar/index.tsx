import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { findUser } from '../../services/user.service';

export type UserProps = {
    name: string;
    avatar: string;
}

const Navbar = () => {

    const [user, setUser] = useState<UserProps>({
        name: '',
        avatar: ''
    })

    const [name, setName] = useState('');

    const fetchUserInfo = useCallback(async () => {
        const response = await findUser();
        setUser({
            name: response.data.data.name,
            avatar: response.data.data.avatar
        });
    }, []);

    useEffect(() => {
        fetchUserInfo();
    }, [])

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 h-[70px]">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="https://flowbite.com/" className="flex items-center">
                    <img src="https://myarchery.id/static/media/myachery.9ed0d268.png" className="mr-3 h-30 w-18 sm:h-9" alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">My Archery</span>
                </a>
                <div className="flex items-center md:order-2">
                    <button type="button" className="flex mr-3 text-sm bg-gray-100 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span className="block py-2 px-4 text-sm text-gray-500">{user.name}</span>
                        <img className="w-8 h-8 rounded-full" src={user.avatar} alt="user photo" />
                    </button>
                </div>
            </div>
        </nav>

    )
}

export default Navbar