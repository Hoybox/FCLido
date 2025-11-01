
import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from './useLocalStorage';

const LOGO_DATA_URL = 'https://lh3.googleusercontent.com/d/1ywPPqbphpaFkBXvrB66kTXBk0sxp8pK7';

interface SiteContextType {
    logoUrl: string;
    setLogoUrl: (url: string) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [logoUrl, setLogoUrl] = useLocalStorage<string>('fclido_logo_url', LOGO_DATA_URL);

    return (
        <SiteContext.Provider value={{ logoUrl, setLogoUrl }}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSite = (): SiteContextType => {
    const context = useContext(SiteContext);
    if (context === undefined) {
        throw new Error('useSite must be used within a SiteProvider');
    }
    return context;
};