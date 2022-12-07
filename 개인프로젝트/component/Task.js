import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import trash from'../assets/delete.png'; //제거 이미지
import edit from'../assets/edit.png'; //수정 이미지
import done from'../assets/done.png'; // 수정 완료 이미지


const wide = Dimensions.get('window').width //핸드폰 크기에 맞게 설정


const Task = (props) => {
  const [editText, setEditText] = useState(""); //수정 입력받는값
  const [editState, setEditState] = useState(props.item.editState); // 수정 상황인지 

    return(

    <View style={styles.container}>
      

      {editState == false ?  //수정 상황이 아닐 경우 리스트 출력, 수정 상황이면 그 리스트만 수정 상황으로 전환
        <>
        <Text style={{fontSize:20, flex:1, color:"white", fontWeight:"bold"}}>{props.item.task}</Text>
        <TouchableOpacity onPress={()=>setEditState(true)}>
            <Image source={edit} style={{width: 50, height:50, resizeMode: 'cover'}} />
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=>props.deleteTask(props.item.id)}>
            <Image source={trash} style={{width: 50, height:50, resizeMode: 'cover'}} />
        </TouchableOpacity> 
        </>
        :
        <>
        <TextInput style={styles.input} value={editText} onChangeText={setEditText}/>
        <TouchableOpacity onPress={()=>(props.updateTask(props.item.id, editText), setEditState(false))}>
            <Image source={done} style={{width: 50, height:50, resizeMode: 'cover'}} />
        </TouchableOpacity>
        </>
    }
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"row",
      width: wide-90,
      marginLeft: 20,
      
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    input: {
      width: wide-200,
      fontSize: 15,
      backgroundColor: '#f1f3f5',
      borderWidth:1,
      borderRadius:10,
      margin: 5,
      alignItems: 'center'
  
    },
    
  });
export default Task