const fs = require('fs');
// import fs from 'fs';
class ContenedorCarrito {

    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        console.log('this: ',this);
    }

    async save(objeto){

            // Recibir un objeto
            // validar el id del objeto
            // guardarlo en el archivo
            // devolver el id asignado

                try {

                    
                    if (fs.existsSync(this.nombreArchivo)) {
                        //file exists
                        const data = await fs.promises.readFile(this.nombreArchivo,'utf-8');
                        const obj = JSON.parse(data);
                        
                        // console.log(typeof(obj));
                        // let productos = data;
                        let carritos = [];
                        let id = 0;
                        obj.map((p)=>{
                            // console.log(p);
                            carritos.push(p);
                            id = p.id;
                        });
                        
                        objeto.id = id+1;
                        carritos.push(objeto);
                        // console.log(id);   
                        await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(carritos,null,2));
                        // console.log('id asignado: '+(id+1));
                        return objeto;
                    }else{
                        // let id = 1;
                        objeto.id = 1;
                        let carritos = [];
                        carritos.push(objeto);
                        // console.log('no existe el archivo');
                        await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(carritos,null,2));
                        // console.log('id asignado: 1');
                        return objeto;
                    }

                    
                } catch (error) {
                    console.log(error);
                }
                
            

            
    }


    async saveProd(id,id_prod){

        try {

            // obtengo el producto agregado al carro por su id
            const data = await fs.promises.readFile('./productos.txt','utf-8');
            const obj = JSON.parse(data);
            
            const producto = obj.filter(p => p.id == id_prod);

            // Obtengo el array de productos del carrito por su id
            const data2 = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const obj2 = JSON.parse(data2);
            // console.log(obj2);
            
            // const carrito = obj2.filter(p => p.id == id);
            // console.log(carrito);
            // carrito[0].productos.push(producto);

            let carritos = [];
            obj2.map((p,index)=>{
                // console.log(p);
                // console.log('carro->'+p[index]);
                // console.log('index->'+index);
                if(p.id==id){
                    p.productos.push(producto[0]);
                }
                 carritos.push(p);
                
            });


            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(carritos,null,2));
            // console.log('id asignado: '+(id+1));
            return producto;            
            
        } catch (error) {
             throw new Error({'error':'error al buscar producto'});
        }

    }


    async getById(id){

        try {

            const data = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const obj = JSON.parse(data);
            
            const result = obj.filter(p => p.id == id);
            if(result.length<1){
                // console.log(null);
                return null;
            }else{
                // console.log(result[0]);
                return result[0];
            }
            
        } catch (error) {
             throw new Error({'error':'error al buscar producto'});
        }

    }


    async getAll(id){

        try {

            const data = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const obj = JSON.parse(data);
            
            const result = obj.filter(p => p.id == id);
            console.log(result);
            if(result.length<1){
                // console.log(null);
                return null;
            }else{
                // console.log(result[0]);
                return result[0].productos;
            }
            
        } catch (error) {
             throw new Error({'error':'error al devolver productos'});
        }

    }


    async deleteById(id) {

        try {

            const data = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const obj = JSON.parse(data);
            
            const indice = obj.findIndex((p) => p.id == id);
            // console.log(indice);
            // let indice = obj.findIndex(result);
            // console.log(indice);
            if(indice>=0){
                obj.splice(indice,1);
                await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(obj,null,2));
                // console.log('eliminado');
                return 1;                
            }else{
                // console.log('no existe');
                return 0;
            }
            

            // console.log('eliminado '+result);
            
        } catch (error) {

            console.log(error);
            
        }
    }


    async deleteByIdProdCarro(id,id_prod){

        try {

            const data = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const obj = JSON.parse(data);


            let carritos = [];
            let carrito;
            obj.map((p,index)=>{
                // console.log(p);
                // console.log('carro->'+p[index]);
                // console.log('index->'+index);
                if(p.id==id){
                    // p.productos.push(producto[0]);
                    carrito = p;
                }else{
                 carritos.push(p);
                }
                
            }); 

            const indice = carrito.productos.findIndex((p) => p.id == id_prod);
            // console.log(indice);
            // let indice = obj.findIndex(result);
            // console.log(indice);
            if(indice>=0){
                carrito.productos.splice(indice,1);
            }
            carritos.push(carrito);

            // const indice = obj.findIndex((p) => p.id == id);
            // console.log(indice);
            // let indice = obj.findIndex(result);
            // console.log(indice);
            // if(indice>=0){
            //     obj.splice(indice,1);
                await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(obj,null,2));
                 console.log('eliminado');
                return 1;                
            // }else{
            //     // console.log('no existe');
            //     return 0;
            // }
            

            // console.log('eliminado '+result);
            
        } catch (error) {

            console.log(error);
            
        }        
    }

    async deleteAll(){

        try {

            let productos = [];
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(productos,null,2));
            console.log('array vacio');            
            
        } catch (error) {
            
            console.log(error);
        }
    }




    // Actualizar objeto
    async updateById(objeto) {

        try {

            const data = await fs.promises.readFile(this.nombreArchivo,'utf-8');
            const obj = JSON.parse(data);
            
            const indice = obj.findIndex((p) => p.id == objeto.id);
            // console.log(indice);
            // let indice = obj.findIndex(result);
            // console.log(indice);
            if(indice>=0){
                // obj.splice(indice,1);
                obj[indice].title = objeto.title;
                obj[indice].price = objeto.price;
                obj[indice].thumbnail = objeto.thumbnail;

                await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(obj,null,2));
                // console.log('eliminado');
                return 1;                
            }else{
                // console.log('no existe');
                return 0;
            }
            

            // console.log('eliminado '+result);
            
        } catch (error) {

            console.log(error);
            
        }
    }    
}

module.exports = ContenedorCarrito;

