import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1>ApplyMate</h1>
            <h2>Your AI Application Assistant</h2>
        </header>
    );
};

export default Header;