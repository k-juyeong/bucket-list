import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const StyledDeleteAll = styled.Text`
    font-size: 30px;
    font-weight: 400;
    line-height: 40px;
    margin: 5px 5px;
    padding: 0 5px;
    width: 100%;
    height: 40px;
    text-align: center;
    color: ${({theme})=>theme.text};
    background-color: darkslategrey;
`

const DeleteAll = ({deleteAllBucket}) => {
    return (
        <TouchableOpacity onPressOut={deleteAllBucket}>
            <StyledDeleteAll>Delete All</StyledDeleteAll>
        </TouchableOpacity>
    )
}

export default DeleteAll;