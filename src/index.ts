
export const baseUrl = 'https://simplesql.redbeardlab.com';

const axios = require('axios').default;
export const apiUrl = `${baseUrl}/v0/api`;

class Auth {
    Authentication?: string;
    constructor(token?: string) {
        this.Authentication = token;
    } 
}

export async function newDatabase(token?: string): Promise<string> {
    let auth = new Auth(token);
    const response = await axios.post(`${apiUrl}/database`, {
        headers: auth, 
    });
    return response['data']['database'];
}

export async function execute(database: string, command: string, token?: string): Promise<Object> {
    var auth;
    if (token) {
        auth = new Auth(token);
    } else {
        auth = {};
    }
    const response = await axios.post(`${apiUrl}/command/${database}`, 
        { "command": command },
        { headers: auth });
    return response['data']['result'];
}

