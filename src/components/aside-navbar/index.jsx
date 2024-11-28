import styles from './index.module.css'

import Calendar from '../../assets/calendar.svg?react'
import Search from '../../assets/search.svg?react'
import TrendingUp from '../../assets/trending-up.svg?react'
import Settings from '../../assets/settings.svg?react'
import WatchList from '../../assets/list.svg?react'

import { Link, Outlet } from 'react-router-dom'
import { usePreferenceContext } from '../../contexts/preferences.context'

function AsideNavbar() {
    const { preferences: { asideOpen } } = usePreferenceContext();

    return (
        <>
            <aside className={asideOpen ? styles['aside'] : `${styles['aside']} ${styles['hidden']}`}>
                <nav className={styles["aside-navbar"]}>

                    <Link to={'/'}>
                        <div className={styles["aside-navbar__item"]}>
                            <Calendar className={styles["aside-navbar__icon"]} />
                            <span>Earnings Calendar</span>
                        </div>
                    </Link>


                    <Link to={'/watch-list'}>
                        <div className={styles["aside-navbar__item"]}>
                            <WatchList className={styles["aside-navbar__icon"]} />
                            <span>WatchList</span>
                        </div>
                    </Link>

                    <Link to={'/trends'}>
                        <div className={styles["aside-navbar__item"]}>
                            <TrendingUp className={styles["aside-navbar__icon"]} />
                            <span>Stock Trends</span>
                        </div>
                    </Link>


                    <Link to={'/stocks'}>
                        <div className={styles["aside-navbar__item"]}>
                            <Search className={styles["aside-navbar__icon"]} />
                            <span>Stocks</span>
                        </div>
                    </Link>

                    <Link to={'/settings'}>
                        <div className={styles["aside-navbar__item"]}>
                            <Settings className={styles["aside-navbar__icon"]} />
                            <span>Preferences</span>
                        </div>
                    </Link>
                </nav>
            </aside>


            <div className={asideOpen ? styles["outlet"] : ''}>
                <Outlet />
            </div>
        </>
    )
}

export default AsideNavbar