(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });

        var myCalendar = $('.js-datepicker');
        var isClick = 0;

        $(window).on('click', function () {
            isClick = 0;
        });

        $(myCalendar).on('apply.daterangepicker', function (ev, picker) {
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));

        });

        $('.js-btn-calendar').on('click', function (e) {
            e.stopPropagation();

            if (isClick === 1) isClick = 0;
            else if (isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendar.focus();
            }
        });

        $(myCalendar).on('click', function (e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.daterangepicker').on('click', function (e) {
            e.stopPropagation();
        });

        $('.js-admission').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });

        var myCalendarAdmission = $('.js-admission');
        var isClick = 0;

        $(window).on('click', function () {
            isClick = 0;
        });

        $(myCalendarAdmission).on('apply.daterangepicker', function (ev, picker) {
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));

        });

        $('.js-btn-calendar-admission').on('click', function (e) {
            e.stopPropagation();

            if (isClick === 1) isClick = 0;
            else if (isClick === 0) isClick = 1;

            if (isClick === 1) {
                myCalendarAdmission.focus();
            }
        });

        $(myCalendarAdmission).on('click', function (e) {
            e.stopPropagation();
            isClick = 1;
        });

        $('.daterangepicker').on('click', function (e) {
            e.stopPropagation();
        });


    } catch (er) { console.log(er); }


    /*[ Select 2 Config ]
        ===========================================================*/

    try {
        var selectSimple = $('.js-select-simple');

        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });

    } catch (err) {
        console.log(err);
    }

    $("#birthday").mask("00/00/0000");
    $("#rg").mask("0.000.000");
    $("#cpf").mask("000.000.000-00");
    $("#pis_nis").mask("000.00000.00-0");
    $("#phone").mask("(00) 0000-0000");
    $("#admission").mask("00/00/0000");

    $("#form-register").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            birthday: {
                required: true,
            },
            gender: {
                required: true
            },
            rg: {
                required: true
            },
            organ_rg: {
                required: true
            },
            cpf: {
                required: true
            },
            pis_nis: {
                required: true
            },
            admission: {
                required: true,
                date: true,
            },
            unit_code: {
                required: true
            },
            role: {
                required: true
            },
            thumbnail: {
                required: true,
                 accept: "image/jpeg, image/pjpeg",
                 maxsize: 50000,
            },
            phone: {
                required: true
            }
         },
        messages: {
            name: {
                required: "Campo Obrigatório",
                minlength: "No minimo 3 caracteres"
            },
            email: {
                required: "Campo Obrigatório",
                email: "E-mail inválido"
            },
            birthday: {
                required: "Campo Obrigatório",
            },
            gender: {
                required: "Campo Obrigatório"
            },
            rg: {
                required: "Campo Obrigatório"
            },
            organ_rg: {
                required: "Campo Obrigatório"
            },
            cpf: {
                required: "Campo Obrigatório"
            },
            pis_nis: {
                required: "Campo Obrigatório"
            },
            admission: {
                required: "Campo Obrigatório",
            },
            unit_code: {
                required: "Campo Obrigatório"
            },
            role: {
                required: "Campo Obrigatório"
            },
            thumbnail: {
                required: "Campo Obrigatório",
                accept: "Apenas .jpg com até 50kb.",
                maxsize: "Máximo de 50KB "
            },
            phone: {
                required: "Campo Obrigatório"
            },
        }
    });

})(jQuery);

formData = document.getElementById("form-register");
loadding = document.getElementById("loadding");

var thumbnail3x4 = "";
// var item = {};
var item = new FormData();

formData.addEventListener('submit', function (e) {
    e.preventDefault();
    if($('.error').is(':visible')) return false;
    
    var elementFront = formData.querySelectorAll(".element");
    
    data = [];

    elementFront.forEach(element => {
        
        var chave = element.name;
        var valor = element.value;


        if (element.type == 'checkbox' || element.type == 'radio') {
               if (element.checked != true) return;
               valor = element.value
        }

        if (chave == "thumbnail") {
            valor = document.querySelector('#thumbnail').files[0];
            // valor = thumbnail3x4;
        }
        //  item[chave] = valor;
        item.append(chave, valor)

});
        // data.push(JSON.stringify(item))
    
        item.append("thumbnailBase64", thumbnail3x4)
        
        
        loadding.style.display = "block";
        setTimeout(function(){  execute(item); }, 1000);
        

});

document.querySelector('#thumbnail').addEventListener("change", async function(){
    const file = document.querySelector('#thumbnail').files[0];
    if(file != undefined) thumbnail3x4 = await toBase64(file);
});

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function execute(createData) {
    
     add("POST", "https://cadastro-montreal.herokuapp.com/spots", createData)
        .then(function (datums) {
            loadding.style.display = "none";
            formRegister = document.querySelector("#form-register").reset()
            document.querySelector(".msg-server").innerHTML = "<span style='color: #155724; background-color: #d4edda; border-color: #c3e6cb;'>Dados enviados com sucesso.</span>"
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
        xhr.setRequestHeader("user_id", "601d97f90c814f13b177b11e");

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