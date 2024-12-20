import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Keyboard } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as S from './styles';

interface SearchItem {
    id: string;
    name: string;
}

interface SearchBoxProps {
    data: SearchItem[];
    onSelectItem?: (item: SearchItem) => void;
    placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
    data, 
    onSelectItem, 
    placeholder = "Dúvidas, remédios, alergias..." 
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState<SearchItem[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query) {
            const filtered = data.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredData(filtered);
            setShowDropdown(true);
        } else {
            setFilteredData([]);
            setShowDropdown(false);
        }
    };

    const handleSelectItem = (item: SearchItem) => {
        if (onSelectItem) {
            onSelectItem(item);
        }
        setSearchQuery(item.name);
        setShowDropdown(false);
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
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <S.DropdownItem onPress={() => handleSelectItem(item)}>
                                <S.ItemText>{item.name}</S.ItemText>
                            </S.DropdownItem>
                        )}
                        // ListEmptyComponent={<S.EmptyText>Nenhum resultado encontrado</S.EmptyText>}
                    />
                </S.DropdownContainer>
            )}
        </S.SearchBarWrapper>
    );
};

export default SearchBox;

