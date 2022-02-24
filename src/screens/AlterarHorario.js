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

export default function AlterarHorario({navigation, route}) {
    const [rota] = useState(route.params.item);
    const [horario, setHorario] = useState();
    const [showHorarioSelect, setShowHorarioSelect] = useState(false);

    const OnTimeChange = (event, horarioSelecionado) => {
      const tempTime = horarioSelecionado || '';
      const time = tempTime != '' ? tempTime.getHours() + ':' + tempTime.getMinutes() : '';
      setHorario(time);
      setShowHorarioSelect(false);
    }

    const ConfirmarHorario = async () => {
      if(horario){
        const reqrefresh = await fetch("http://34.207.157.190:5000/refresh", {
          method: 'POST',
          body: JSON.stringify({
            refresh_token: DataHandler.refresh
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        });
      const jsonrefresh = await reqrefresh.json();
      if(jsonrefresh.success){
        DataHandler.token = jsonrefresh.access_token;
        DataHandler.refresh = jsonrefresh.refresh_token;
      }
        const horaCerta = horario.split(":");
        const data = new Date(rota.tripdate);
        const dataNova = new Date(data.getFullYear(), data.getMonth(), data.getDate(), parseInt(horaCerta[0]), parseInt(horaCerta[1]), 0);
        //data.setHours(horaCerta[0], horaCerta[1], 0);
        const req = await fetch('http://34.207.157.190:5000/trip/' + rota.id, {
          method: 'PUT',
          body: JSON.stringify({
            access_token: DataHandler.token,
            origin_id: rota.origin_id,
            destination_id: rota.destination_id,
            bus_id: rota.bus_id,
            tripdate: dataNova,
            price: rota.price
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const json = await req.json();
        if(json.success){
            alert("Horário alterado com sucesso");
            navigation.goBack();
        }
        else{
            alert("Ocorreu um erro ao tentar alterar o horário");
        }
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

        <Button onPress={ConfirmarHorario}>
          <LoginText>Confirmar</LoginText>
        </Button>
            
        </Page>
    );
}