"use client"
import React from 'react';
import Link from 'next/link';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import ImageLogo from '../../Assets/logo/logo.png';
import Image from 'next/image';
import { auth } from "../../Firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';

const NavbarIcons = [
  {
    Name: "Dashboard",
    IconName: GridViewRoundedIcon,
    href: "/dashboard",
  },
  {
    Name: "Diary List",
    IconName: DraftsRoundedIcon,
    href: "/dashboard/messages",
  },
  {
    Name: "Community",
    IconName: PeopleRoundedIcon,
    href: "/dashboard/community",
  },
  {
    Name: "Analytics",
    IconName: TimelineRoundedIcon,
    href: "/dashboard/analytics",
  },
  {
    Name: "Likes",
    IconName: FavoriteRoundedIcon,
    href: "/dashboard/likes",
  },
  
];

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
        await signOut(auth);
        console.log('User signed out successfully');
        router.push('/login')
    } catch (error) {
        console.error('Error signing out: ', error);
    }
};
  return (
    <div className="w-[15rem] h-[100vh] flex flex-col  border-opacity-15 rounded-[5px] ">
      <div className="flex items-center mt-5 mb-6 ml-8 bg-violet-50">
        <Image src={ImageLogo} className="w-[10rem] mix-blend-multiply " alt='logo'  />
       
      </div>

      <div className="flex flex-col justify-between items-start ml-4 h-[100vh]">
       
        <div>
        <h1 className='p-2 border-t-2  text-[14px] ' >Main</h1>
          {NavbarIcons.map((icon, index) => (
            <div 
              key={index} 
              className="relative flex items-center gap-4 mb-3 text-[18px] text-pretty p-3 w-[12rem] rounded-[10px] group hover:bg-violet-50 hover:border-r-[3px] border-violet-400 "
            >
              <icon.IconName className="text-xl text-black" />
              <Link href={icon.href} className="text-[18px] font-semibold text-black">
                {icon.Name}
              </Link>
        </div>
          ))}
           {/* <h1 className='p-2 border-t-2  text-[14px] ' >Settings</h1>
           <div className="relative flex items-center  gap-4 text-[18px] p-3 w-[12rem] rounded-[10px] hover:bg-slate-100 hover:border-r-[3px] border-violet-400 ">
          <SettingsSuggestRoundedIcon className="text-2xl text-black" />
          <Link href="/dashboard/settings" className="text-black">
          Settings
          </Link>
        </div> */}
        </div>
        
        <div>
        <h1 className='p-2 border-t-2  text-[14px] ' >Accounts</h1>
        <div className="relative flex items-center  gap-4 text-[18px] p-3 w-[12rem] rounded-[10px] hover:bg-slate-100 hover:border-r-[3px] border-violet-400 ">
          <SettingsSuggestRoundedIcon className="text-2xl" />
          <Link href="/help" className="">
           Help
          </Link>
        </div>
        <div className="relative flex items-center  gap-4 text-[18px] p-3 w-[12rem] rounded-[10px] hover:bg-slate-100 hover:border-r-[3px] border-violet-400 ">
          <ExitToAppRoundedIcon className="" />
          <button onClick={handleLogout}>
            Log Out
        </button>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
