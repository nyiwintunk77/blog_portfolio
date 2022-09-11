import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from '../components/auth/UserInfo';
import { withRouter } from 'react-router';
import qs from 'qs';
import { getUserInfo, initialize, setOriginalUserInfo } from '../modules/userInfo';

const UserInfoContainer = ({ location, history }) => {
    const dispatch = useDispatch();
    const { information, error, loading, user } = useSelector(({ userInfo, loading, user }) => ({
        information: userInfo.userInfo,
        error: userInfo.error,
        loading: loading['userInfo/USERINFO'],
        user: user.user,
    }));
    const { username, meFlag } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });

    const onCancel = () => {
        history.goBack();
        dispatch(initialize());
    };

    const onEdit = () => {
        dispatch(setOriginalUserInfo(information));
        history.push('/updateuser');
    }

    useEffect(() => {
      dispatch(getUserInfo({ username, meFlag}));
    }, [dispatch, username, meFlag]);

    return (
        <>
            {!loading && information && (
                <UserInfo information={information} error={error} meFlag={JSON.parse(meFlag)} onCancel={onCancel} onEdit={onEdit}/>
            )}
        </>
    );
};

export default withRouter(UserInfoContainer);
