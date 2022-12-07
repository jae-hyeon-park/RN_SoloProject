import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Button, Pressable, ScrollView , Modal} from 'react-native';
import Task from './component/Task';
import Calendars from './component/Calendar'; //달력 기능
import { db } from './firebaseConfig';
import { 
  addDoc, 
  collection, 
  getDocs,
  doc,
  updateDoc,
  deleteDoc,  
  } from "./node_modules/firebase/firestore";

const wide = Dimensions.get('window').width //핸드폰 크기에 맞게 설정

export default function App() {
  const [task, setTask] = useState(''); //할일 추가부분
  const [flag, setFlag] = useState(0); //번호 체크를 위해 사용
  const [tasks, setTasks] = useState({ // 할일 모음
  
  });
  


  const addTask = () =>{ //업무 추가 기능
    addtoDB(); //db저장
    const newTask = {[flag]: {flag:flag, task:task, editState:false}} //db에 넣기에 object 형태
    
    setTasks({...tasks, ...newTask}); //기존 할일 + 추가 할일 
    setTask('');
    setFlag(flag+1);
    console.log(tasks);
    alert("추가완료");
    readfromDB(); //tasks에 각 id를 부여하기 위해 한번더 읽어오게 시킴
  }


  const deleteTask = async (id) =>{ //할일 제거 기능

    try {
     const docRef = doc(db, "list", id);
     await deleteDoc(docRef);

     alert("제거완료");

     readfromDB(); //제거 후 리스트 불러오기
    } catch (error) {
     console.log(error.message)
    }

   

  }

  const updateTask = async(id, task) =>{ //바로 그자리에서 수정기능

    try {
      const docRef = doc(db, "list", id);
      await updateDoc(docRef, {
        flag: flag, 
        task: task, //할일
        editState: false // 수정 상황
      });
 
      alert("업데이트 완료");
      readfromDB();
     } catch (error) {
      console.log(error.message)
     }
 
   }


  const addtoDB = async ()=>{ //할일 DB에 저장
    try{
      await addDoc(collection(db, "list" ), {
        flag: flag,
        task: task,
        editState: false
      });
      alert("DB 저장 완료")
      
    }catch(error){
      console.log(error.message)
    }
  }

  const readfromDB = async ()=>{ // 1.들어오는 데이터를 그냥 넣는게 아닌 특정 변수에 넣을수있는지, 2. 아래 doc=> 뒤의 함수부분에 다른 함수 실행가는한지 예를 들어 한번 map실행마다 flag+1가능한자
    try{
     const data = await getDocs(collection(db,"list"))
      setTasks(data.docs.map(doc => ({...doc.data(), id: doc.id})))
      console.log(tasks)
      
    }catch(error){
      console.log(error.message)
    }
  }


  useEffect(()=>{ //실행하자마자 한번만 작동
    readfromDB()
  },[])

 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.ready}> 
      <Text style={styles.title}>To-Do List!!</Text>
      <Calendars/>
      </View>

      {/* 입력창과 버튼을 하나의 묶음으로 하기위해 */}
      <View style={styles.ready}> 
      <TextInput style={styles.input}
      placeholder = "추가 할 일" 
      value={task} onChangeText={setTask} 
      />
      <Pressable 
          style={[styles.button, styles.buttonClose]}
          onPress={() => { addTask()} }
      >
              <Text style={styles.textStyle}>저장</Text> 
      </Pressable>
      </View>

      

      <ScrollView>
      {Object.values(tasks)
      .map((item,idx)=>( //tasks의 목록을 뽑아와 하나의 task마다 모든 값을 item이라는 object형태로 넘겨주고 삭제에 대한 함수도 넘겨준다(휴지통 버튼이 Task에서 다뤄지기에).
      <Task key={idx} item={item} deleteTask={deleteTask}  updateTask={updateTask} />   //수정기능하다 에러나서 멈춤
      ))
      }
      </ScrollView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  ready:{
    flexDirection: 'row'
  },
  title: {
    fontSize: 45,
    fontWeight:"500",
    color: 'black',
    marginTop: 70,
    marginLeft: 10,
    marginBottom: 30,
    color: 'white'
  },
  input: {
    width: wide-90,
    fontSize: 15,
    backgroundColor: '#f1f3f5',
    borderWidth:1,
    borderRadius:10,
    margin: 5,
    alignItems: 'center'

  },
  button: {
    
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});
