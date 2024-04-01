import styled, { css } from "styled-components";

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 4px;
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

    ${(props) =>
        props.secondary &&
        css`
            background: #62b1f6;
        `
    }

    ${(props) => 
        props.danger &&
        css`
            background: #f40105;
        `
    }

    ${(props) => 
        props.order &&
        css`
            background: #B99960;
        `
    }

    ${(props) => 
        props.large &&
        css`
            width: 135px;
        `
    }

    ${(props) => 
        props.medium &&
        css`
            width: 100px;
        `
    }

    

    ${(props) => 
        props.small &&
        css`
            width: 40px;
        `
    }

    ${(props) =>
        props.cart &&
        css`
            background: #866852;
            width: 330px;
            align-items: center;
        `
    }

    ${(props) =>
        props.login &&
        css`
            background: #866852;
            width: 325px;
            align-items: center;
            margin-top: 25px;
            height: 50px;
        `
    }


`;

export default EasyButton