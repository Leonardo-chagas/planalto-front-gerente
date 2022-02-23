import { StackActions } from '@react-navigation/routers';
import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import DataHandler from '../DataHandler';
import Icon from 'react-native-vector-icons/AntDesign';

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;//Area que contem os elementos da tela

const Header = styled.View`
  width: 100%;
  background-color: #088A29;
  height: 50px;
  align-items: flex-start;
  flex-direction: row;
`;//Area que contem o titulo da tela

const HeaderText = styled.Text`
  color: white;
  font-size: 22px;
  padding: 10px;
`;//Titulo da tela

const SearchDropdownArea = styled.ScrollView`
  position: absolute;
  top: 15%;
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

const ButtonSymbol = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: bold;
  width: 100%;
  justify-content: center;
  padding-left: 10px;
  padding-top: 10px;
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
  margin-left: 25px;
  width: 85%;  
`;

const LoginText = styled.Text`
  color: white;
  background-color: #04B431;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

export default function Confirmar({navigation, route}) {
    const [origem, setOrigem] = useState(route.params.origem);
    const [destino, setDestino] = useState(route.params.destino);
    const [dataIda, setDataIda] = useState(route.params.dataIda);
    const [horario, setHorario] = useState(route.params.horario);
    const [onibus, setOnibus] = useState(route.params.onibus);
    const [preco] = useState(route.params.preco);

    const Confirmar = async () => {
      const dataArray = dataIda.split('/');
      //const horaArray = horario.split(':');
      const dataCompleta = dataArray[2] + '-' + dataArray[1] + '-' + dataArray[0] + 'T' + horario + '19.723Z';
      const dataCerta = dataArray[2] + '-' + dataArray[1] + '-' + dataArray[0];
      const req = await fetch('http://34.207.157.190:5000/trip', {
          method: 'POST',
          body: JSON.stringify({
            access_token: DataHandler.token,
            origin_id: origem.id,
            destination_id: destino.id,
            bus_id: onibus.id,
            tripdate: dataCerta,
            price: parseFloat(preco)
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const json = await req.json();
        if(json.success == true){
          alert('Ônibus adicionado com sucesso');
          navigation.dispatch(StackActions.pop(3));
        }
        else{
          alert('Houve um erro ao adicionar o ônibus');
        }
        //alert('Ônibus adicionado com sucesso');
    }

    return (
        <Page>
            <Header>
                <BackButton onPress={() => navigation.goBack()}
                underlayColor='#1ab241'>
                    <Icon name="arrowleft" color="white" size={25}/>
                </BackButton>
                <HeaderText>Confirmação de Ônibus</HeaderText>
            </Header>
           
                <SearchDropdownArea>
                    <SearchDropdown>
                        <ItemArea>
                            <View>
                                <Item>{origem.name} -{'>'} {destino.name}</Item>
                                <Item>Data: {DataHandler.dataIda}</Item>
                                <Item>Horário: {horario}</Item>
                                <Item>Placa do ônibus: {onibus.plate}</Item>
                                <Item>Modelo do ônibus: {onibus.model}</Item>
                                <Item>ID do ônibus: {onibus.id}</Item>
                                <Button onPress={Confirmar}>
                                    <LoginText>Confirmar</LoginText>
                                </Button>
                            </View>
                        </ItemArea>
                    </SearchDropdown>
                </SearchDropdownArea>
        </Page>
    );
}