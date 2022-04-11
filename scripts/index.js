//Permet d'afficher ou cacher l'ensemble de la dropbox contenant les filtres
let all_dropbox = document.querySelectorAll('.dropbox');
all_dropbox.forEach(dropbox => { 
    dropbox.querySelector('.inputBox').addEventListener("click", function(){
    showListOptions(dropbox)
    })
    dropbox.querySelector('.inputBox').addEventListener("keyup", function(){
    setActiveListOptions(dropbox)
    })
});
function showListOptions(element){
    element.classList.toggle('active');
}
function setActiveListOptions(element){
    if(!element.classList.contains('active'))
    element.classList.add('active');
}

const ingredients = []
const appareils = []
const ustensiles = []
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
    })
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
        console.log(appareils)
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
        setItemsIngredient()
    }
    if(type == 'appareil'){
        object = 'itemsAppareil';
        listSelected = listAppareilSelected;
        appareils.push(nom);
        setItemsAppareil()
    }
    if(type == 'ustensile'){
        object = 'itemsUstensile';
        listSelected = listUstensileSelected;
        ustensiles.push(nom);
        setItemsUstensile()
    }
    if(listSelected.includes(nom)){
        listSelected.splice(listSelected.indexOf(nom), 1);
        document.querySelector('#'+object+' #'+(nom.replaceAll(' ', '_'))).remove();
        console.log('#'+object+' #'+nom)
    }
}



loadIngredientAppareilUstensile()
setItemsIngredient()
setItemsAppareil()
setItemsUstensile()