import React, { useContext, useState, createContext } from 'react';
import Child from '@interfaces/Child';
import GrowthData from '@interfaces/GrowthData';

interface ChildContextData {
    activeChild: Child;
    setActiveChild: (data: Child) => void;
    growthData: GrowthData[];
    setGrowthData: (data: GrowthData[]) => void;
    childList: Child[];
    setChildList: (data: Child[]) => void;
}

const ChildContext = createContext<ChildContextData>({} as ChildContextData);

export const ChildProvider: React.FC<{ children?: React.ReactNode | undefined }> = ({ children }) => {
    
    const [activeChild, setActiveChild] = useState<Child>(null);
    const [childList, setChildList] = useState<Child[]>(null);
    const [growthData, setGrowthData] = useState<GrowthData[]>([]);

    return (
        <ChildContext.Provider value={{ activeChild, setActiveChild, growthData, setGrowthData, childList, setChildList }}>
            {children}
        </ChildContext.Provider>
    );
};

export const useChildContext = () => useContext(ChildContext);