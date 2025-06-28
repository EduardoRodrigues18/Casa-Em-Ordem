import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskScreen from '../screens/TaskScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Tasks" component={TaskScreen} />
    </Tab.Navigator>
  );
}