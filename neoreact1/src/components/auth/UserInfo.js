import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import Button from '../common/Button';
import { formatDate_day, registedPeriod } from '../../lib/format';

const UserInfoBlock = styled.div`
    margin: 0 auto;
    width: 30%;
    @media (max-width: 1350px) {
        width: 50%;
    }
    @media (max-width: 785px) {
        width: 90%;
    }

    h3 {
        margin-top: 2rem;
        margin-bottom: 2rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid;
    }
`;

const InfoItem = styled.div`
    margin-top: 1rem;
    display: flex;
    div {
        width: 30%;
    }
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;
    font-size: 0.8rem;
    button {
        text-decoration: none;
        background-color: ${palette.blue[5]};
        &:hover {
            background-color: ${palette.blue[4]};
        }
    }
`;

const UserInfo = ({ information, meFlag, onCancel, onEdit }) => {
    const { username, email, phone, createDate } = information;

    if (!information) return null;

    return (
        <>
            <UserInfoBlock>
                <div>
                    <h3>ユーザ情報</h3>
                    <InfoItem>
                        <div>名前</div>
                        {username}
                    </InfoItem>
                    <InfoItem>
                        <div>登録日</div>
                        {formatDate_day(createDate)}
                        {` ( D+${registedPeriod(createDate)} )`}
                    </InfoItem>
                    {meFlag && (
                        <>
                            <InfoItem>
                                <div>Eメール</div>
                                {email}
                            </InfoItem>
                            <InfoItem>
                                <div>電話番号</div>
                                {phone}
                            </InfoItem>
                        </>
                    )}
                </div>
                <Footer>
                    <Button style={{ background: `${palette.gray[6]}` }} onClick={onCancel}>キャンセル</Button>
                    {meFlag && <Button onClick={onEdit}>修正</Button>}
                </Footer>
            </UserInfoBlock>
        </>
    );
};

export default UserInfo;
