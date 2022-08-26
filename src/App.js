import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, Alert } from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from './theme'
import Input from './components/Input';
import React, {useRef, useState} from 'react';
import { Dimensions } from 'react-native';
import IconButton from './components/IconButton';
import {images} from './images';
import BucketList from './components/BucketList';
import DeleteAll from './components/DeleteAll';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';


const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #101010;
  align-items: center;
  justify-content: flex-start;

`
const Title = styled.Text`
  width: ${({width})=> width - 40}px;
  font-size: 40px;
  font-weight: 500;
  color: white;
  margin: 3px 0;
  padding: 15px 20px;
  text-align: center;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({width})=> width - 40}px;
`;

export default function App() {
  const width = Dimensions.get('window').width;

  const [isReady, setIsReady] = useState(false); // 앱실행 준비상태
  const [newList, setNewList] = useState('');    // 새로운 항목
  const [lists, setLists] = useState({});        // 
  // const refInput = useRef(null)

  // 데이터 저장
  const _saveLists = async lists => {
    try {
      await AsyncStorage.setItem('lists', JSON.stringify(lists));
      setLists(lists);
    } catch (e) {
      console.error(e);
    }
  }

  // 데이터 호출
  const _loadLists = async lists => {
    const loadedLists = await AsyncStorage.getItem('lists');
    setLists(JSON.parse(loadedLists || '{}'));
  }

  // 추가
  const _addBucketList = () => {
    const ID = Date.now().toString();
    const currentBuckets = {
      [ID] : {id:ID, text: newList, completed: false},
    };
    setNewList('');
    // setLists({...lists, ...newBucketObject});
    _saveLists({...lists, ...currentBuckets});
    // refInput.current.focus();
  }

  // 작성 중
  const _handleTextChange = text => {
    setNewList(text);
  }

  // 개별 삭제
  const _deleteBucketList = id => {
    const currentBuckets = {...lists};
    delete currentBuckets[id];
    // setLists(currentBuckets);
    _saveLists(currentBuckets);
  }

  // 완료항목 전체 삭제
  const _deleteAllBucketList = () => {
    
    const currentBuckets = {...lists};
    
    const completedBucketLists = 
      Object.entries(currentBuckets)
            .filter(list=>list[1].completed === true);

    // 완료 항목이 없는 경우 확인창 띄우지 않음
    if (completedBucketLists.length < 1) return;


    const deleteCompletedItems = ()=>{
      const filteredBuckets = 
        Object.fromEntries(Object.entries(currentBuckets)
                                .filter(list=> list[1].completed === false))
      _saveLists(filteredBuckets);
    }


    Alert.alert(
      "삭제",               // 경고창 제목
      "완료항목 전체를 삭제하시겠습니까?",   //경고창 메세지
      [
        {
          text: "예",
          onPress: () => deleteCompletedItems(),
        },
        {
          text: "아니오",
          onPress: () => console.log("OK Pressed")
        }
      ]
    );

    // const currentBuckets = {...lists};
    // for(let currentBucket in currentBuckets){
    //   if (currentBucket.completed) {
    //     delete currentBuckets[currentBucket.id];
    //   }
    // }
    // _saveLists(currentBuckets);
  }
  

  // 완료
  const _toggleBucketList = id => {
    const currentBuckets = {...lists};
    currentBuckets[id]['completed'] = !currentBuckets[id]['completed'];
    // setLists(currentBuckets);
    _saveLists(currentBuckets);

  }

  // 수정
  const _updateBucketList = list => {
    const currentBuckets = {...lists};
    currentBuckets[list.id] = list;
    // setLists(currentBuckets);
    _saveLists(currentBuckets);
  }

  // 수정 취소 시 원래대로
  const _onBlur = () => {
    setNewList('');
  }

  return isReady? (
  <ThemeProvider theme={theme}>
      <Container>
        <StatusBar barStyle="light-content" backgroundColor={theme.background}/>
        <Title width={width}>My Bucket List</Title>
        <Input
          placeholder="+ 항목추가"
          value={newList}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addBucketList}
          onBlur={_onBlur}
          // refInput={refInput}
        />
        <List width={width}>
          {Object.values(lists)
            .reverse()
            .map(list=>(
              <BucketList
                key={list.id}
                list={list}
                deleteBucket={_deleteBucketList}
                toggleBucket={_toggleBucketList}
                updateBucket={_updateBucketList}
              />
            ))
          }
        </List>
        <DeleteAll
          text='완료항목 전체삭제'
          onPressOut={_deleteAllBucketList}
        />
      </Container>
    </ThemeProvider>
  ) : (
    <AppLoading 
      startAsync={_loadLists}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}

