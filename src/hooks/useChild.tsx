import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState, createContext } from 'react';
import api from '@services/api';
import UserService from '@services/UserService';
import User from '../interfaces/User';
import Child from '@interfaces/Child';

interface ChildContextData {
    activeChild: Child;
    setActiveChild: (data: Child) => void;
    childList: Child[];
    setChildList: (data: Child[]) => void;
}

const ChildContext = createContext<ChildContextData>({} as ChildContextData);

export const ChildProvider: React.FC<{ children?: React.ReactNode | undefined }> = ({ children }) => {
    
    const [activeChild, sett] = useState<Child>(null);
    const [childList, setChildList] = useState<Child[]>(null);

    function setActiveChild(a: Child) {
        sett(a);
        console.log('Isso aqui é coisa do ChildContext!');
    }

    return (
        <ChildContext.Provider value={{ activeChild, setActiveChild, childList, setChildList }}>
            {children}
        </ChildContext.Provider>
    );
};

export const useChildContext = () => useContext(ChildContext);