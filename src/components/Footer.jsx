import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            textAlign: 'center',
            padding: 'var(--spacing-lg) var(--spacing-sm)',
            color: 'var(--color-text-secondary)',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-ui)',
            opacity: 0.8
        }}>
            <p style={{ marginBottom: '8px', fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>
                "Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
            </p>
            <p>&copy; {new Date().getFullYear()} Biblia365</p>
        </footer>
    );
};

export default Footer;
