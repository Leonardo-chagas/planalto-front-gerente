import React, { useState } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import DataHandler from '../DataHandler';

const dataHandler = new DataHandler();

const Page = styled.SafeAreaView`
  flex: 1;
  background-color: #F2F2F2;
  align-items: center;
`;

const Container = styled.View`
  width: 90%;
`;

const InputView = styled.View`
  width: 90%;
  border-bottom-width: 1px;
  border-bottom-color: #A4A4A4;
  padding: 5px;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  font-size: 18px;
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

const SenhaText = styled.Text`
  color: #A4A4A4;
  font-size: 22px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const CadastroText = styled.Text`
  color: #2E9AFE;
  font-size: 24px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const Header = styled.View`
  width: 100%;
  background-color: #088A29;
  height: 50px;
  margin-bottom: 20px;
  align-items: flex-start;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 22px;
  padding: 10px;
`;

export default function Login({navigation}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const aguardarLogin = async () =>{
    if (password != '' && username != '') {
      const req = await fetch('http://http://34.207.157.190:5000/login', {
        method: 'POST',
        body: JSON.stringify({
          email: username,
          password: password
        }),
        headers:{
            'Content-Type': 'application/json'
        }
      });
      const json = await req.json();
      console.log(json.access_token);

      if(json.success == true){
        dataHandler.setAccessToken(json.access_token);
        dataHandler.setRefreshToken(json.refresh_token);
        navigation.navigate('Menu', {dataHandler: dataHandler});
       } else {
        alert('Login Negado - ' + json.message);
      } 

    } else {
      alert('Preencha as informações!')
    }
  }
  
  return (
    <Page>
      <Header>
        <HeaderText>Login</HeaderText>
      </Header>
      <Container>
        <Image source={require('../images/logo.png')} style={{height: 60, width: 370, marginBottom: 20}} />
        <InputView>
          <Input value={username} onChangeText={t=>setUsername(t)} placeholder={'E-mail/CPF/CNPJ'}/>
        </InputView>
        <InputView>
          <Input secureTextEntry={true} value={password} onChangeText={t=>setPassword(t)} placeholder={'Senha'}></Input>
        </InputView>
        <Button onPress={aguardarLogin}>
          <LoginText>Fazer Login</LoginText>
        </Button>
      </Container>
    </Page>
  );
}