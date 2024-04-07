import { createContext, useContext, useEffect, useState } from 'react';
import useDataMutation from '../hook/useDataMutation';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const { postData, putData, setLoading, loading, error, getData } = useDataMutation();

    const [currentUser, setCurrentUser] = useState(null);

    const Login = async (email, password) => {
        return await postData('users/login', { email, password });
    };

    const createAccount = async (data) => {
        return await postData('users/register', data);
    };

    const updateAccountInfo = async (data) => {
        const userToken = localStorage.getItem('access_token');
        if (!userToken) throw new Error("Access token not found in local storage");
        setLoading(true)
        const res = await putData(`users/update-account`, data, userToken);
        setCurrentUser(res);
        setLoading(false)
        return res
    };

    const updateAccountAvatar = async (data) => {
        return await putData(`users/update-avatar`, data);
    };

    const ChangePassword = async (data) => {
        const userToken = localStorage.getItem('access_token');
        if (!userToken) throw new Error("Access token not found in local storage");
        return await putData(`users/change-password`, data, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });

    };

    const logoutUser = async () => {
        try {
            const userToken = localStorage.getItem('access_token');
            // if (!userToken) throw new Error("Access token not found in local storage");

            return await getData('users/logout', {
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
                if (!userToken) return;

                const userData = await getData('users/current-user', {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                console.log(userData);
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
        ChangePassword,
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
