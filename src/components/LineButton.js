import React from "react";
import styled from 'styled-components/native';

const StyledTouchableOpacity = styled.TouchableOpacity`
    background-color: orange;
`;

const StyledText = styled.Text`
    font-size: 20px;
    padding: 5px;
    font-weight: bold;

`;

const LineButton = () => {
    return (
        <StyledTouchableOpacity>
            <StyledText>완료항목 전체삭제</StyledText>
        </StyledTouchableOpacity>
    );
}

export default LineButton;