import {FC} from 'react';
import styles from './Header.module.scss';
import {selectAccessToken, selectIsAuthorized, selectRefreshToken, useAppSelector} from "@/shared/model";
import {Link} from "react-router-dom";
import {LayoutProfileCard} from "@/widgets/LayoutProfileCard";

const Header: FC = () => {
    const isAuthorized = useAppSelector(selectIsAuthorized)
    const refreshToken: string | undefined = useAppSelector(selectRefreshToken)
    const accessToken: string | undefined = useAppSelector(selectAccessToken)
    return (
        <div className={styles.header_wrapper}>
            <h1 className={styles.header_logo}>
                MEVENT
            </h1>
            <div className={styles.menu_list}>
                <div className={styles.menu_list}>
                    <p>Подписки</p>
                    <div/>
                </div>
                <div>
                    {refreshToken && accessToken && (
                        <LayoutProfileCard access={accessToken} refresh={refreshToken}/>
                    )}
                    {!isAuthorized && (
                        <div>
                            <Link to="/login">Войти</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
