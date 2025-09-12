import React from 'react'

import Colors from '../../constants/color'
import Header from '../layout/Header'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native'

const SavedTask = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Header title="Saved Task" showBack={true} /> */}
        <Text>Saved Task</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default SavedTask