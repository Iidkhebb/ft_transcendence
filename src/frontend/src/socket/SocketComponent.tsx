// SocketComponent.js
import store, {
    addFriendRequest,
    addNewMessageToGroupChat,
    addNewMessageToPrivateChat,
    setGameState,
    setGroupChats,
    setNotifications,
    setPrivateChats,
    setSocket,
} from "@/store/store";
import { useEffect, useState } from "react";
import socketGame from "./gameSocket";
import chatSocket from "./chatSocket";
import { AchievementDto, NotificationType, SocketResponse } from "./types";
import { notifications } from "@mantine/notifications";
import { TypeMessage } from "@/Components/dashboard/type";
import api from "@/api";
import { Image } from "@mantine/core";

const SocketComponent = () => {
    const [connected, setConnected] = useState(false);
    useEffect(() => {
        if (!socketGame.connected) {
            socketGame.connect();
        } else {
            setConnected(false);
        }
        if (!chatSocket.connected) {
            chatSocket.connect();
        } else {
            setConnected(false);
        }
    }, [connected]);

    useEffect(() => {
        // Connect to the socket server
        socketGame.on("gameState", (gameState: any) => {
            store.dispatch(setGameState(gameState));
        });

        store.dispatch(setSocket(socketGame));
        store.dispatch(setSocket(chatSocket));

        socketGame.on("error", (err: string) => {
            console.log(err);
            notifications.show({
                title: "Error",
                message: err,
                color: "red",
            });
        });

        // Event handler for socket connection
        chatSocket.on("connect", () => {
            console.log("/chat: Connected to server");
        });

        // Event handler for socket disconnection
        chatSocket.on("disconnect", () => {
            console.log("/chat: Disconnected from server");
        });

        socketGame.on("connect", () => {
            console.log("/game: Connected to server");
        });

        socketGame.on("disconnect", () => {
            console.log("/game: Disconnected from server");
        });

        chatSocket.on("message", (data: any) => {
            if (store.getState().chats.PrivateChats.length == 0) {
                chatSocket.emit("reconnect", {});
            }
            store.dispatch(addNewMessageToPrivateChat(data));
        });

        chatSocket.on("PublicMessage", (data: SocketResponse | any) => {
            if (data?.status) {
                return;
            }
            const newMessage = {
                content: data.content,
                createdAt: new Date(),
                senderId: data.senderId,
                user: {
                    avatarUrl: data.avatarUrl,
                    username: data.senderUsername,
                },
                senderUsername: data.senderUsername,
                channelId: data.channelId,
            };
            store.dispatch(addNewMessageToGroupChat(newMessage));
        });

        chatSocket.on("notifications", (data: NotificationType[]) => {
            // add the notification to the store
            store.dispatch(setNotifications(data));
        });

        chatSocket.on("notification", (data: NotificationType) => {
            store.dispatch(addFriendRequest(data));
            if (data.type == "AcceptRequest") {
                chatSocket.emit("reconnect");
            }
        });

        socketGame.on("achievement", (data: AchievementDto) => {
            console.log(data);
            notifications.show({
                title: data.name,
                message: data.description,
                color: "blue",
                icon: <Image src={api.getUri() + data.iconUrl.slice(1)} width={40} height={40} radius="xl" />,
            });
        });

        chatSocket.on("privateChat", (data) => {
            // console.log("privateChat", data);
            store.dispatch(setPrivateChats(data));
        });

        chatSocket.on("publicChat", (data) => {
            // console.log("publicChat", data);
            store.dispatch(setGroupChats(data));

            /* update the chat in current group */
            // const currentGroup: any = store.getState().chats.currentChatGroup;
            // if (currentGroup) {
            //     const newGroup = data.find((group: any) => group.id == currentGroup.id);
            //     if (newGroup) {
            //         store.dispatch(setGroupChats([newGroup]));
            //     }
            // }
        });

        // listen to all events from server
        // chatSocket.onAny((event, ...args) => {
        //     console.log(event, args);
        // });
        return () => {
            chatSocket.disconnect();
            socketGame.disconnect();
        };
    }, [socketGame, chatSocket]);

    return <></>;
};

export default SocketComponent;
