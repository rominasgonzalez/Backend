//importaar
const { Router } = require('express');
const express = require('express');
const { isNull } = require('util');
const Contenedor = require('./contenedor');
const ContenedorCarrito = require('./contenedorCarrito');

// inicializar 
const app = express();
const router = Router();
const routerCarrito = Router();
const PORT = 8080;
const cont = new Contenedor('productos.txt');
const contCarrito = new ContenedorCarrito('carrito.txt');
const admin = false;

// configurar 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// se escucha por el puerto asignado 
const server = app.listen(PORT, ()=>{
        console.log("escuchando en puerto "+server.address().port);
})
server.on('error',error => console.log(error));



// router.get('',(req,res)=>{

//         // const { operacion } = req.params;
//         cont.getAll().then(resp =>{
//             // res.json(JSON.stringify(resp));
//             res.json(resp);
//         }).catch(error =>{
//             res.json({error : 'Error al pedir productos'});
//         })

        
// });


//// RUTAS PRODUCTOS

router.get('/:id?',(req,res)=>{

    if(admin){

    const id = parseInt(req.params.id);
    console.log('id por parametro'+id);
    if(id){

        cont.getById(id).then(resp =>{
            // res.json(JSON.stringify(resp));
            if(isNull(resp)){
                res.json({error: 'Producto no encontrado'});
            }else{
                res.json(resp);
            }
            
        }).catch(error =>{
            res.json({error : 'Error al pedir el producto'+error});
        });

    }else{

        // const { operacion } = req.params;
        cont.getAll().then(resp =>{
            // res.json(JSON.stringify(resp));
            res.json(resp);
        }).catch(error =>{
            res.json({error : 'Error al pedir productos'});
            next(err);
        })

    }

    }else{

        res.json({ error : -1, descripcion: 'Metodo GET productos No Autorizado'})
    }

    
});

router.post('',(req,res)=>{

        if(admin){

            const objeto = {
                                title : req.body.title,
                                price: req.body.precio,
                                thumbnail: req.body.thumb
                        }

            cont.save(objeto).then(resp=>{

                res.json(resp);

            }).catch(error =>{
                res.json({error : 'Error al guardar producto'+error});
                next(err);
            });

        }else{

            res.json({ error : -1, descripcion: 'Metodo POST Crear producto No Autorizado'})
        }

    
});

router.put('/:id',(req,res)=>{
    
        if(admin){
            const id = parseInt(req.params.id);

            const objeto = {
                title : req.body.title,
                price: req.body.precio,
                thumbnail: req.body.thumb,
                id : id
        }

            cont.updateById(objeto).then(resp => {

                if(resp==1){
                    res.json({ res : 'ok Update'});
                }else{
                    res.json({ res : 'No Existe el producto'});            
                }
        

            }).catch(error =>{
            throw new error({'error': 'Error al eliminar'+error});
            next(err);
            })


        }else{

            res.json({ error : -1, descripcion: 'Metodo PUT Actualizar producto No Autorizado'})
        }
    
});


router.delete('/:id',(req,res)=>{


        if(admin){
            const id = req.params.id;

            cont.deleteById(id).then(resp =>{

                if(resp == 1){
                    res.json({ respuesta : 'ok delete'});
                }else{
                    res.json({ respuesta : 'Producto no existe!'});
                }
            }).catch(error =>{
                throw new error({'error': 'Error al eliminar'+error});
                next(err);
            });


        }else{

            res.json({ error : -1, descripcion: 'Metodo DELETE producto No Autorizado'})
        }
});




// function handleErrors(err, req, res, next) {
//     console.log(err);
//     res.status(500).send('An internal server error occurred');
//   };
  
// app.use(handleErrors);
app.use('/api/productos',router);


/// RUTAS CARRITO ///////////////////////////////////////////////////////////////////////////////////////////////

routerCarrito.get('/:id/productos',(req,res)=>{

        const id = req.params.id;
        // const { operacion } = req.params;
        contCarrito.getAll(id).then(resp =>{
            // res.json(JSON.stringify(resp));
            if(resp){
                res.json(resp);
            }else{
                res.json({error: 'No existe carro'});
            }
            
        }).catch(error =>{
            res.json({error : 'Error al pedir productos del carrito '+id});
        })

        
});

routerCarrito.post('/:id/productos/:id_prod',(req,res)=>{

    const id = req.params.id;
    const id_prod = req.params.id_prod;
    // const { operacion } = req.params;
    contCarrito.saveProd(id,id_prod).then(resp =>{
        // res.json(JSON.stringify(resp));
        if(resp){
            res.json(resp);
        }else{
            res.json({error: 'No existe carro'});
        }
        
    }).catch(error =>{
        res.json({error : 'Error al pedir productos del carrito '+id});
    })

    
});


routerCarrito.post('',(req,res)=>{

    const carrito = {
                        timestamp: Date.now(),
                        productos: []
                   }

    contCarrito.save(carrito).then(resp=>{

        res.json(resp);

    }).catch(error =>{
        res.json({error : 'Error al guardar producto'+error});
    });
    
});



routerCarrito.delete('/:id',(req,res)=>{

    const id = req.params.id;

    contCarrito.deleteById(id).then(resp =>{

        if(resp == 1){
            res.json({ respuesta : 'ok delete'});
        }else{
            res.json({ respuesta : 'Carrito no existe!'});
        }
    }).catch(error =>{
        throw new error({'error': 'Error al eliminar'+error});
    });
});


routerCarrito.delete('/:id/productos/:id_prod',(req,res)=>{

    const id = req.params.id;
    const id_prod = req.params.id_prod;

    contCarrito.deleteByIdProdCarro(id,id_prod).then(resp =>{

        if(resp == 1){
            res.json({ respuesta : 'ok delete'});
        }else{
            res.json({ respuesta : 'Carrito no existe!'});
        }
    }).catch(error =>{
        throw new error({'error': 'Error al eliminar'+error});
    });
});


app.use('/api/carrito',routerCarrito);