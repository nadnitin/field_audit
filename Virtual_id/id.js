var carsAndModels = {};

function init() {
    var uniq = 'AT' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('virtual_id').value = uniq;
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    //console.log(now)
    document.getElementById('entryDate').value = now.toISOString().slice(0, 19);
    document.getElementById('user_id').value = localStorage.getItem("username");
    loaddata(); 
}


function ChangeCarList() {
    var carList = document.getElementById("State");
    var modelList = document.getElementById("division_office");
    var selCar = carList.options[carList.selectedIndex].value;
    while (modelList.options.length) {
        modelList.remove(0);
    }
    var cars = carsAndModels[selCar];
    if (cars) {
        var i;
        for (i = 0; i < cars.length; i++) {
            var car = new Option(cars[i], i);
            car.value = car.text;
            //console.log(car.value);
            modelList.options.add(car);
        }
    }
};

function saveData(e) {
    e.preventDefault();
    //const Button = document.getElementById("submit1")
    //document.querySelector("#sub").value = "Submiting..";
    document.getElementById("submit1").disabled = true;
    const id = document.getElementById('virtual_id').value;
    const form = document.getElementById('dataForm');

    let data = new FormData(form);
    //(running)https://script.google.com/macros/s/AKfycbw9lLX9f1aC54wPkEccGlOfC6acVK36wcvj6QSE1tIqupUFpM0wkWOAylDsNo0x6MWNuA/exec
    // (Test)  https://script.google.com/macros/s/AKfycbxs9ky-jBMvSL_JB09NNcNGcbtqrA1e3d6B4E3g42q2PQAYl-hzlApPMRQVcrlJJjLfzQ/exec
    fetch('https://script.google.com/macros/s/AKfycbw9lLX9f1aC54wPkEccGlOfC6acVK36wcvj6QSE1tIqupUFpM0wkWOAylDsNo0x6MWNuA/exec', {
        method: "POST",
        body: data
    })
        .then(res => res.text())
        .then(data => {
            //document.querySelector("#sub").value = "Submit";
            //document.querySelector("#sub").value = "Submiting";
            alert(`${data}: Virtual ID Created successfully ID:-${id}`);
            //const successMsg = `${data}: Virtual ID Created successfully ID:-${id}`;
            //document.querySelector("#msg").innerHTML = alert;
            document.getElementById("submit1").disabled = false;
            document.getElementById("dataForm").reset();
            window.location.reload();
            return (true);
               
        }); 

}
let siteDataArr = [];
function loaddata() {
    // var site_code = document.getElementById("site_code").value;
    // var site_name = document.getElementById("site_name").value;

    //var isvalid = false;
    //console.log("loading");
//User DATA
    // (TEST)https://script.google.com/macros/s/AKfycbx9nnLiNzdPCn_CZIlJaFisuM7bs_hj5TyeDk5QgfByEgPTRg4zowpQYS7QL_8T1Lhj/exec
    // (running) https://script.google.com/macros/s/AKfycbzCEkf5RaZaaOlw7pTJrYGk4RmLB6Ydc3USuUd8YXTiM9luAAqaC5bUXqNeil63FNFkvA/exec
    fetch('https://script.google.com/macros/s/AKfycbzCEkf5RaZaaOlw7pTJrYGk4RmLB6Ydc3USuUd8YXTiM9luAAqaC5bUXqNeil63FNFkvA/exec')
        .then(res => res.json())
        .then(data => {
            //console.log(data.content1);
           // console.log("lodead");
            // localStorage.setItem("lodead",siteDataArr)
            // localStorage.setItem("lodead","lodead")
            const sitedata = data?.content1;
            //console.log(sitedata);
            if(sitedata && sitedata.length>0){

                siteDataArr = sitedata;
            }
           
  
        });
}

    function getSitedetails(){
        var site_code = document.getElementById("site_code").value;
        if(site_code){

            const dataIndex = siteDataArr.findIndex(el => el[0] == site_code);
            // console.log(dataIndex);
            // console.log(siteDataArr[dataIndex]);
            const selectedsite = siteDataArr[dataIndex];
            if(selectedsite && selectedsite.length>0){

                document.getElementById('site_name').value = selectedsite[1];
                document.getElementById('State').value = selectedsite[2];
                document.getElementById('division_office').value = selectedsite[3];
                
                
            }
        }
    }
    