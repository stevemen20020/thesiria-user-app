const { Stack } = require("expo-router")
import { MenuProvider } from "react-native-popup-menu"

const StackLayout = () => {
  return(
    <MenuProvider>
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
      <Stack.Screen name="JournalMission" options={{headerShown:false}} />
      <Stack.Screen name="CharacterMission" options={{headerShown:false}} />
      <Stack.Screen name="DetailMission" options={{headerShown:false}} />
      <Stack.Screen name="DetailCharacter" options={{headerShown:false}} />
      <Stack.Screen name="DetailAsset" options={{headerShown:false}} />
      <Stack.Screen name="InventoryList" options={{headerShown:false}} />
    </Stack>
    </MenuProvider>
  )
}

export default StackLayout