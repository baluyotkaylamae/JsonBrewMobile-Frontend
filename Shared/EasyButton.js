import styled, { css } from "styled-components";

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 50%; 
    padding: 10px;
    margin: 5px;
    justify-content: center;
    background: transparent;

    ${(props) =>
        props.primary &&
        css`
            background: #5cb85c;
        `
    }

`;

export default EasyButton;
