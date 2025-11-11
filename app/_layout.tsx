import { UserProvider } from '@/src/Presentation/Context/User.Context'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const _layout = () => {
  return (
    <SafeAreaProvider>
        <UserState>
            <Stack
                screenOptions={{
                    headerShown:false
                }}
            />
        </UserState>
    </SafeAreaProvider>
  )
}

export default _layout

const UserState = ( {children}:any ) => {
    return <UserProvider>{children}</UserProvider>
}