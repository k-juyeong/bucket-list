import React, {useState} from "react";
import styled from "styled-components/native";
import PropTypes from 'prop-types';
import {images} from '../images'
import IconButton from "./IconButton";
import Input from "./Input";

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({theme})=> theme.itemBackground};
    border-radius: 10px;
    padding: 5px;
    margin: 3px 0px;
`
const Contents = styled.Text`
    flex: 1;
    font-size: 24px;
    color: ${({theme, completed})=> completed ? theme.done : theme.text};
    text-decoration-line: ${({completed}) => completed ? 'line-through' : 'none'};
`

const BucketList = ({list, deleteBucket, toggleBucket, updateBucket}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(list.text);


    // 수정버튼 클릭 시
    const _handleUpdateButtonPress = () => {
        setIsEditing(true);
    }

    // 수정 완료
    const _onSubmitEditing = () => {
        if(isEditing) {
            const currentBuckets = {...list,text};
            setIsEditing(false);
            updateBucket(currentBuckets);
        }
    }

    // 수정 취소 시 원래대로
    const _onBlur = () => {
        if (isEditing) {
            setIsEditing(false);
            setText(list.text);
        }
    }

    return isEditing ? 
    (
        <Input 
            value={text}
            onChangeText={text => setText(text)}
            onSubmitEditing={_onSubmitEditing}   
            onBlur={_onBlur} 
        />
    ):(
        <Container>
            <IconButton
                type={list.completed ? images.completed : images.uncompleted}
                id={list.id}
                onPressOut={toggleBucket}
            />
            <Contents completed={list.completed}>{list.text}</Contents>
           {list.completed ||  <IconButton type={images.update} onPressOut={_handleUpdateButtonPress}/>}
            <IconButton type={images.delete} id={list.id} onPressOut={deleteBucket} completed={list.completed}/>
        </Container>
    )
}

BucketList.propTypes = {
    list: PropTypes.object.isRequired,
    deleteBucket: PropTypes.func.isRequired,
    toggleBucket: PropTypes.func.isRequired,
    updateBucket: PropTypes.func.isRequired,
}

export default BucketList;