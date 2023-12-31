import {connection} from "../db";


const prefix = "\x1b[36m[server] : \x1b[0m";
const separator = "------------------------------------------------------------";
const green = "\x1b[32m\u2714 \x1b[0m"
const red = '\x1b[31m\u2718 \x1b[0m';

export const onServerStart = (port : any) => {
    const server_running = `${prefix} ${green} Server is running at http://localhost:${port}\n${separator}`
    const db_connected = `${prefix} ${green} Database connected successfully\n${separator}`
    const db_error = `${prefix} ${red} Error connecting to database\n${separator}`

    console.log(separator)
    console.log(server_running)
    connection.connect((err) => {
        console.log((err) ? db_error : db_connected)
    })
}