const { Stack } = require("expo-router")

const StackLayout = () => {
  return(
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
      <Stack.Screen name="JournalMission" options={{headerShown:false}} />
      <Stack.Screen name="DetailMission" options={{headerShown:false}} />
    </Stack>
  )
}

export default StackLayout