import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  OrigemPesquisa  from './screens/OrigemPesquisa'
import  DestinoPesquisa  from './screens/DestinoPesquisa'
import Viagens from './screens/Viagens'
import Login from './screens/Login';
import Confirmar from './screens/Confirmar';
import MainMenu from './screens/Menu';
import AdicionarBus from './screens/AdicionarBus';
import Onibus from './screens/Onibus';
import RotaForm from './screens/RotaForm';
import Rotas from './screens/Rotas';
import AlterarHorario from './screens/AlterarHorario';
import ViagemForm from './screens/ViagemForm';

const Stack = createNativeStackNavigator();

export default () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name='Login'
        component={Login}/>
      <Stack.Screen
        name='Menu'
        component={MainMenu}/>
      <Stack.Screen
        name='Adicionar Onibus'
        component={AdicionarBus}/>
      <Stack.Screen
        name='Pesquisa de Rotas'
        component={RotaForm}/>
      <Stack.Screen
        name='Onibus'
        component={Onibus}/>
      <Stack.Screen
        name='Pesquisa de Origem'
        component={OrigemPesquisa}/>
      <Stack.Screen
        name='Pesquisa de Destino'
        component={DestinoPesquisa}/>
      <Stack.Screen
        name='Rotas'
        component={Rotas}/>
      <Stack.Screen
        name='Confirmar'
        component={Confirmar}/>
      <Stack.Screen
        name='Alterar Horario'
        component={AlterarHorario}/>
      <Stack.Screen
        name='Pesquisa de Viagens'
        component={ViagemForm}/>
      <Stack.Screen
        name='Viagens'
        component={Viagens}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
