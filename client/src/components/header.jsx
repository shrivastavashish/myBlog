import { Button, Navbar, Dropdown, TextInput, Avatar } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon, FaSun } from 'react-icons/fa';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';


export default function header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const { currentUser} = useSelector(state => state.user);
    const theme = useSelector(state => state.theme.theme);
  return (
    <div>
      <Navbar className='border-b-2' >
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Ashish</span>
            Shrivastav
        </Link>
        <form>
            <TextInput
            type='text' 
            placeholder='Search...' 
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
                {theme === 'light' ? <FaSun /> : <FaMoon />}
            </Button>
            {currentUser ? (
                <Dropdown arrowIcon={false} inline label={
                    <Avatar
                    alt='user'
                    img={currentUser.profilePicture}
                    rounded
                    />
                    }
                    
                >
                    <Dropdown.Header>
                        <span className='block text-sm'> @{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'> 
                        {currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard'}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign Out</Dropdown.Item>
                </Dropdown>
            ):
            (
            
                <Link to='/signin'>
                    <Button gradientDuoTone='purpleToBlue' outline>Sign In</Button>
                </Link>
            )
        }

            <Navbar.Toggle />

        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={'div'}>
                    <Link to='/projects'>
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>


    </div>
  )
}
