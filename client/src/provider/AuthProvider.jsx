import { createContext, useContext, useEffect, useState } from 'react';
import useDataMutation from '../hook/useDataMutation';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const { loading, error, postData, putData, getData } = useDataMutation();

    const Login = async (email, password) => {
        return await postData('users/login', { email, password });
    };

    const createAccount = async (data) => {
        return await postData('users/register', data);
    };

    const updateAccountInfo = async (data) => {
        return await putData(`users/update-account`, data);
    };

    const updateAccountAvatar = async (data) => {
        return await putData(`users/update-avatar`, data);
    };

    const logoutUser = async () => {
        return await getData('users/logout', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await getData('users/current-user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                if (!userData?.success) throw new Error("Could not retrieve user information");
                setCurrentUser(userData?.data);
            } catch (error) {
                console.log(error);
            }
        };

        getUserData();
    }, []);

    const authInfo = { currentUser, Login, logout: logoutUser, createAccount, updateAccountInfo, updateAccountAvatar, loading, error, setUser: setCurrentUser };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);