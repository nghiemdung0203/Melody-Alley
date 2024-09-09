import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ModalLogin = ({ visible, setVisible }) => {
    const navigation = useNavigation();
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>You need to login to manage your library</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('Login'); setVisible(false); }} style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVisible(false)} style={[styles.modalButton, { backgroundColor: '#007BFF' }]}>
                        <Text style={styles.modalButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ModalLogin

const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    modalButton: { marginTop: 20, padding: 10, backgroundColor: '#ff0000', borderRadius: 10, alignItems: 'center' },
    modalButtonText: { color: 'white', fontWeight: 'bold' }
})