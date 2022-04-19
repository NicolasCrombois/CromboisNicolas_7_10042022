//Permet d'afficher ou cacher l'ensemble de la dropbox contenant les filtres
let all_dropbox = document.querySelectorAll('.dropbox');
all_dropbox.forEach(dropbox => { 
    dropbox.querySelector('.inputBox').addEventListener("click", function(){
    showListOptions(dropbox)
    })
    dropbox.querySelector('.inputBox').addEventListener("keyup",  event => {
        setActiveListOptions(event, dropbox)
    })
});

//Chargement des recettes 
recipes.forEach((recipe) =>  {
    document.getElementById('all_recipes').appendChild(recipeFactory(recipe).getCardRecipe())
})
function closeDrop(id){
    if(id == 'ingredient'){ text = "Ingrédients" }
    if(id == 'appareil'){ text = "Appareils" }
    if(id == 'ustensile'){ text = "Ustensiles" }
    document.getElementById(id).classList.remove('col-5');
    document.getElementById(id).classList.add('col-2');
    document.getElementById(id).classList.remove('active');
    document.querySelector('#'+id+' .inputBox').placeholder = text
}

function showListOptions(element){
    if(!element.classList.contains('active')){
        closeDrop('ingredient');
        closeDrop('ustensile');
        closeDrop('appareil');
    }
    if(element.id == "ingredient"){
        if(element.classList.contains('active')){
            element.querySelector('.inputBox').placeholder = 'Ingrédients';
            element.classList.remove('col-5');
            element.classList.add('col-2');
        }else{
            element.querySelector('.inputBox').placeholder = 'Rechercher un ingrédient';
            element.classList.remove('col-2');
            element.classList.add('col-5');
        }
    }
    if(element.id == "ustensile"){
        if(element.classList.contains('active')){
            element.querySelector('.inputBox').placeholder = 'Ustensiles';
            element.classList.remove('col-5');
            element.classList.add('col-2');
        }else{
            element.querySelector('.inputBox').placeholder = 'Rechercher un ustensile';
            element.classList.remove('col-2');
            element.classList.add('col-5');
        }
    }
    if(element.id == "appareil"){
        if(element.classList.contains('active')){
            element.querySelector('.inputBox').placeholder = 'Appareils';
            element.classList.remove('col-5');
            element.classList.add('col-2');
        }else{
            element.querySelector('.inputBox').placeholder = 'Rechercher un appareil';
            element.classList.remove('col-2');
            element.classList.add('col-5');
        }
    }
    element.classList.toggle('active');
}
function setActiveListOptions(event, element){
    if(!element.classList.contains('active')){
        showListOptions(element)
    }else{
        searchInList(element)
    }
}

//Trie par ordre alphabétique une liste
function orderAlphabetique(liste){
    return liste.sort(function (a, b) {
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    });
}

let ingredients = []
let appareils = []
let ustensiles = []
let initIngredients = []
let initAppareils = []
let initUstensiles = []
function loadIngredientAppareilUstensile(){
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            if(!ingredients.includes(ingredient.ingredient)){
                ingredients.push(ingredient.ingredient);
            }
        });
        if(!appareils.includes(recipe.appliance)){
            appareils.push(recipe.appliance);
        }
        recipe.ustensils.forEach(ustensil => {
            if(!ustensiles.includes(ustensil.replace('(6)', ''))){
                ustensiles.push(ustensil.replace('(6)', ''));
            }
        });
    });
    initUstensiles = ustensiles = orderAlphabetique(ustensiles);
    initIngredients = ingredients = orderAlphabetique(ingredients);
    initAppareils = appareils = orderAlphabetique(appareils);

}
function searchInList(element){
    if(element.id == 'ingredient'){
        let wordSearch = document.getElementById('inputIngredient').value;
        ingredients = initIngredients.filter(function(item) {
            return item.toLowerCase().indexOf(wordSearch.toLowerCase()) !== -1
        })
        setItemsIngredient()
    }
    if(element.id == 'ustensile'){
        let wordSearch = document.getElementById('inputUstensile').value;
        ustensiles = initUstensiles.filter(function(item) {
            return item.toLowerCase().indexOf(wordSearch.toLowerCase()) !== -1
        })
        setItemsUstensile()
    }
    if(element.id == 'appareil'){
        let wordSearch = document.getElementById('inputAppareil').value;
        appareils = initAppareils.filter(function(item) {
            return item.toLowerCase().indexOf(wordSearch.toLowerCase()) !== -1
        })
        setItemsAppareil()
    }
}
function setItemsIngredient(){
    document.getElementById('optionIngredient').innerHTML = ''
    if(ingredients.length>0){
        ingredients.forEach(ingredient => {
            const containerOptionIngredient = document.getElementById('optionIngredient');
            containerOptionIngredient.appendChild(itemDropboxFactory(ingredient).getOption('ingredient'));
        })
    }
}
function setItemsAppareil(){
    document.getElementById('optionAppareil').innerHTML = ''
    if(appareils.length>0){
        appareils.forEach(appareil => {
            const containerOptionAppareil = document.getElementById('optionAppareil');
            containerOptionAppareil.appendChild(itemDropboxFactory(appareil).getOption('appareil'));
        })
    }
}
function setItemsUstensile(){
    document.getElementById('optionUstensile').innerHTML = ''
    if(ustensiles.length>0){
        ustensiles.forEach(ustensile => {
            const containerOptionUstensile = document.getElementById('optionUstensile');
            containerOptionUstensile.appendChild(itemDropboxFactory(ustensile).getOption('ustensile'));
        })
    }
}


const listIngredientSelected = []
const listAppareilSelected = []
const listUstensileSelected = []

function addItem(type, nom){
    let listSelected = [];
    let object = '';
    if(type == 'ingredient'){
        object = 'itemsIngredient';
        listSelected = listIngredientSelected;
        ingredients.splice(ingredients.indexOf(nom), 1);
        setItemsIngredient()
    }
    if(type == 'appareil'){
        object = 'itemsAppareil';
        listSelected = listAppareilSelected;
        appareils.splice(appareils.indexOf(nom), 1);
        setItemsAppareil()
    }
    if(type == 'ustensile'){
        object = 'itemsUstensile';
        listSelected = listUstensileSelected;
        ustensiles.splice(ustensiles.indexOf(nom), 1);
        setItemsUstensile()
    }
    if(!listSelected.includes(nom)){
        listSelected.push(nom);
        const container = document.getElementById(''+object);
        container.appendChild(itemDropboxFactory(nom).getOptionDeleteable(type));
    }
}
function removeItem(type, nom){
    if(type == 'ingredient'){
        object = 'itemsIngredient';
        listSelected = listIngredientSelected;
        ingredients.push(nom);
        searchInList(document.querySelector('.container-ingredient'))
        orderAlphabetique(ingredients)
        setItemsIngredient()
    }
    if(type == 'appareil'){
        object = 'itemsAppareil';
        listSelected = listAppareilSelected;
        appareils.push(nom);
        searchInList(document.querySelector('.container-appareil'))
        orderAlphabetique(appareils)
        setItemsAppareil()
    }
    if(type == 'ustensile'){
        object = 'itemsUstensile';
        listSelected = listUstensileSelected;
        ustensiles.push(nom);
        searchInList(document.querySelector('.container-ustensile'))
        orderAlphabetique(ustensiles)
        setItemsUstensile()
    }
    if(listSelected.includes(nom)){
        listSelected.splice(listSelected.indexOf(nom), 1);
        document.querySelector('#'+object+' #'+(nom.replaceAll(' ', '_'))).remove();
    }
}



loadIngredientAppareilUstensile()
setItemsIngredient()
setItemsAppareil()
setItemsUstensile()