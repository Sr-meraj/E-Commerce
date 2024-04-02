import { createContext, useContext, useEffect, useState } from 'react';
import useDataMutation from '../hook/useDataMutation';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const { postData, putData, loading, error, getData } = useDataMutation();

    const [currentUser, setCurrentUser] = useState(null);

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
        try {
            const userToken = localStorage.getItem('access_token');
            // if (!userToken) throw new Error("Access token not found in local storage");

            await getData('users/logout', {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userToken = localStorage.getItem('access_token');
                if (!userToken) throw new Error("Access token not found in local storage");

                const userData = await getData('users/current-user', {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                if (!userData || !userData.success) throw new Error("Could not retrieve user information");

                setCurrentUser(userData.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUserData();
    }, []);

    const authInfo = {
        currentUser,
        Login,
        loading,
        error,
        logout: logoutUser,
        createAccount,
        updateAccountInfo,
        updateAccountAvatar,
        setUser: setCurrentUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
