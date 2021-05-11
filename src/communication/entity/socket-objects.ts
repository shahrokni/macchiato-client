import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { appGeneralInfo } from "../../setup-general-information";
let socketNewMessageSingltone : Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

export const socketNewMessageSingletone = ()=>{
    if(socketNewMessageSingltone==null){     
        socketNewMessageSingltone = io(appGeneralInfo.wsBaseUrl, {
            forceNew: false,
            multiplex: true,
            transports: ["websocket"],
            reconnection: true,
            autoConnect: false,          
        })
    }
    return socketNewMessageSingltone;    
}