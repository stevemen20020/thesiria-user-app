const { Stack } = require("expo-router")
import { MenuProvider } from "react-native-popup-menu"
import { RootSiblingParent } from 'react-native-root-siblings';

const StackLayout = () => {
  return(
    <RootSiblingParent>
    <MenuProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
      <Stack.Screen name="JournalMission" options={{headerShown:false}} />
      <Stack.Screen name="CharacterMission" options={{headerShown:false}} />
      <Stack.Screen name="DetailMission" options={{headerShown:false}} />
      <Stack.Screen name="DetailCharacter" options={{headerShown:false}} />
      <Stack.Screen name="DetailAsset" options={{headerShown:false}} />
      <Stack.Screen name="InventoryList" options={{headerShown:false}} />
      <Stack.Screen name="battle" options={{headerShown:false}} />
    </Stack>
    </MenuProvider>
    </RootSiblingParent>
  )
}

export default StackLayout