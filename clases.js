let libros = [
    {
        title: 'el principito',
        autor: 'stuar little'
    }
]
class User {
    constructor({nombre, apellido, libros, mascotas}){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(pet = ``){
        return this.mascotas.push(pet);
    }

    countMascotas(){
        return this.mascotas.lenght;
    }

    addBook({title, autor}){
        return this.libros.push({title, autor});
    }
    getBookNames(){
        return this.libros.map(x =>{
            return x.title;
        })
    }
}
let data = {
    nombre: "Marcelo",
    apellido: "Gallardo",
    libros: [
        { title: 'Odisea', autor: 'Homero' },
        { title: 'Odisea', autor: 'Homero' },
        { title: 'Odisea', autor: 'Homero' },
        { title: 'Odisea', autor: 'Homero' },
        { title: 'Odisea', autor: 'Homero' }
    ],
    mascotas: ["Perro", "Gato"]
}