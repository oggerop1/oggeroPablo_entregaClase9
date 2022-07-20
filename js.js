class Producto{
    constructor(nombre, precio , stock){
        this.nombre = nombre;
        this.precio = precio;
        this.stock  = stock;
    };

    // set and get de las propiedades
    set_nombre(nombre){
        this.nombre = nombre;
    };

    set_precio(precio){
        this.precio = precio;
    };

    set_stock(stock){
        this.stock = stock;
    };

    get_nombre(){
        return this.nombre;
    };

    get_precio(){
        return this.precio;
    };

    get_stock(){
        return this.stock;
    };

    eliminarProducto(elemento){

    }
};

document.getElementById("form-productos").addEventListener("submit", function(e){
    // obtengo los valores del formulario ingresados por el usuario
    let obtenerNombreProducto   = document.getElementById("nombre").value;
    let obtenerPrecio           = document.getElementById("precio").value;
    let obtenerStock            = document.getElementById("stock").value;

    // 
    if(obtenerNombreProducto==='' || obtenerPrecio==='' || obtenerStock ==='' ){
        mostrarMensaje("ingrese los datos solicitados", "danger")
    }else{
        // instancia de la clase producto
        const producto = new Producto ();
        producto.set_nombre(obtenerNombreProducto);
        producto.set_precio(obtenerPrecio);
        producto.set_stock (obtenerStock);
        
        // llamo funcion para agregar en un array el producto
        agregarProductosBase(producto);
        // con e cancelo el evento que refresca la pagina automaticamente.
        e.preventDefault();
    }
});

let baseProductos = []; //creo array vacio

function agregarProductosBase(producto){
    // con filter verifica si lo que ingresó esta en el arrary 
    let duplicado = baseProductos.filter(prod =>prod.get_nombre() === producto.get_nombre())

    //con el if controlo que no se agregue el mismo nombre del producto. 1= true
    if (duplicado.length ===1){
        mostrarMensaje("Producto ya creado con ese nombre, por favor ingrese otro Nombre!!,","danger");
        //document.getElementById("form-productos").reset();
        
    }else{
        // agrego al arrary con push
        baseProductos.push(producto); 
        mostrarMensaje("producto ingresado correctamente","success");
        agregarProductosTabla(producto);
        document.getElementById("form-productos").reset();
    }
}

function agregarProductosTabla(producto){      
    document.getElementById("tablaProductos").innerHTML += '<tbody><td>'+producto.get_nombre()+'</td><td>'+producto.get_precio()+'</td><td>'+producto.get_stock()+'</td><td><button class="btn btn-danger" id="btnEliminar"><spam class="glyphicon glyphicon-remove-circle"></spam></button></td><td><button class="btn btn-success" id="btnComprar"><span class="glyphicon glyphicon-shopping-cart"></span></button></td></tbody>'; 
}

function mostrarMensaje(mensaje, claseBT){
    const div = document.createElement('div');              // creo el div
    div.className= 'alert alert-' +claseBT+ ' mt-2';        // le creo la clase BT 
    div.appendChild(document.createTextNode(mensaje));      // creo el nodo
    const container = document.querySelector('.container'); // obtengo el conteiner
    const row = document.querySelector('.row');             // obtengo el row
    container.insertBefore(div, row);                       // le indico que inserte el div entre el container y el row

    // seteo el tiempo que tiene que mostrarse el mensaje
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000);
}

// campturo el elemento para los diferentes iconos de la culumna Acciones dentro del contenedor de la tabla id=tablaProductos
document.getElementById("tablaProductos").addEventListener("click",function(e){
    let elementoEliminar = e.target;
    if(elementoEliminar.id ==="btnEliminar"){
        // tengo que eliminar del array
        elementoEliminar.parentElement.parentElement.remove();
        mostrarMensaje("Producto eliminado correctamente!!,","danger");
   }

    let elementoCompar = e.target
    if (elementoCompar.id==="btnComprar"){
        alert("estamos trabajando en esta nueva funcionalidad")
    }
})
