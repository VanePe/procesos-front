//funciones para operaciones crud
const urlApiCategory = "http://localhost:8088/categories";//colocar la url con el puerto
const headersCategory= {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`
};

function categorias(){
    validaToken();
    var settings={
        method: 'GET',
        headers: headersCategory,
    }
    fetch(urlApiCategory, settings)
    .then(response => response.json())
    .then(function(categories){
        
            var categorias = '';
            for(const categoria of categories){
                categorias += `
                <tr>
                    <th scope="row">${categoria.idCategory}</th>
                    <td>${categoria.nameCategory}</td>                    
                    <td>${categoria.descriptionCategory}</td>
                    <td>
                    <a href="#" onclick="verModificarCategoria('${categoria.idCategory}')" class="btn btn-outline-warning">
                        <i class="fa-solid fa-user-pen"></i>
                    </a>
                    <a href="#" onclick="verCategoria('${categoria.idCategory}')" class="btn btn-outline-info">
                        <i class="fa-solid fa-eye"></i>
                    </a>
                    
                    </td>
                </tr>`;
                
            }
            document.getElementById("categorias").innerHTML = categorias;
    })
}

function verModificarCategoria(idCategory){
    validaToken();
    var settings={
        method: 'GET',
        headers:headersCategory,
    }
    fetch(urlApiCategory+"/"+idCategory, settings)
    .then(categoria => categoria.json())
    .then(function(categoria){
            var cadena='';
            if(categoria){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modify User</h1>
                </div>
              
                <form action="" method="post" id="modificar">
                    <input type="hidden" name="idCategory" id="idCategory" value="${categoria.idCategory}">
                    <label for="nameCategory" class="form-label">First Name</label>
                    <input type="text" class="form-control" name="nameCategory" id="nameCategory" required value="${categoria.nameCategory}"> <br>
                    <label for="descriptionCategory"  class="form-label">Last Name</label>
                    <input type="text" class="form-control" name="descriptionCategory" id="descriptionCategory" required value="${categoria.descriptionCategory}"> <br>
                    <button type="button" class="btn btn-outline-warning" 
                        onclick="modificarCategoria('${categoria.idCategory}')">Modificar
                    </button>
                </form>`;
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalCategoria'))
            myModal.toggle();
    })
}

async function modificarCategoria(idCategory){
    validaToken();
    var myForm = document.getElementById("modificar");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApiCategory+"/"+idCategory, {
        method: 'PUT',
        headers:headersCategory,
        body: JSON.stringify(jsonData)
    });
    if(request.ok){
        alertas("The Category has been modified successfully!",1)
        categorias();
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
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalCategoria')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function verCategoria(idCategory){
    validaToken();
    var settings={
        method: 'GET',
        headers:headersCategory,
    }
    fetch(urlApiCategory+"/"+idCategory, settings)
    .then(categoria => categoria.json())
    .then(function(categoria){
            var cadena='';
            if(categoria){                
                cadena = `
                <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Categoria</h1>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Nombre: ${categoria.nameCategory}</li>
                    <li class="list-group-item">Apellido: ${categoria.descriptionCategory}</li>                    
                </ul>`;
              
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalCategoria'))
            myModal.toggle();
    })
}

async function createCategoria(){    
    var myForm = document.getElementById("createCategoria");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(urlApiCategory, {
        method: 'POST',
        headers:headersAuth,
        body: JSON.stringify(jsonData)
    });
    
    if(request.ok){
        alertas("Category created", 1);
        categorias();
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
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalCategoria')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function createCategoryForm(){    
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i>Category Register</h1>
            </div>
              
            <form action="" method="post" id="createCategoria">
                <input type="hidden" name="idCategory" id="idCategory">
                <label for="nameCategory" class="form-label">Name Category</label>
                <input type="text" class="form-control" name="nameCategory" id="nameCategory" required> <br>
                <label for="descriptionCategory"  class="form-label">Description</label>
                <input type="text" class="form-control" name="descriptionCategory" id="descriptionCategory" required> <br>
                <button type="button" class="btn btn-outline-info" onclick="createCategoria()">Register</button>
            </form>`;
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalCategoria'))
            myModal.toggle();
}

function eliminaCategoria(idCategory){
    validaToken();
    var settings={
        method: 'DELETE',
        headers:headersCategory,
    }
    fetch(urlApiCategory+"/"+idCategory,settings)
    .then(response => response.json())
    .then(function(data){
        categorias();
        alertas("The category has been deleted successfully!",2)
    })
}

