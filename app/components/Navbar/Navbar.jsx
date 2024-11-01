
"use client";
import React from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/Authcontext';

const Navbar = () => {
    const { userData } = useAuth();

    return (
        <div className='flex flex-row items-center justify-between p-2 px-8 '>
            <div className='flex flex-col items-start'>
                <h1 className='p-4 text-2xl font-semibold text-pretty'>
                    Hello... <span className='text-2xl font-bold'>{userData?.name}</span>
                </h1>
            </div>

            <div className='flex flex-row items-center space-x-11'>
                <div>
                    <div className="relative flex items-center bg-white rounded-lg w-[300px] p-1 border">
                        <SearchRoundedIcon className="absolute text-gray-500 left-3" />
                        <input
                            type="text"
                            className="w-full py-2 pl-10 text-sm text-gray-700 placeholder-gray-400 rounded-lg outline-none"
                            placeholder="Search anything here..."
                        />
                    </div>
                </div>

                <div className='pt-1'>
                    <Badge badgeContent={4} color="primary">
                        <NotificationsNoneOutlinedIcon color="action" />
                    </Badge>
                </div>

                <div className='flex items-center gap-2 p-1 font-medium text-[12px]'>
                    <Link href='/dashboard/profile' className='flex items-center gap-2 p-2 px-4 rounded-lg text-[13px] hover:bg-violet-50'>
                        <Image
                            src={userData?.image || "https://placehold.co/300x300.png"} // Ensure the fallback image is provided
                            alt="Profile"
                            className="w-10 h-10 border border-blue-400 rounded-full"
                            width={40}
                            height={40}
                        />
                        <div>
                            <p>Personal</p>
                            <p>{userData?.name}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
