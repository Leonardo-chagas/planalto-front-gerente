import React, { useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DataHandler from '../DataHandler';

const Stack = createNativeStackNavigator();

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;//Area que contem os elementos da tela

const Container = styled.View`
  width: 90%;
`;//Area que contem o conteudo principal da tela

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

const Button = styled.TouchableHighlight`
  margin-bottom: 10px;
  width: 100%;  
`;//Area que fica os botões

const LoginText = styled.Text`
  color: white;
  background-color: #04B431;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;//Texto de realizar o login

const Header = styled.View`
  width: 100%;
  background-color: #088A29;
  height: 50px;
  margin-bottom: 20px;
  align-items: flex-start;
`;//Area que contem o titulo da tela

const HeaderText = styled.Text`
  color: white;
  font-size: 22px;
  padding: 10px;
  margin-left: 20px;
`;//Titulo da tela

const MenuButton = styled.TouchableHighlight`
  color: red;
  font-size: 22px;
  font-weight: bold;
  width: 7%;
  margin-top: 12px;
  position: absolute;
`;

const Touchable = styled.TouchableOpacity``;

export default function ViagemForm({navigation, route}) {
  const dia = new Date().getDate();
  const mes = new Date().getMonth()+1;
  const ano = new Date().getFullYear();
  const data = dia + '/' + mes + '/' + ano;

  var novoMes = Number(mes)+2;
  var novoAno = Number(ano);
  if(novoMes > 12){
    novoMes -= 12;
    novoAno += 1;
  }

  const ultimoMes = novoMes.toString();
  const ultimoAno = novoAno.toString();
  const ultimaData = '31/' + ultimoMes + '/' + ultimoAno;

  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [origemId, setOrigemId] = useState();
  const [destinoId, setDestinoId] = useState();
  const [dataIda, setDataIda] = useState(data);
  const [dataVolta, setDataVolta] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const onPressOrigem = async () => {
    const reqCities = await fetch('http://52.87.215.20:5000/city', {
        method: 'GET'
      });
      const jsonCities = await reqCities.json();
    navigation.navigate('Pesquisa de Origem', {jsonCities, onReturnOrigem: (item) => {
      setOrigem(item.name);
      setOrigemId(item.id);
    }})
  }
  const onPressDestino = async () => {
    const reqCities = await fetch('http://52.87.215.20:5000/city', {
        method: 'GET'
      });
      const jsonCities = await reqCities.json();
    navigation.navigate('Pesquisa de Destino', {jsonCities, onReturnDestino: (item) => {
      setDestino(item.name);
      setDestinoId(item.id);
    }})
  }

  const Buscar = async () => {
    if(origem && destino && dataIda){
      /* var origemID = 0;
      var destinoID = 0;
      const reqCities = await fetch('http://52.87.215.20:5000/city', {
        method: 'GET'
      });
      const jsonCities = await reqCities.json();
      jsonCities.cities.forEach(item => {
        if(item.name == origem)
          origemID = item.id;
        if(item.name == destino)
          destinoID = item.id;
      }); */
      const ida = dataIda;
      const req = await fetch('http://52.87.215.20:5000/tripByDate', {
        method: 'POST',
        body: JSON.stringify({
          tripdate: dataIda,
          origin_id: origemId,
          destination_id: destinoId
        }),
        headers:{
          'Content-type': 'application/json'
        }
      });
      var viagens = [];
      const json = await req.json();
      json.trips.forEach(item => {
        viagens.push({dataIda:item.tripdate, preco:item.price, id:item.id, busID: item.bus_id});
      })
      //const viagens = [{ida:'12/03/2021',assentos:32, preco:102.09, id: 123}];
      DataHandler.origem = origem;
      DataHandler.destino = destino;
      DataHandler.dataIda = dataIda;
      navigation.navigate('Viagens', {viagens: viagens, origem: origem, destino: destino, dataIda: dataIda})
    }
    else{
      alert('Preencha os campos obrigatórios');
    }
  }

  return (
    <Page>
      <Header>
        <MenuButton onPress={() => navigation.goBack()}
        underlayColor='#1ab241'>
            <Icon name="arrowleft" color="white" size={25}/>
        </MenuButton>
        <HeaderText>Pesquisa de Rota</HeaderText>
      </Header>

      <Container>
        <Image source={require('../images/logo.png')} style={{height: 50, width: 330, marginBottom: 20}} />
        <Touchable onPress={onPressOrigem}>
        <InputView>
          <Input 
          placeholder={'Escolha sua Origem'}
          editable={false}
          onTouchStart={onPressOrigem}
          value={origem}
          />
        </InputView>
        </Touchable>
        <Touchable onPress={onPressDestino}>
        <InputView>
          <Input 
          placeholder={'Escolha seu Destino'}
          editable={false}
          onTouchStart={onPressDestino}
          value={destino}/>
        </InputView>
        </Touchable>
        <InputView>
          <DatePicker
          style={styles.datePickerStyle}
          date={dataIda}
          mode="date"
          placeholder="Escolha a data de ida"
          format="YYYY-MM-DD"
          minDate={data}
          maxDate={ultimaData}
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
              borderWidth: 0,
            },
          }}
          onDateChange={(dataIda) => {setDataIda(dataIda)}}/>
        </InputView>
        <InputView>
        <DatePicker
        style={styles.datePickerStyle}
        date={dataVolta}
        mode="date"
        placeholder="Escolha a data de volta (opcional)"
        format="DD/MM/YYYY"
        minDate={data}
        maxDate={ultimaData}
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
            borderWidth: 0,
          },
        }}
        onDateChange={(dataVolta) => {setDataVolta(dataVolta)}}/>
        </InputView>
        <Button onPress={Buscar}>
          <LoginText>Buscar</LoginText>
        </Button>
      </Container>
    </Page>
  );
}

const styles = StyleSheet.create({
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  }
});