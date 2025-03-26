
export default class API {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAll() {
        try{
        const response = await fetch(this.baseURL);
        return response.json();
        } catch(error) {
            console.log("Error al leer la API. Error:",error)
        }
    }

    async create(data) {
        try{
        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            
        });
            return response.json();
        } catch(error){
            console.log(error)
            alert("Error al agregar el producto")
        }


    }

    async update(id, data) {
        const response = await fetch(`${this.baseURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar: ${response.status} ${response.statusText}`);
        }

        // Verifica si hay contenido antes de llamar a .json()
        const text = await response.text();

        if (!text) return {}; // Si está vacío, devuelve un objeto vacío para evitar el error
    }


    async delete(id) {
        try{
        await fetch(`${this.baseURL}/${id}`, {
            method: 'DELETE'
        });
        } catch(error) {
            console.log(error)
            alert("Error al borrar el producto")
        }
    }
}

