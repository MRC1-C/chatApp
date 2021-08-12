import React, { useState } from 'react'
import useFirestore from '../firebase/useFirestore';
import { useHistory } from 'react-router-dom';
export const AppContext = React.createContext();

export default function AppProvider({children}) {
    const [userName, setUserName] = useState('');
    const [id, setId] = useState('');
    const [visibleAddFriend,setVisibleAddFriend] = useState(false);
    const [userNameFriend, setUserNameFriend] = useState('');
    const history = useHistory();
    if(userName==='') history.push('./login');
    const userCondition = React.useMemo(()=>{
        return {
            fieldName: 'member',
            operator: 'array-contains',
            compareValue: userName,
        }
    },[userName]);

    const friend = useFirestore('friends',userCondition);

    return (
        <AppContext.Provider value={{
            userName,
            setUserName,
            friend,
            id,
            setId,
            visibleAddFriend,
            setVisibleAddFriend,
            userNameFriend, 
            setUserNameFriend
        }}> 
            {children}
        </AppContext.Provider>
    )
}
