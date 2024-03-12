import { createContext, useEffect, useState } from 'react';
import useDataMutation from '../hook/useDataMutation';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
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
        return await postData('users/logout'); // Rename the function to avoid conflict
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userData = await getData('users/current-user');
                console.log(userData);
                if (!userData?.success) throw new Error("Could not retrieve user information");
                setUser(userData?.data);
            } catch (error) {
                console.log(error);
            }
        };

        getUserData();
    }, []);

    const authInfo = { user, Login, logout: logoutUser, createAccount, updateAccountInfo, updateAccountAvatar, loading, error, setUser };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
