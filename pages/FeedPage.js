import React from 'react';
import { FiRss, FiCode, FiTool, FiZap } from 'react-icons/fi';
import styles from '../styles/FeedPage.module.css';

const FeedPage = () => {
    return (
        <div className={styles.feedContainer}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.titleContainer}>
                    <FiRss className={styles.icon} />
                    <h1 className={styles.title}>Your Development Feed</h1>
                </div>
                <div className={styles.debugInfo}>
                    <FiCode />
                    <span>Debug mode active</span>
                    <FiZap />
                    <span>Components commented out</span>
                </div>
            </header>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Debug Cards */}
                <div className={styles.cardsGrid}>
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconContainer}>
                                <FiTool className={styles.icon} />
                            </div>
                            <h2 className={styles.cardTitle}>PostCreator</h2>
                        </div>
                        <p className={styles.cardDescription}>Component currently disabled for debugging</p>
                        <div className={styles.codePlaceholder}>
                            {/* <PostCreator /> */}
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.iconContainer}>
                                <FiTool className={styles.icon} />
                            </div>
                            <h2 className={styles.cardTitle}>PostsList</h2>
                        </div>
                        <p className={styles.cardDescription}>Component currently disabled for debugging</p>
                        <div className={styles.codePlaceholder}>
                            {/* <PostsList /> */}
                        </div>
                    </div>
                </div>

                {/* Debug Information */}
                <div className={styles.alert}>
                    <svg className={styles.alertIcon} width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div className={styles.alertContent}>
                        <h3>Debug Mode Active</h3>
                        <p>This is a development preview. Uncomment components in the code to restore full functionality.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>Development Environment • {new Date().toLocaleDateString()}</p>
            </footer>
        </div>
    );
};

export default FeedPage;