import React from 'react';
import styled, { css } from 'styled-components';

const ResponsiveBlock = styled.div`
    margin: 0 auto;

    h2 {
        margin-bottom: 3rem;
    }

    ${(props) =>
        props.gnb &&
        css`
            width: 1200px;
            @media (max-width: 1580px) {
                width: 768px;
            }
        `}

    ${(props) =>
        props.main &&
        css`
            width: 60%;
        `}

    @media (max-width: 768px) {
        width: 95%;
    }
`;

const Responsive = ({ children, ...rest }) => {
    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
};

export default Responsive;
