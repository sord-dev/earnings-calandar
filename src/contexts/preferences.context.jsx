/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';

const defaultPreferences = {
    theme: localStorage.getItem('preferences_theme') || 'dark',
    asideOpen: localStorage.getItem('preferences_asideOpen') || true,
    toggleTheme: (theme) => { },
    toggleAside: () => { },
};

// Create a new context with a default value
const PreferenceContext = createContext(defaultPreferences);

// Create a provider component
export const PreferenceContextProvider = ({ children }) => {
    const [preferences, setPreferences] = useState(defaultPreferences);

    const toggleTheme = (theme) => {
        if (['light', 'dark'].includes(theme)) {
            localStorage.setItem('theme', theme);
            return setPreferences({ ...preferences, theme });
        }

        return setPreferences({ ...preferences, theme: 'dark' });
    }

    const toggleAside = () => {
        localStorage.setItem('asideOpen', !preferences.asideOpen);
        setPreferences({ ...preferences, asideOpen: !preferences.asideOpen });
    }

    useEffect(() => {
        if (preferences.theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [preferences]);

    return (
        <PreferenceContext.Provider value={{ preferences, toggleTheme, toggleAside }}>
            {children}
        </PreferenceContext.Provider>
    );
};

PreferenceContextProvider.propTypes = {
    children: propTypes.node,
};

// Create a custom hook to use the new context
export const usePreferenceContext = () => {
    const context = useContext(PreferenceContext);
    if (context === undefined) {
        throw new Error('usePreferenceContext must be used within a PreferenceContextProvider');
    }
    return context;
};
