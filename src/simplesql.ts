
export const baseUrl = 'https://simplesql.redbeardlab.com';

const axios = require('axios').default;
export const apiUrl = `${baseUrl}/v0/api`;

function generateAuth(token?: string): Object {
    if (token) {
	return {'Authorization': `Bearer ${token}`};
    }
    return {};
}

export async function newDatabase(token?: string): Promise<string> {
    let auth = generateAuth(token);
    const response = await axios.post(`${apiUrl}/database`, 
	{}, // empty data
	{ headers: auth });
    return response['data']['database'];
}

export async function command(database: string, command: string, token?: string): Promise<Object> {
    const auth = generateAuth(token);
    const response = await axios.post(`${apiUrl}/command/${database}`, 
        { "command": command },
        { headers: auth });
    return response['data']['result'];
}

export async function listDatabases(token: string): Promise<[string]> {
    const auth = generateAuth(token);
    const response = await axios.get(`${apiUrl}/databases`, { headers: auth });
    return response['data'];
}

export async function newToken(token: string): Promise<string> {
    const auth = generateAuth(token);
    const response = await axios.post(`${apiUrl}/token`, {}, { headers: auth });
    return response['data']['token'];
}

export async function listTokens(token: string): Promise<[string]> {
    const auth = generateAuth(token);
    const response = await axios.get(`${apiUrl}/tokens`, { headers: auth });
    return response['data'];
}
