import React, { useState } from 'react';
import { FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as S from './styles';

const data = [
  { id: '1', name: 'Carlos' },
  { id: '2', name: 'Ana' },
  { id: '3', name: 'Bianca' },
  { id: '4', name: 'Daniel' },
  { id: '5', name: 'Fernanda' },
  // Adicione mais itens conforme necessário
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]); // Limpa os resultados quando a busca está vazia
    }
  };

  return (
    <S.Container>
      <S.SearchBar>
        <S.TextInput
          placeholder="Dúvidas, remédios, alergias..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Ionicons name="search" size={20} color="#808080" />
      </S.SearchBar>

      {/* Exibe a lista apenas se houver uma busca e resultados */}
      {searchQuery && filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <S.ItemText>{item.name}</S.ItemText>}
          ListEmptyComponent={<S.EmptyText>Nenhum resultado encontrado</S.EmptyText>}
        />
      )}
    </S.Container>
  );
};

export default SearchScreen;
