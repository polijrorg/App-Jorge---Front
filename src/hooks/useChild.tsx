import React, { useContext, useState, createContext } from 'react';
import Child from '@interfaces/Child';

interface ChildContextData {
    activeChild: Child;
    setActiveChild: (data: Child) => void;
    childList: Child[];
    setChildList: (data: Child[]) => void;
}

const ChildContext = createContext<ChildContextData>({} as ChildContextData);

export const ChildProvider: React.FC<{ children?: React.ReactNode | undefined }> = ({ children }) => {
    
    const [activeChild, setActiveChild] = useState<Child>(null);
    const [childList, setChildList] = useState<Child[]>(null);

    return (
        <ChildContext.Provider value={{ activeChild, setActiveChild, childList, setChildList }}>
            {children}
        </ChildContext.Provider>
    );
};

export const useChildContext = () => useContext(ChildContext);