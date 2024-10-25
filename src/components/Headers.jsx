import React, { useEffect, useState } from 'react'
import { GrMail } from 'react-icons/gr'
import { IoIosCall } from 'react-icons/io'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { FaLinkedinIn, FaFacebookF, FaUser, FaLock, FaList } from 'react-icons/fa'
import { AiOutlineTwitter, AiFillGithub, AiFillHeart, AiFillShopping } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_card_products, get_wishlist_products } from '../store/reducers/cardReducer'

const Headers = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categorys } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { card_product_count, wishlist_count } = useSelector(state => state.card)

    const { pathname } = useLocation()
    const [showSidebar, setShowSidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')

    const search = () => {
        navigate(`/products/search?category=${category}&&value=${searchValue}`)
    }

    const redirect_card_page = () => {
        if (userInfo) {
            navigate(`/card`)
        } else {
            navigate(`/login`)
        }
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(get_card_products(userInfo.id))
            dispatch(get_wishlist_products(userInfo.id))
        }
    }, [userInfo, dispatch])

    return (
        <div className='w-full bg-white'>
            <div className='header-top bg-[#eeeeee] md-lg:hidden'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='flex w-full justify-between items-center h-[50px] text-slate-500'>
                        <ul className='flex justify-start items-center gap-8'>
                            <li className='flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>
                                <span><GrMail /></span>
                                <span>bivekmehta9@gmail.com</span>
                            </li>
                            <span>Multi vendor ecommerce</span>
                        </ul>
                        <div>
                            <div className='flex justify-center items-center gap-10'>
                                <div className='flex justify-center items-center gap-4'>
                                    <a href="#"><FaFacebookF /></a>
                                    <a href="#"><AiOutlineTwitter /></a>
                                    <a href="#"><FaLinkedinIn /></a>
                                    <a href="#"><AiFillGithub /></a>
                                </div>
                                <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]'>
                                    <img src="http://localhost:3000/images/language.png" alt="Language" />
                                    <span><MdOutlineKeyboardArrowDown /></span>
                                    <ul className='absolute invisible transition-all duration-200 rounded-sm text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10'>
                                        <li>Nepali</li>
                                        <li>English</li>
                                    </ul>
                                </div>
                                {
                                    userInfo ? <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm' to='/dashboard'>
                                        <span><FaUser /></span>
                                        <span>{userInfo.name}</span>
                                    </Link> : <Link to='/login' className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
                                        <span><FaLock /></span>
                                        <span>Login</span>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-white'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
                        <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
                            <div className='flex justify-between items-center'>
                                <Link to='/'>
                                    <img src="http://localhost:3000/images/logo.png" alt="logo" />
                                </Link>
                                <div className='justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden' onClick={() => setShowSidebar(false)}>
                                    <span><FaList /></span>
                                </div>
                            </div>
                        </div>
                        <div className='md-lg:w-full w-9/12'>
                            <div className='flex justify-between md-lg:justify-center items-center flex-wrap pl-8'>
                                <ul className='flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden'>
                                    <li>
                                        <Link to='/' className={`p-2 block ${pathname === '/' ? 'text-[#7fad39]' : 'text-slate-600 hover:text-[#7fad39]'}`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to='/shops' className={`p-2 block ${pathname === '/shops' ? 'text-[#7fad39]' : 'text-slate-600 hover:text-[#7fad39]'}`}>Shop</Link>
                                    </li>
                                    <li>
                                        <Link to='/blog' className={`p-2 block ${pathname === '/blog' ? 'text-[#7fad39]' : 'text-slate-600 hover:text-[#7fad39]'}`}>Blog</Link>
                                    </li>
                                    <li>
                                        <Link to='/about' className={`p-2 block ${pathname === '/about' ? 'text-[#7fad39]' : 'text-slate-600 hover:text-[#7fad39]'}`}>About</Link>
                                    </li>
                                    <li>
                                        <Link to='/contact' className={`p-2 block ${pathname === '/contact' ? 'text-[#7fad39]' : 'text-slate-600 hover:text-[#7fad39]'}`}>Contact</Link>
                                    </li>
                                </ul>
                                <div className='flex md-lg:hidden justify-center items-center gap-5'>
                                    <div className='flex justify-center gap-5'>
                                        <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                            <span className='text-xl text-red-500'><AiFillHeart /></span>
                                            {
                                                wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                                    {wishlist_count}
                                                </div>
                                            }
                                        </div>
                                        <div onClick={redirect_card_page} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                            <span className='text-xl text-orange-500'><AiFillShopping /></span>
                                            {
                                                card_product_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                                    {card_product_count}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden md-lg:block'>
                <div onClick={() => setShowSidebar(true)} className={`fixed duration-200 transition-all ${showSidebar ? 'invisible' : 'visible'} hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}>
                </div>
                <div className={`w-[300px] z-[9999] transition-all duration-200 fixed  ${showSidebar ? '-left-[300px]' : 'left-0'} top-0 overflow-y-auto bg-white h-screen py-6 px-8`}>
                    <div className='flex justify-start flex-col gap-6'>
                        <Link to='/'>
                            <img src="http://localhost:3000/images/logo.png" alt="logo" />
                        </Link>
                        <div className='flex justify-star items-center gap-10'>
                            <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]'>
                                <img src="http://localhost:3000/images/language.png" alt="Language" />
                                <span><MdOutlineKeyboardArrowDown /></span>
                                <ul className='absolute invisible transition-all duration-200 rounded-sm text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10'>
                                    <li>Nepali</li>
                                    <li>English</li>
                                </ul>
                            </div>
                            {
                                userInfo ? <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm' to='/dashboard'>
                                    <span><FaUser /></span>
                                    <span>{userInfo.name}</span>
                                </Link> : <Link to='/login' className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
                                    <span><FaLock /></span>
                                    <span>Login</span>
                                </Link>
                            }
                        </div>
                        <ul className='flex justify-start items-start flex-col gap-3'>
                            <li onClick={() => setShowSidebar(true)}><Link to='/'>Home</Link></li>
                            <li onClick={() => setShowSidebar(true)}><Link to='/shops'>Shop</Link></li>
                            <li onClick={() => setShowSidebar(true)}><Link to='/blog'>Blog</Link></li>
                            <li onClick={() => setShowSidebar(true)}><Link to='/about'>About</Link></li>
                            <li onClick={() => setShowSidebar(true)}><Link to='/contact'>Contact</Link></li>
                        </ul>
                        <div className='flex justify-center gap-5'>
                            <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                <span className='text-xl text-red-500'><AiFillHeart /></span>
                                {
                                    wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                        {wishlist_count}
                                    </div>
                                }
                            </div>
                            <div onClick={redirect_card_page} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                <span className='text-xl text-orange-500'><AiFillShopping /></span>
                                {
                                    card_product_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                        {card_product_count}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Headers
