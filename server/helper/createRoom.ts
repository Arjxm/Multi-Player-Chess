const users: any = []; 

export const addUser = ({id, userName, room}: any) => {
    const user = {id,  userName , room}; 
    users.push(user);

    return {user};
}

export const getUser = (id: any) => {
    const index = users.findIndex((user: any) => {
        user.id === id
    });
    return index;
}

export const getUserInRoom = (room: string) => {
    users.filter((user: any) => user.room === room);
}
