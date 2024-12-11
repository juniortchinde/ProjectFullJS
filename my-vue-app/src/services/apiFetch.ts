const baseUrl = import.meta.env.VITE_BASE_URL;

export const apiFetchGet = async (
    route: string,
    method: string = 'GET',
    token: string
) => {
    try {
        const response = await fetch(`${baseUrl}${route}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Vérifiez si la réponse est réussie
        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
            return null;
        }

        // Retournez les données JSON
        return await response.json();
    } catch (error) {
        console.error(`Network error: ${(error as Error).message}`);
        return null;
    }
};


export const apiFetchPostProtected = async (
    route: string,
    body: object,
    token: string
) => {
    try {
        const response = await fetch(`${baseUrl}${route}`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajouter 'Authorization' uniquement si le token est fourni
            },
            body: JSON.stringify(body)
        });

        // Vérifiez si la réponse est réussie
        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
            return null;
        }

        // Retournez les données JSON
        return await response.json();
    } catch (error) {
        console.error(`Network error: ${(error as Error).message}`);
        return null;
    }
};

export const apiFetchPost = async (
    route: string,
    body: object
) => {
    try {
        console.log(`${baseUrl}${route}`)
        const response = await fetch(`${baseUrl}${route}`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        // Vérifiez si la réponse est réussie
        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
            return null;
        }

        // Retournez les données JSON
        return await response.json();
    } catch (error) {
        console.error(`Network error: ${(error as Error).message}`);
        return null;
    }
};
