import { NavigationContainer } from '@react-navigation/native';
import { DetailsScreen, HomeScreen, ProductDetailScreen, ProfileScreen } from './components/screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Icons for tabs

  const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
  
function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown:false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {

  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Profile') iconName = 'person';
            else if (route.name === 'Settings') iconName = 'settings';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',          
        })}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} options={{
        title: 'ShopEasy', // Title in the default header
        headerStyle: { backgroundColor: '#4CAF50' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
     
    </NavigationContainer>
  );
}


