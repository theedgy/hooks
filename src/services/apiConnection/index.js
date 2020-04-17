export const apiConnection = async (endpoint = '') => {
    return await fetch(`https://api.football-data.org/v2/${endpoint}`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': '78989ff855294ecc83d070f5d9590eb0',
        },
    })
        .then(r => {
            if (!r.ok) {
                throw Error(`${r.message}`);
            }
            return r.json();
        })
        .catch(error => {
            throw Error(`${error}`);
        });
};

