import React, { useState } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import DataHandler from '../DataHandler';
import DateTimePicker from '@react-native-community/datetimepicker'
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
  width: 100%;  
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
`

const InputView = styled.View`
  width: 90%;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  padding: 5px;
  margin-bottom: 20px;
`;//Area que contem os inputs

const Input = styled.TextInput`
  height: 40px;
  font-size: 18px;
  color: black;
`;//Os inputs em si

const Touchable = styled.TouchableOpacity`
width: 100%;
justift-content: center;
`;

export default function AdicionarBus({navigation, route}) {
    const [origem, setOrigem] = useState(route.params.origem);
    const [destino, setDestino] = useState(route.params.destino);
    const [dataIda, setDataIda] = useState(route.params.dataIda);
    const [onibus, setOnibus] = useState({plate: ''});
    const [horario, setHorario] = useState();
    const [showHorarioSelect, setShowHorarioSelect] = useState(false);

    const OnPressOnibus = async () => {
      /* const req = await fetch("http://52.87.215.20:5000/bus");
      const json = await req.json();
      const buses = json.buses; */
      const listaTeste = [{plate: 'AAA-1234', model: 'model 1', id: 716436},
      {plate: 'ABB-1234', model: 'model 1', id: 778436},
      {plate: 'CCC-1234', model: 'model 2', id: 640362},
      {plate: 'DFG-1234', model: 'model 4', id: 946301}];
      const buses = listaTeste;
      navigation.navigate("Onibus", {buses, OnReturnOnibus: (item) => setOnibus(item)});
    }

    const OnTimeChange = (event, horarioSelecionado) => {
      const tempTime = horarioSelecionado || '';
      const time = tempTime != '' ? tempTime.getHours() + ':' + tempTime.getMinutes() : '';
      setHorario(time);
      setShowHorarioSelect(false);
    }

    const EnviarOnibus = () => {
      if(onibus.plate != '' && horario){
        navigation.navigate('Confirmar', {origem, destino, dataIda, onibus, horario});
      }
      else{
        alert('Preencha os campos obrigatórios');
      }
    }

    return (
        <Page>
            <Header>
                <BackButton onPress={() => navigation.goBack()}
                underlayColor='#1ab241'>
                    <Icon name="arrowleft" color="white" size={25}/>
                </BackButton>
                <HeaderText>{'origem'} {'->'} {'destino'}</HeaderText>
            </Header>

            <Touchable onPress={OnPressOnibus}>
            <InputView>
              <Input 
              placeholder={'Escolha o ônibus'}
              editable={false}
              onTouchStart={OnPressOnibus}
              value={onibus.plate}
              />
            </InputView>
            </Touchable>
           
            <Touchable onPress={() => setShowHorarioSelect(true)}>
            <InputView>
              <Input 
              placeholder={'Escolha o horário'}
              editable={false}
              onTouchStart={() => setShowHorarioSelect(true)}
              value={horario}
              />
            </InputView>
            </Touchable>

            {showHorarioSelect && (
              <DateTimePicker
              testID='dateTimePicker'
              value={new Date()}
              mode={'time'}
              is24Hour={true}
              display='default'
              onChange={OnTimeChange}/>
            )}

        <Button onPress={EnviarOnibus}>
          <LoginText>Enviar</LoginText>
        </Button>
            
        </Page>
    );
}