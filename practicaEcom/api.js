
export default class API {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAll() {
        const response = await fetch(this.baseURL);
        return response.json();
    }

    async create(data) {
        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async update(id, data) {
        const response = await fetch(`${this.baseURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        console.log("Status:", response.status);

        if (!response.ok) {
            throw new Error(`Error al actualizar: ${response.status} ${response.statusText}`);
        }

        // Verifica si hay contenido antes de llamar a .json()
        const text = await response.text();
        console.log(text, "return");
        if (!text) return {}; // Si está vacío, devuelve un objeto vacío para evitar el error
    }


    async delete(id) {
        await fetch(`${this.baseURL}/${id}`, {
            method: 'DELETE'
        });
    }
}

