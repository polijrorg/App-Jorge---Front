import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as S from './styles';
import Medicine from '@interfaces/Medicine';
import MedicinesService from '@services/MedicinesService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface SearchBoxProps {
    data: Medicine[];
    onSelectItem?: (item: Medicine) => void;
    placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
    data, 
    onSelectItem, 
    placeholder = "Dúvidas, remédios, alergias..." 
}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState<Medicine[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (query) {
            const token = await AsyncStorage.getItem('@jorge:token')
            const filtered = await MedicinesService.search({name: query})
            setFilteredData(filtered);
            setShowDropdown(true);
        } else {
            setFilteredData([]);
            setShowDropdown(false);
        }
    };

    const handleSelectItem = (item: Medicine) => {
        if (onSelectItem) {
            onSelectItem(item);
        }
        setSearchQuery(item.name);
        setShowDropdown(false);
        setFilteredData([]);
    };

    return (
        <S.SearchBarWrapper>
            <S.SearchBar>
                <S.TextInput
                    placeholder={placeholder}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    multiline={false}
                />
                <Ionicons name="search" size={20} color="#808080" />
            </S.SearchBar>

            {showDropdown && filteredData.length > 0 && (
                <S.DropdownContainer>
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.idmedicinesdefault}
                        style={{ width:'100%' }}
                        renderItem={({ item }) => (
                            <S.DropdownItem onPress={() => handleSelectItem(item)}>
                                <S.ItemText>{item.name}</S.ItemText>
                            </S.DropdownItem>
                        )}
                    />
                </S.DropdownContainer>
            )}
        </S.SearchBarWrapper>
    );
};

export default SearchBox;

