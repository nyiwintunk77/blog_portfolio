import React from 'react';
import styled from 'styled-components';

const CrossLineBlock = styled.div`
    .hr-sect {
        display: flex;
        flex-basis: 100%;
        align-items: center;
        color: rgba(0, 0, 0, 0.35);
        font-size: 0.8rem;
        margin: 8px 0px;
        margin-top: 1.5rem;
    }
    .hr-sect::before,
    .hr-sect::after {
        content: '';
        flex-grow: 1;
        background: rgba(0, 0, 0, 0.35);
        height: 1px;
        font-size: 0px;
        line-height: 0px;
        margin: 0px 16px;
    }
`;

const CrossLine = ({text}) => {
    return (
        <CrossLineBlock>
            <div className="hr-sect">{text}</div>
        </CrossLineBlock>
    );
};

export default CrossLine;
