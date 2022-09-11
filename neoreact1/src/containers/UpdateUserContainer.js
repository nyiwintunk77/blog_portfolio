import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import UpdateUser from '../components/auth/UpdateUser';
import { updateUser, changeForm } from '../modules/userInfo';

const UpdateUserContainer = ({ history }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const { information, loading, user } = useSelector(({ userInfo, loading, user }) => ({
        information: userInfo,
        error: userInfo.error,
        loading: loading['userInfo/UPDATEUSER'],
        user: user.user,
    }));

    const onSubmit = (e) => {
        e.preventDefault();
        const { userId, password, passwordConfirm, email, phone } = information;
        const { originEmail, originPhone } = {
            ...information,
            originEmail: information.userInfo.email,
            originPhone: information.userInfo.phone,
        };
        const changePassword = password === '' ? undefined : password;

        if (password !== passwordConfirm) {
            setError('パスワードが一致しません！');
            return;
        }

        if (email === originEmail && phone === originPhone && !changePassword) {
            setError('変動はありません！');
            return;
        }
        dispatch(updateUser({ userId, password: changePassword, email, phone }));
        setSuccess(true);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        dispatch(changeForm({ key: name, value }));
    };

    const goBack = (e) => {
        e.preventDefault();
        history.goBack();
    };

    useEffect(()=>{
        if(success) history.goBack('');
    },[history, success])

    return (
        <UpdateUser
            information={information}
            error={error}
            loading={loading}
            onChange={onChange}
            onSubmit={onSubmit}
            goBack={goBack}
        />
    );
};

export default withRouter(UpdateUserContainer);
