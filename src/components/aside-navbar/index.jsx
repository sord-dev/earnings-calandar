import React from 'react'
import styles from './index.module.css'

import Calendar from '../../assets/calendar.svg?react'
import { Outlet } from 'react-router-dom'

function AsideNavbar({ active = false  }) {
    if(!active) return <><Outlet /></>
    return (
        <>
            <aside className={styles["aside"]}>
                <nav className={styles["aside-navbar"]}>

                    <div className={styles["aside-navbar__item"]}>
                        <Calendar className={styles["aside-navbar__icon"]} />
                        <span>Earnings Calendar</span>
                    </div>

                </nav>
            </aside>
            <Outlet />
        </>
    )
}

export default AsideNavbar