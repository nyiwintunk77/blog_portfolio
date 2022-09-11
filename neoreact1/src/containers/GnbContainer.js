import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Gnb, { GnbUserIcon } from '../components/common/Gnb';
import { logout } from '../modules/user';
import GnbMenu from '../components/common/GnbMenu';
import Button from '../components/common/Button';
import { useMenu } from '../lib/useMenu';

const GnbContainer = ({ history }) => {
    const { user } = useSelector(({ user }) => ({ user: user.user }));

    const dispatch = useDispatch();

    const outsideRef = useRef(null);
    const usernameRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useMenu(outsideRef, usernameRef);

    const handleLogout = () => {
        dispatch(logout());
        history.push('/');
    };

    const onClickUser = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Gnb
            user={user}
            gnbUserIcon={
                user ? (
                    <GnbUserIcon
                        onClickUser={onClickUser}
                        usernameRef={usernameRef}
                        user={user}
                        gnbMenu={isMenuOpen && <GnbMenu outsideRef={outsideRef} onLogout={handleLogout} user={user} />}
                    />
                ) : (
                    <Button to="/login">ログイン</Button>
                )
            }
        />
    );
};

export default withRouter(GnbContainer);
