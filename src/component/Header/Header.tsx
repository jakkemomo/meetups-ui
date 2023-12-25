import { FC } from 'react';
import styles from './Header.module.scss';

const Header: FC = () => {
    return (
        <div className={styles.header_wrapper}>
            <h1 className={styles.header_logo}>
                MEVENT
            </h1>
            <div className={styles.menu_list}>
                <div className={styles.menu_list_subs}>
                    <p>Подписки</p>
                    <div className={styles.subs_counter}></div>
                </div>
                <div>
                    <p>Мой Аккаунт</p>
                </div>
            </div>
        </div >
    );
}

export default Header;