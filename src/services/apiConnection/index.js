export const apiConnection = async (endpoint = '') => {
    return await fetch(`https://api.football-data.org/v2/${endpoint}`, {
        method: 'GET',
        headers: {
            "X-Auth-Token": process.env.REACT_APP_API_KEY
        },
    })
        .then(r => {
            if (!r.ok) {
                throw Error(`${r.statusText}`);
            }
            return r.json();
        })
        .catch(error => {
            throw Error(`${error}`);
        });
};

