import { View, Text } from 'react-native'
import React from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import Feather from 'react-native-vector-icons/Feather'
const BottomSheet = ({ bottomSheetRef, children }) => {

    return (
        <RBSheet
            ref={bottomSheetRef}
            height={200}
            closeOnPressBack={true}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0, 0, 0, 0.2)"
                },
                draggableIcon: {
                    backgroundColor: 'gray',
                    width: 100
                },
                container: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30 
                }
            }}
        >
           <View>
           {children}
           </View>
        </RBSheet>
    )
}

export default BottomSheet