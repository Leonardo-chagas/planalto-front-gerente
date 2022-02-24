import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import DataHandler from '../DataHandler';
import Icon from 'react-native-vector-icons/AntDesign';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;

const Header = styled.View`
  width: 100%;
  background-color: #088A29;
  height: 50px;
  align-items: flex-start;
  flex-direction: row;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 22px;
  padding: 10px;
`;

const SearchDropdownArea = styled.ScrollView`
  position: absolute;
  top: 25%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const SearchDropdown = styled.View`
  flex-wrap: wrap;
  margin-horizontal: 20px;
`;

const BackButton = styled.TouchableHighlight`
  background-color: #088A29;
  color: red;
  font-size: 22px;
  font-weight: bold;
  width: 10%;
  margin-top: 13px;
`;

const Item = styled.Text`
  font-size: 22px;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ItemArea = styled.TouchableHighlight`
  width: 100%;
  border-width: 1px;
  border-color: #A4A4A4;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: white;
`;

const Button = styled.TouchableHighlight`
  margin-bottom: 10px;
  width: 100%;
  right: 20px; 
`;

const LoginText = styled.Text`
  color: white;
  background-color: #04B431;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const ButtonView = styled.View`
  background-color: #088A29;
  width: 100%;
  padding-left: 50px;
`;

const DeleteArea = styled.Modal`
background-color: rgba(0, 0, 0, 0.3);
`;

const DeleteAreaBody = styled.TouchableOpacity`
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.3);
`;

const SelectButton = styled.TouchableHighlight`
flex: 1;
`;

const SelectText = styled.Text`
color: black;
font-size: 22px;
bottom: 30px;
`;

const YesText = styled.Text`
color: white;
background-color: #04B431;
font-size: 22px;
padding: 10px;
border-radius: 5px;
text-align: center;
`;

const NoText = styled.Text`
color: white;
background-color: red;
font-size: 22px;
padding: 10px;
border-radius: 5px;
text-align: center;
`;

const Box = styled.View`
width: 80%;
height: 50%
background-color: white;
position: absolute;
left: 10%;
top: 25%;
align-items: center;
justify-content: center;
padding: 10px;
`;

const SelectArea = styled.View`
display: flex;
flex-direction: row;
padding: 5px;
`;

const Space = styled.View`
flex: 1;
`;

export default function RotasEdit({navigation, route}) {
    const [viagens, setViagens] = useState(route.params.viagens);
    const [origem, setOrigem] = useState(route.params.origem);
    const [destino, setDestino] = useState(route.params.destino);
    const [dataIda, setDataIda] = useState(route.params.dataIda);
    const [selectVisible, setSelectVisible] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const [currentBus, setCurrentBus] = useState();

    return (
        <Page>
            <Header>
                <BackButton onPress={() => navigation.goBack()}
                underlayColor='#1ab241'>
                    <Icon name="arrowleft" color="white" size={25}/>
                </BackButton>
                <HeaderText>{origem.name} {'->'} {destino.name}</HeaderText>
            </Header>
           
                <SearchDropdownArea>
                    <SearchDropdown>
                    {
                        viagens.map(item=>{
                            return(
                            <ItemArea onPress={() => navigation.navigate("Alterar Horario", {item: item})}
                            navigator={navigation}
                            underlayColor='#b5b5b5'
                            activeOpacity={0.6}>
                            <View>
                                <Item>Ida: {item.tripdate}</Item>
                                <Item>Assentos disponíveis: {32}</Item>
                                <Item>Preço: R${item.price}</Item>
                                <Item>ID do ônibus: {item.bus_id}</Item>
                            </View>
                            </ItemArea>)
                        })
                    }
                    </SearchDropdown>
                </SearchDropdownArea>
        </Page>
    );
}