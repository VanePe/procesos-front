//funciones para operaciones crud
const urlApiArticle = "http://localhost:8088/users";//colocar la url con el puerto
const headersArticle= {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
};

function articulos(){
    validaToken();
    var settings={
        method: 'GET',
        headers: headersArticle,
    }
    fetch(urlApiArticle, settings)
    .then(response => response.json())
    .then(function(articles){
        
            var articulos = '';
            for(const articulo of articles){
                articulos += `
                <tr>
                    <th scope="row">${articulo.idArticle}</th>
                    <td>${articulo.nameArticle}</td>
                    <td>${articulo.stock}</td>
                    <td>${articulo.descriptionArticle}</td>
                    <td>${articulo.priceArticle}</td>
                    <td>${articulo.category}</td>
                    <td>
                    <a href="#" onclick="verModificarArticulo('${articulo.idArticle}')" class="btn btn-outline-warning">
                        <i class="fa-solid fa-user-pen"></i>
                    </a>
                    <a href="#" onclick="verArticulo('${articulo.idArticle}')" class="btn btn-outline-info">
                        <i class="fa-solid fa-eye"></i>
                    </a>
                    </td>
                </tr>`;
                
            }
            document.getElementById("articulos").innerHTML = articulos;
    })
}

function verModificarArticulo(idArticle){
    validaToken();
    var settings={
        method: 'GET',
        headers:headersArticle,
    }
    fetch(urlApiArticle+"/"+idArticle, settings)
    .then(articulo => articulo.json())
    .then(function(articulo){
            var cadena='';
            if(articulo){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modify User</h1>
                </div>
              
                <form action="" method="post" id="modificar">
                    <input type="hidden" name="idArticle" id="idArticle" value="${articulo.idArticle}">
                    <label for="nameArticle" class="form-label">Name Articule</label>
                    <input type="text" class="form-control" name="nameArticle" id="nameArticle" required value="${articulo.nameArticle}"> <br>
                    <label for="stock"  class="form-label">Stock</label>
                    <input type="text" class="form-control" name="stock" id="stock" required value="${articulo.stock}"> <br>
                    <label for="descriptionArticle"  class="form-label">Description</label>
                    <input type="text" class="form-control" name="descriptionArticle" id="descriptionArticle" required value="${articulo.descriptionArticle}"> <br>
                    <label for="priceArticle"  class="form-label">Price</label>
                    <input type="text" class="form-control" name="priceArticle" id="priceArticle" required value="${articulo.priceArticle}"> <br>
                    <button type="button" class="btn btn-outline-warning" 
                        onclick="modificarArtriculo('${articulo.idArticle}')">Modificar
                    </button>
                </form>`;
            }
            nameArticle.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(nameArticle.getElementById('modalArticulo'))
            myModal.toggle();
    })
}

async function modificarArtriculo(id){
    validaToken();
    var myForm = nameArticle.getElementById("modificar");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApiArticle+"/"+id, {
        method: 'PUT',
        headers:headersArticle,
        body: JSON.stringify(jsonData)
    });
    if(request.ok){
        alertas("The article has been modified successfully!",1)
        articulos();
    }
    else{
        const data = await request.json(); // Espera a que la promesa se resuelva
        console.log(data); // Aquí puedes manejar la data de la respuesta
        const dataArray = Object.values(data);
        console.log(dataArray); // Aquí puedes manejar la data de la respuesta
        var dataResponse='';
        for(var v of dataArray){
            dataResponse += "<li>"+v+"</li>";
        }

        alertas("Error: <br>"+dataResponse, 2)
    }
    nameArticle.getElementById("contentModal").innerHTML = '';
    var myModalEl = nameArticle.getElementById('modalArticulo')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function verArticulo(idArticle){
    validaToken();
    var settings={
        method: 'GET',
        headers:headersArticle,
    }
    fetch(urlApiArticle+"/"+idArticle, settings)
    .then(articulo => articulo.json())
    .then(function(articulo){
            var cadena='';
            if(articulo){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar articulo</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Nombre articulo: ${articulo.nameArticle}</li>
                    <li class="list-group-item">Stock: ${articulo.stock}</li>
                    <li class="list-group-item">Descripcion: ${articulo.descriptionArticle}</li>
                    <li class="list-group-item">Precio: ${articulo.priceArticle}</li>
                    <li class="list-group-item">Categoria: ${articulo.category}</li>
                </ul>`;
              
            }
            nameArticle.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(nameArticle.getElementById('modalArticulo'))
            myModal.toggle();
    })
}

async function createArticle(){
    var myForm = nameArticle.getElementById("registerForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApiAuth+"/register", {
        method: 'POST',
        headers:headersAuth,
        body: JSON.stringify(jsonData)
    });
    if(request.ok){
        alertas("Article created", 1);
        articulos();
    }
    else{
        const data = await request.json(); // Espera a que la promesa se resuelva
        console.log(data); // Aquí puedes manejar la data de la respuesta
        const dataArray = Object.values(data);
        console.log(dataArray); // Aquí puedes manejar la data de la respuesta
        var dataResponse='';
        for(var v of dataArray){
            dataResponse += "<li>"+v+"</li>";
        }

        alertas("Error: <br>"+dataResponse, 2)
    }
    nameArticle.getElementById("contentModal").innerHTML = '';
    var myModalEl = nameArticle.getElementById('modalArticulo')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function createArticleForm(){
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i>Article Register</h1>
            </div>
              
            <form action="" method="post" id="registerForm">
                <input type="hidden" name="idArticle" id="idArticle">
                <label for="nameArticle" class="form-label">Name article</label>
                <input type="text" class="form-control" name="nameArticle" id="nameArticle" required> <br>
                <label for="stock"  class="form-label">Stock</label>
                <input type="text" class="form-control" name="stock" id="stock" required> <br>
                <label for="descriptionArticle"  class="form-label">Description</label>
                <input type="text" class="form-control" name="descriptionArticle" id="descriptionArticle" required> <br>
                <label for="priceArticle" class="form-label">Price</label>
                <input type="text" class="form-control" name="priceArticle" id="priceArticle"> <br>
                <button type="button" class="btn btn-outline-info" onclick="createArticle()">Register</button>
            </form>`;
            nameArticle.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(nameArticle.getElementById('modalArticulo'))
            myModal.toggle();
}

function eliminaArticulo(idArticle){
    validaToken();
    var settings={
        method: 'DELETE',
        headers:headersArticle,
    }
    fetch(urlApiArticle+"/"+idArticle,settings)
    .then(response => response.json())
    .then(function(data){
        articulos();
        alertas("The article has been deleted successfully!",2)
    })
}