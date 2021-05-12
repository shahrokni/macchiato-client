import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import UserService from "../../service/user-service/user-service-novel";
import { appGeneralInfo } from "../../setup-general-information";
import Response from "./response-novel";
let socketNewMessageSingltone: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

export const socketNewMessageSingletone = ():
    Promise<Socket<DefaultEventsMap, DefaultEventsMap> | null> => {
    return new Promise((resolve) => {

        if (socketNewMessageSingltone == null) {
            const userService = new UserService();
            userService.getUserId()
                .then((res: Response<string>) => {
                    if (res.isSuccessful && res.outputJson) {
                        socketNewMessageSingltone = io(appGeneralInfo.wsBaseUrl, {
                            forceNew: false,
                            multiplex: true,
                            transports: ["websocket"],
                            reconnection: true,
                            autoConnect: false,
                            query: { userId: res.outputJson }
                        })
                        resolve(socketNewMessageSingltone);
                    }
                })
        }
        else {
            resolve(socketNewMessageSingltone)
        }
    })
}