
// ---------------------loadingScreen-------------------------

$(document).ready(function () {
    $(".loadingDiv").fadeOut(1000)
    $("body").css("overflow", "auto")
})
// // ------------------------nav-----------------------------------
// $("#side-nav-menu .open-close-icon").click(function(){
//     $(".nav-tab ").toggle(2000)
// })



function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");

    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})



// ---------------------meals-------------------------

let api1;
let apiDatam;
async function getMaled(){
    api1 = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s")
    apiDatam = await api1.json(),
    displaym()
}
getMaled();
function displaym(){
    let cartona=""
    for(let i=0 ; i<apiDatam.meals.length; i++){
        cartona+=`
        <div class="col-md-3 rounded-2">
        <div class="content-Categories position-relative ">
            <div class="hover">
                <img src=${apiDatam.meals[i].strMealThumb} class="img-fluid rounded-2" alt="">
                <div class="layer d-flex align-items-center">
                    <h3>${apiDatam.meals[i].strTags}</h3>
                </div>
            </div>
        </div>
    </div>

        `
    }
    document.querySelector("#Meal .row").innerHTML=cartona;
    console.log(apiDatam.meals[2].strMealThumb)
}

// ---------------------Categories------------------------
let api;
let apiData;
async function getCategories() {
    api = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    apiData = await api.json(),
        display()
}
getCategories();
function display() {
    let cartona = ""
    for (let i = 0; i < apiData.categories.length; i++) {
        cartona += `
        <div class="col-md-3 rounded-2">
        <div class="content-Categories position-relative onclick="getCatDetails(`+i+` )">
            <div class="hover">
                <img src=${apiData.categories[i].strCategoryThumb} class="img-fluid rounded-2" alt="">
                <div class="layer d-flex  align-items-center ps-1">
                    <h3>${apiData.categories[i].strCategory}</h3>
                </div>
            </div>
        </div>
    </div>
        
        `
    }
    document.querySelector("#Categories .row").innerHTML = cartona;
    console.log(apiData.categories[2].strMealThumb)
}
// Api مش شغال مش عارفه من هنا مش عايز يشتغل ليه ويربط لنه يجيب لكل واحده حاجتها بس ال 
let filterCatDetails;
function getCatDetails(index2){
    let name = apiData.categories[index2].strCategory;
    async function filter(){
        let filterApi= await fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
        filterCatDetails= await filterApi.json()
        displayFilter()
    }
    filter();
}
function displayFilter(){
    document.querySelector("#Categories .row").innerHTML="";
    let cartona="";
    for(let i=0 ; i<filterCatDetails.meals.length;i++){
        cartona+=`
        <div class="col-md-3 rounded-2">
        <div class="content-Categories position-relative onclick="getCatDetails(`+i+` )">
            <div class="hover">
                <img src=${filterCatDetails.meals[i].strMealThumb} class="img-fluid rounded-2" alt="">
                <div class="layer d-flex  align-items-center ps-1">
                    <h3>${filterCatDetails.meals[i].strMeal}</h3>
                </div>
            </div>
        </div>
    </div> `
    }
    document.querySelector("#Categories .row2").innerHTML=cartona;
    $("#Categories").click(function(){
        document.querySelector("#Categories .row2").innerHTML="";
        document.querySelector("#Categories .row").innerHTML=cartona2
    })

}
// --------------------------Area------------------------------
let api2;
let apiDataa;
async function getArea() {
    api2 = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a")
    apiDataa = await api2.json(),
        displayArea()
}
getArea();
function displayArea() {
    let cartona = ""
    for (let i = 0;  i< 20; i++) {
        cartona += `
        <div class="col-md-3 rounded-2">
                        <div class="content-Area  ">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3>${apiDataa.meals[i].strArea}</h3>
                        </div>
                    </div>
        
        `
    }
    document.querySelector("#Area .row").innerHTML = cartona;
    console.log(apiDataa.meals[2].strArea)
}
// --------------------------Ingredients------------------------------
let apii;
let apiDatai;
async function getIngredients() {
    apii = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i")
    apiDatai = await apii.json();
        displayIngredients(apiDatai.meals.slice(0, 20));
}
getIngredients();
function displayIngredients() {
    let cartona = ""
    for (let i = 0 ; i< 20 ; i++) {
        cartona += `
        <div class="col-md-3">
        <div class="content-Ingredients rounded-2 text-center cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${apiDatai.meals[i].strIngredient}</h3>
            <p>${apiDatai.meals[i].strDescription.slice(0, 150)}</p>
        </div>
    </div>  
        `
    }
    document.querySelector("#Ingredients .row").innerHTML = cartona;
    console.log(apiDatai.meals[2].strIngredient)
}
// ----------------------Search------------------------------

function displayMeals(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal hover position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="layer  d-flex  align-items-center ps-1">
                    <h3>${arr[i].strMeal}</h3>
                </div>
                   
                </div>
        </div>
        `
    }
    rowData.innerHTML = cartoona
}



async function searchByName(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}




// ------------------contactUs----------------------

function showContacts() {
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
    inputsValidation()
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

// ---------------------------------display------------------------------------
let Search = document.querySelector(".Search")
let search1 = document.querySelector(".search1")
let searchOutPut = document.querySelector(".searchOutPut")
let Ingredients = document.querySelector(".Ingredients")
let Ingredients1 = document.querySelector(".Ingredients1")
let Area = document.querySelector(".Area")
let Area1 = document.querySelector(".Area1")
let Categories  = document.querySelector(".Categories ")
let Categories1  = document.querySelector(".Categories1 ")
let contact  = document.querySelector(".contact ")
let contact1  = document.querySelector(".contact1 ")
let Meal = document.querySelector(".Meal ")

Search.addEventListener("click", function(){
    search1.classList.remove("d-none")
    searchOutPut.classList.remove("d-none")
    Categories1.classList.add("d-none")
    Area1.classList.add("d-none")
    Ingredients1.classList.add("d-none")
    Meal.classList.add("d-none")
    contact1.classList.replace("d-flex","d-none")

})
Categories.addEventListener("click", function(){
    searchOutPut.classList.add("d-none")
    Categories1.classList.remove("d-none")
    search1.classList.add("d-none")
    Area1.classList.add("d-none")
    Ingredients1.classList.add("d-none")
    Meal.classList.add("d-none")
    contact1.classList.replace("d-flex","d-none")
})
Area.addEventListener("click", function(){
    searchOutPut.classList.add("d-none")
    Categories1.classList.add("d-none")
    search1.classList.add("d-none")
    Area1.classList.remove("d-none")
    Ingredients1.classList.add("d-none")
    Meal.classList.add("d-none")
    contact1.classList.replace("d-flex","d-none")
})
Ingredients.addEventListener("click", function(){
    searchOutPut.classList.add("d-none")
    Categories1.classList.add("d-none")
    search1.classList.add("d-none")
    Area1.classList.add("d-none")
    Ingredients1.classList.remove("d-none")
    Meal.classList.add("d-none")
    contact1.classList.replace("d-flex","d-none")
})
contact.addEventListener("click", function(){
    searchOutPut.classList.add("d-none")
    contact1.classList.replace("d-none","d-flex")
    Ingredients1.classList.add("d-none")
    Categories1.classList.add("d-none")
    Area1.classList.add("d-none")
    Meal.classList.add("d-none")
    search1.classList.add("d-none")
})