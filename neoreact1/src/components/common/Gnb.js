import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import { withRouter } from 'react-router';
import { BiUserCircle } from 'react-icons/bi';

const GnbBlock = styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    z-index: 999;

    .user-icon {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;

        .icon {
            width: 40px;
            height: 40px;
            padding-left: 0.3rem;
        }
    }
`;

const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    .left {
        font-size: 1.125rem;
        font-weight: bold;
        letter-spacing: 3px;
        cursor: pointer;
    }

    .right {
        display: flex;
        align-items: center;
    }
`;

const Spacer = styled.div`
    height: 4rem;
`;

export const GnbUserIcon = ({ onClickUser, usernameRef, user, gnbMenu }) => {
    return (
        <>
            <div className="user-icon" onClick={onClickUser} ref={usernameRef}>
                <div>{user.username} 様</div>
                <BiUserCircle className="icon" />
            </div>
            {gnbMenu}
        </>
    );
};

const Gnb = ({ history, gnbUserIcon }) => {
    return (
        <>
            <GnbBlock>
                <Wrapper gnb>
                    <div
                        className="left"
                        onClick={() => {
                            history.push('/');
                        }}
                    >
                        TOMATO world
                    </div>
                    <div className="right">{gnbUserIcon}</div>
                </Wrapper>
            </GnbBlock>
            <Spacer />
        </>
    );
};

export default withRouter(Gnb);
