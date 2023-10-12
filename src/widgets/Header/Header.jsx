import React from 'react';

import styles from './Header.module.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <p className={styles.header__text}>
                Posts
            </p>
        </header>
    );
};

export default Header;