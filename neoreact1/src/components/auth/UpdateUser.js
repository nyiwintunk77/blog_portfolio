import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { formatDate_day, registedPeriod } from '../../lib/format';
import palette from '../../lib/palette';
import Button from '../common/Button';

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
    input{
        outline: none;
        border: none;
        background: ${palette.gray[2]};
        border-radius: 4px;
        line-height: 1.5rem;
    }
`;

const ErrorBlock = styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 1rem;
    text-align: center;
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
const UpdateUser = ({ information, loading, onChange, onSubmit, error, history }) => {
    if (!information) return null;
    const { username, email, phone, userInfo } = information;
    const { createDate } = userInfo;

    return (
        <>
            <UserInfoBlock>
                <form onSubmit={onSubmit}>
                    {information && !loading && (
                        <>
                            <h3>Edit User Info</h3>
                            <InfoItem>
                                <div>ユーザ名</div>
                                {username}
                            </InfoItem>
                            <InfoItem>
                                <div>登録日</div>
                                {formatDate_day(createDate)}
                                {` ( D+${registedPeriod(createDate)} )`}
                            </InfoItem>
                            <InfoItem>
                                <div>Eメール</div>
                                <input name="email" type="email" value={email} onChange={onChange} required />
                            </InfoItem>
                            <InfoItem>
                                <div>電話番号</div>
                                <input name="phone" value={phone} onChange={onChange} required />
                            </InfoItem>
                            <InfoItem>
                                <div>新パスワード</div>
                                <input name="password" type="password" onChange={onChange} />
                            </InfoItem>
                            <InfoItem>
                                <div>パスワード確認</div>
                                <input name="passwordConfirm" type="password" onChange={onChange} />
                            </InfoItem>
                        </>
                    )}
                    {error && <ErrorBlock>{error}</ErrorBlock>}
                </form>
                <Footer>
                    <Button style={{ background: `${palette.gray[6]}` }} onClick={() => history.goBack()}>
                        戻る
                    </Button>
                    <Button onClick={onSubmit}>修正</Button>
                </Footer>
            </UserInfoBlock>
        </>
    );
};

export default withRouter(UpdateUser);
