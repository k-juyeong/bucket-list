import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import LineButton from "./LineButton";

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

const DeleteAll = ({text, onPressOut}) => {
    return (
        <TouchableOpacity onPressOut={onPressOut}>
            <StyledDeleteAll>{text}</StyledDeleteAll>
        </TouchableOpacity>
    )
}

LineButton.defaultProps = {
    text: '임시',
    onPressOut: () => {}
}

LineButton.propTypes = {
    text: PropTypes.string.isRequired,
    onPressOut: PropTypes.func.isRequired,
}

export default DeleteAll;