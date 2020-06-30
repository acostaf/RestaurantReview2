import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { AddReview } from 'components/AddReview';
import { RestaurantList } from 'components/RestaurantList';
import { RestaurantInfo } from 'components/RestaurantInfo';
import { About } from 'components/About';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={RestaurantList} options={{ headerShown: false }} />
      <HomeStack.Screen
        name="Info"
        component={RestaurantInfo}
        options={{
          title: 'Restaurant Info',
          headerStyle: { backgroundColor: '#0066CC' },
          headerTintColor: '#FFF',
          headerTitleStyle: { color: '#FFF' },
        }}
      />
      <HomeStack.Screen name="AddReview" component={AddReview} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
};

const AboutStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="About" component={About} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const App = () => {
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: string = 'list';

            if (route.name === 'About') iconName = 'info-circle';

            return <Icon name={iconName} color={color} size={size} />;
          },
        })}
        tabBarOptions={{ activeBackgroundColor: '#E6F0FA' }}>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="About" component={AboutStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
