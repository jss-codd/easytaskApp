import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native'

const SavedTask = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Saved Task</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SavedTask