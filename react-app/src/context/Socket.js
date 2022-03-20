import { createContext, useContext, useState } from 'react';

export const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState();

    return (
        <>
            <SocketContext.Provider value={{socket, setSocket}}>
                {children}
            </SocketContext.Provider>
        </>
    );
}

export default SocketProvider;
