import React from "react"
import { useState, useEffect, useCallback } from "react"
import { FlatList, TouchableOpacity, Modal, TextInput, View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { debounce } from "lodash"
import styled from "styled-components/native"

const SearchBarWrapper = styled.View`
  width: 100%;
  margin-bottom: 10px;
`

export const Wrapper = styled(View)`
    width: 100%;
`

const Title = styled(Text)`
  color: gray;
  font-weight: 600;
  font-feature-settings: 'liga' off, 'clig' off;
  font-size: 12px;
  font-style: normal;
  line-height: 24px;
  letter-spacing: 0.5px;
  font-family: "PoppinsRegular";
`

export const Container = styled(TextInput)`
  min-height: 42px;
  max-height: 42px;
  background-color: white;
  padding: 0 10px;
  border-radius: 100px;
  width: 100%;
  border: solid 1px lightgray;
  font-family: "PoppinsRegular";
  line-height: 20px;
`;

const DropdownContainer = styled.View`
  width: 100%;
  background-color: white;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  margin-top: 5px;
  z-index: 1;
`

const ItemText = styled.Text`
  padding: 10px;
  font-size: 14px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`

const ModalContent = styled.View`
  width: 90%;
  max-height: 80%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const ToggleButton = styled(TouchableOpacity)`
  position: absolute;
  right: 10px;
  top: 34px;
`;

const ModalTitle = styled.Text`
  font-size: 18px;
  font-family: "Poppins_600SemiBold";
`

const SearchInput = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
  font-family: "PoppinsRegular";
`

const ModalItemText = styled.Text`
  padding: 15px 10px;
  font-size: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  font-family: "PoppinsRegular";
`

const EmptyListText = styled.Text`
  padding: 20px;
  text-align: center;
  color: #999;
  font-family: "PoppinsRegular";
`

interface Props {
  onSelectItem: (item: string) => void
  onType?: (a: string) => void
  placeholder?: string
  initialValue?: string
}

interface City {
  id: number
  nome: string
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string
      }
    }
  }
}

const CityDropdown: React.FC<Props> = ({ onSelectItem, onType, initialValue, placeholder = "Digite sua cidade" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<City[]>([]);
  const [data, setData] = useState<City[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchTextInModal, setSearchTextInModal] = useState("");

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Erro ao buscar cidades:", error));
  }, [])

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      if (text.length > 0) {
        const filtered = data.filter((city) => city.nome.toLowerCase().includes(text.toLowerCase())).slice(0, 20);
        setFilteredData(filtered);
      } else {
        setFilteredData([]);
      }
    }, 300),
    [data],
  )

  const handleSearch = (text: string) => {
    setSearchTextInModal(text);
    debouncedSearch(text);
  }

  const handleSelectItem = (item: string) => {
    onSelectItem(item);
    setSearchQuery(item);
    setModalVisible(false);
    if (onType) onType(item);
  }

  const openModal = () => {
    setSearchTextInModal("");
    setFilteredData([]);
    setModalVisible(true);
  }

  return (
    <SearchBarWrapper>
      <Wrapper>
        <Title>Cidade</Title>
        <TouchableOpacity onPress={openModal}>
          <Container
            placeholderTextColor="lightgray"
            placeholder={placeholder}
            value={searchQuery || initialValue}
            editable={false}
            multiline={false}
            onTouchStart={openModal}
          />
        </TouchableOpacity>
        <ToggleButton onPress={openModal}>
          <Ionicons name="pencil-outline" size={20} color="black" />
        </ToggleButton>
      </Wrapper>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Selecione sua cidade</ModalTitle>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </ModalHeader>

            <SearchInput
              placeholder="Buscar cidade..."
              value={searchTextInModal}
              onChangeText={handleSearch}
              autoFocus={true}
            />

            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectItem(item.nome)}>
                  <ModalItemText>
                    {item.nome} - {item.microrregiao.mesorregiao.UF.sigla}
                  </ModalItemText>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <EmptyListText>
                  {searchTextInModal.length > 0 ? "Nenhuma cidade encontrada" : "Digite para buscar cidades"}
                </EmptyListText>
              }
            />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </SearchBarWrapper>
  )
}

export default CityDropdown

