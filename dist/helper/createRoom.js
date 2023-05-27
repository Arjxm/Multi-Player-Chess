const users = [];
export const addUser = ({ id, userName, room }) => {
    const user = { id, userName, room };
    users.push(user);
    return { user };
};
export const getUser = (id) => {
    const index = users.findIndex((user) => {
        user.id === id;
    });
    return index;
};
export const getUserInRoom = (room) => {
    users.filter((user) => user.room === room);
};
