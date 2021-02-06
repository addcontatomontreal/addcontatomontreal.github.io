(function ($) {
    'use strict';

$("#form-list").validate({
        rules: {
            key: {
                required: true
            }
         },
        messages: {

            key: {
                required: "Campo Obrigatório"
            },
        }
    });

})(jQuery);

formData = document.getElementById("form-list");
loadding = document.getElementById("loadding");

formData.addEventListener('submit', function (e) {
    e.preventDefault();
    if($('.error').is(':visible')) return false;
    
    var elementFront = document.getElementById("key").value;
    
    console.log(elementFront)
    loadding.style.display = "block";
    setTimeout(function(){  execute(elementFront); }, 1000);
});
        

function execute(createData) {
    
     add("GET", "https://cadastro-montreal.herokuapp.com/dashboard", createData)
        .then(function (datums) {
            loadding.style.display = "none";
            formlist = document.querySelector("#form-list").reset()
            console.log(datums)
            download(datums, "funcionarios", "text/plain;charset=utf-8");
            document.querySelector(".msg-server").innerHTML = "<span style='color: #155724; background-color: #d4edda; border-color: #c3e6cb;'>Consulta realizada com sucesso.</span>"
        })
        .catch(function (err) {
            loadding.style.display = "none";
            console.log("catch", err);
            document.querySelector(".msg-server").innerHTML = "<span style='color: #721c24; background-color: #f8d7da; border-color: #f5c6cb;'>Erro ao acessar servidor! Por favor tente mais tarde.</span>";
        });
}

function add(method, url, createData) {

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, false);
        xhr.setRequestHeader("user_id", createData);

        xhr.onload = function () {

            if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        console.log(createData)
        xhr.send(createData);
    });
}


function download(content, filename, contentType){
    if(!contentType){
        contentType = 'application/octet-stream';
    }
    var a = document.createElement('a');
    var blob = new Blob([content], {'type':contentType});
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}