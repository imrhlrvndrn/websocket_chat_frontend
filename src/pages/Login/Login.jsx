import React from 'react';
import { auth, db, provider } from '../../firebase';
import { useDataLayerValue } from '../../DataLayer';

// styled-components
import StyledLogin from './StyledLogin';

// images
import WhatsAppLogo from '../../React icons/whatsapp_logo.webp';

const Login = () => {
    const [{ user }, dispatch] = useDataLayerValue();

    const handleLogin = () => {
        auth.signInWithPopup(provider)
            .then((data) => {
                console.log('Google Auth user: ', data.user);

                dispatch({
                    type: 'SET_USER',
                    user: {
                        userId: data?.user?.uid,
                        name: data?.user?.displayName,
                        phoneNumber: data?.user?.phoneNumber,
                        email: data?.user?.email,
                        email_is_verified: data?.user?.emailVerified,
                        photoURL: data?.user?.photoURL,
                    },
                });

                return user;
            })
            .catch((error) => alert(error.message));
    };

    return (
        <StyledLogin>
            <div className='loginContainer'>
                <img src={WhatsAppLogo} alt='WhatsApp logo' className='logo' />
                <button onClick={handleLogin}>Signin with Google</button>
            </div>
        </StyledLogin>
    );
};

export default Login;
