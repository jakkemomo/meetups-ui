import { FC } from 'react';
import styles from './Header.module.scss';

const Header: FC = () => {
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
          <p>Мой Аккаунт</p>
        </div>
      </div>
    </div >
  );
}

export default Header;
