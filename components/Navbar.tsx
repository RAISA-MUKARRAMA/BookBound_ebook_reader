import React from 'react'
import styles from './Navbar.module.css'
import { IoSearchOutline } from 'react-icons/io5'
import { LuSettings2 } from 'react-icons/lu'
import { TbArrowsSort } from 'react-icons/tb'
import { BsFillGrid3X3GapFill } from 'react-icons/bs'
import { LuShoppingCart } from 'react-icons/lu'
import { BsThreeDotsVertical } from 'react-icons/bs'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.leftSection}>
            <h1 className={styles.logo}>BookBound</h1>
            <div className={styles.searchBar}>
                <IoSearchOutline className={styles.searchIcon}/>
                <input type="text" placeholder="Search books, authors, genres..." className={styles.searchInput}/>
            </div>
        </div>
        <div className={styles.rightSection}>
            {/* <LuSettings2 className={styles.icon}/> */}
            {/* <TbArrowsSort className={styles.icon}/> */}
            {/* <BsFillGrid3X3GapFill className={styles.icon}/> */}
            <LuShoppingCart className={styles.icon}/>
            <BsThreeDotsVertical className={styles.icon}/>
        </div>
    </nav> 
  )
}

export default Navbar
