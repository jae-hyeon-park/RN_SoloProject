import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, } from "react-native";
import { Calendar } from 'react-native-calendars';

const Calendars = () =>{ // 달력 모달로 출력
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View style={styles.centeredView}>

      <Modal
        animationType="slide"
        transparent={true} 
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}> 
          <View style={styles.modalView}>
            
          <Calendar style={styles.calendar}/>
            

            <Pressable 
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible)} 
            }
              
            >
              <Text style={styles.textStyle}>확인</Text> 
            </Pressable>
          </View>
        </View>
      </Modal>

        <Pressable 
              style={[styles.button2, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible)}
            }
              
            >
              <Text style={styles.textStyle}>달력</Text> 
            </Pressable>
      
      
    </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    
    },

    button2: {
      
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginLeft: 50,
        marginTop: 25
      },

      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },

    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
   
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: 'bold'
    },
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 50,
        
      }
    
  });

export default Calendars;