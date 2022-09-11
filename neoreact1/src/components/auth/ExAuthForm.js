import React from 'react';
import styled from 'styled-components';

const ExAuthFormBlock = styled.div`
    div {
        display: flex;
        
    }
    input {
        width: 50px;
        height: 50px;
        margin: 10px;
    }


`;

const ExAuthForm = ({onClick}) => {
    return (
        <ExAuthFormBlock>
            <div>
                <input type="image" src="/img/googleLogo.png" alt="google login" onClick={onClick}/>
            </div>
        </ExAuthFormBlock>
    );
};

export default ExAuthForm;
