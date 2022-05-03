//Permet d'afficher ou cacher l'ensemble de la dropbox contenant les filtres
//ou de traiter l'action d'une entrée clavier (KeyUp)
let all_dropbox = document.querySelectorAll('.dropbox');
all_dropbox.forEach(dropbox => { 
    dropbox.querySelector('.inputBox').addEventListener("click", function(){
    showListOptions(dropbox)
    })
    dropbox.querySelector('.inputBox').addEventListener("keyup",  event => {
        setActiveListOptions(event, dropbox);
    })
});
document.querySelector('.search-bar').addEventListener("keyup", function(){if(recipes.length!=0){writeOnSearchBar(false)}})

//Chargement des recettes 
function loadRecipes(list_recipes){
    document.getElementById('all_recipes').innerHTML = ''
    if(list_recipes.length != 0){
        if(list_recipes[0].score === undefined){
            list_recipes.forEach((recipe) =>  {
                document.getElementById('all_recipes').appendChild(recipeFactory(recipe).getCardRecipe())
            })
        }else{
            list_recipes.sort(function (a, b) {return b.score - a.score}).forEach((recipeAndScore) =>  {
                document.getElementById('all_recipes').appendChild(recipeFactory(recipeAndScore.recipe).getCardRecipe());
            })
        }
    } else {
        document.getElementById('all_recipes').innerHTML = '<p> Aucune recette ne correspond à cette recherche </p>';
    }
}

function closeDrop(id){
    if(id == 'ingredient'){ text = "Ingrédients"; itemsList = 'itemsIngredient'}
    if(id == 'appareil'){ text = "Appareils"; itemsList = 'itemsAppareil' }
    if(id == 'ustensile'){ text = "Ustensiles"; itemsList = 'itemsUstensile' }
    document.getElementById(id).classList.remove('col-5');
    document.getElementById(id).classList.add('col-2');
    document.getElementById(id).classList.remove('active');
    document.querySelector('#'+id+' .inputBox').placeholder = text
    var listItem = document.getElementById(itemsList);
    listItem.classList.remove('col-5');
    listItem.classList.add('col-2');
}

function showListOptions(element){
    if(element.classList.contains('active')){
        closeDrop('ingredient');
        closeDrop('ustensile');
        closeDrop('appareil');
    }else{
        if(element.id == "ingredient"){
            closeDrop('ustensile');
            closeDrop('appareil');
            element.querySelector('.inputBox').placeholder = 'Rechercher un ingrédient';
            element.classList.remove('col-2');
            element.classList.add('col-5');
            var listItem = document.getElementById('itemsIngredient');
            listItem.classList.add('col-5');
            listItem.classList.remove('col-2');
            element.classList.toggle('active');
        }
        if(element.id == "ustensile"){
            closeDrop('ingredient');
            closeDrop('appareil');
            element.querySelector('.inputBox').placeholder = 'Rechercher un ustensile';
            element.classList.remove('col-2');
            element.classList.add('col-5');
            var listItem = document.getElementById('itemsUstensile');
            listItem.classList.add('col-5');
            listItem.classList.remove('col-2');
            element.classList.toggle('active');
        }
        if(element.id == "appareil"){
            closeDrop('ingredient');
            closeDrop('ustensile');
            element.querySelector('.inputBox').placeholder = 'Rechercher un appareil';
            element.classList.remove('col-2');
            element.classList.add('col-5');
            var listItem = document.getElementById('itemsAppareil');
            listItem.classList.add('col-5');
            listItem.classList.remove('col-2');
             element.classList.toggle('active');
        }
    }
}
function setActiveListOptions(event, element){
    if(!element.classList.contains('active')){
            showListOptions(element)
    }
    searchInList(element)
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
let ingredientsWithoutItemSelected = []
let appareilsWithoutItemSelected = []
let ustensilesWithoutItemSelected = []
let recipeWithScore = []

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
    ustensilesWithoutItemSelected = ustensiles = orderAlphabetique(ustensiles);
    ingredientsWithoutItemSelected = ingredients = orderAlphabetique(ingredients);
    appareilsWithoutItemSelected = appareils = orderAlphabetique(appareils);

}
function searchInList(element){
    if(element.id == 'ingredient'){
        let wordSearch = document.getElementById('inputIngredient').value
        if(wordSearch.length > 0){
            setItemsIngredient(ingredientsWithoutItemSelected.filter(function(item) {
                return item.toLowerCase().indexOf(wordSearch.toLowerCase()) !== -1
            }))
        }else{
            ingredientsWithoutItemSelected = ingredients;
            setItemsIngredient(ingredientsWithoutItemSelected);
        }
    }
    if(element.id == 'ustensile'){
        let wordSearch = document.getElementById('inputUstensile').value;
        if(wordSearch.length > 0){
            setItemsUstensile(ustensilesWithoutItemSelected.filter(function(item) {
                return item.toLowerCase().indexOf(wordSearch.toLowerCase()) !== -1
            }))
        }else{
            ustensilesWithoutItemSelected = ustensiles;
            setItemsUstensile(ustensilesWithoutItemSelected)
        }
    }
    if(element.id == 'appareil'){
        let wordSearch = document.getElementById('inputAppareil').value;
        if(wordSearch.length > 0){
            setItemsAppareil(appareilsWithoutItemSelected.filter(function(item) {
                return item.toLowerCase().indexOf(wordSearch.toLowerCase()) !== -1
            }))
        }else{
            appareilsWithoutItemSelected = appareils;
            setItemsAppareil(appareilsWithoutItemSelected)
        }
    }
}
function setItemsIngredient(list){
    document.getElementById('optionIngredient').innerHTML = ''
    if(list.length>0){
        list.forEach(ingredient => {
            const containerOptionIngredient = document.getElementById('optionIngredient');
            containerOptionIngredient.appendChild(itemDropboxFactory(ingredient).getOption('ingredient'));
        })
    }
}
function setItemsAppareil(list){
    document.getElementById('optionAppareil').innerHTML = ''
    if(list.length>0){
        list.forEach(appareil => {
            const containerOptionAppareil = document.getElementById('optionAppareil');
            containerOptionAppareil.appendChild(itemDropboxFactory(appareil).getOption('appareil'));
        })
    }
}
function setItemsUstensile(list){
    document.getElementById('optionUstensile').innerHTML = ''
    if(list.length>0){
        list.forEach(ustensile => {
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
        ingredientsWithoutItemSelected.splice(ingredientsWithoutItemSelected.indexOf(nom), 1);
        searchInList(document.querySelector('.container-ingredient'));
    }
    if(type == 'appareil'){
        object = 'itemsAppareil';
        listSelected = listAppareilSelected;
        appareils.splice(appareils.indexOf(nom), 1);
        appareilsWithoutItemSelected = appareils;
        searchInList(document.querySelector('.container-appareil'));
    }
    if(type == 'ustensile'){
        object = 'itemsUstensile';
        listSelected = listUstensileSelected;
        ustensiles.splice(ustensiles.indexOf(nom), 1);
        ustensilesWithoutItemSelected = ustensiles;
        searchInList(document.querySelector('.container-ustensile'));
    }
    if(!listSelected.includes(nom)){
        listSelected.push(nom);
        const container = document.getElementById(''+object);
        container.appendChild(itemDropboxFactory(nom).getOptionDeleteable(type));
    }
    onSearch(listIngredientSelected, listAppareilSelected, listUstensileSelected)
}
function removeItem(type, nom){
    if(type == 'ingredient'){
        object = 'itemsIngredient';
        listSelected = listIngredientSelected;
        ingredientsWithoutItemSelected.push(nom);
        searchInList(document.querySelector('.container-ingredient'))
        orderAlphabetique(ingredientsWithoutItemSelected)
        setItemsIngredient(ingredientsWithoutItemSelected)
    }
    if(type == 'appareil'){
        object = 'itemsAppareil';
        listSelected = listAppareilSelected;
        appareilsWithoutItemSelected.push(nom);
        searchInList(document.querySelector('.container-appareil'))
        orderAlphabetique(appareilsWithoutItemSelected)
        setItemsAppareil(appareilsWithoutItemSelected)
    }
    if(type == 'ustensile'){
        object = 'itemsUstensile';
        listSelected = listUstensileSelected;
        ustensilesWithoutItemSelected.push(nom);
        searchInList(document.querySelector('.container-ustensile'))
        orderAlphabetique(ustensilesWithoutItemSelected)
        setItemsUstensile(ustensilesWithoutItemSelected)
    }
    if(listSelected.includes(nom)){
        listSelected.splice(listSelected.indexOf(nom), 1);
        document.querySelector('#'+object+' #'+(nom.replaceAll(' ', '_'))).remove();
    }
    onSearch(listIngredientSelected, listAppareilSelected, listUstensileSelected)
}
function onSearch(ingredientsSelected, appareilsSelected, ustensilesSelected){
    if(ingredientsSelected.length == 0 && ustensilesSelected.length == 0 && appareilsSelected.length == 0){
        recipeWithScore = []
        if(document.querySelector('.search-bar').value.length != 0){
            writeOnSearchBar(false)
        }else{
            loadRecipes(recipes)
        }
    }else{
        recipeWithScore = recipes.map(function (recipe) {
            const score_ingredient = recipe.ingredients.map((ingredient) => {
                if(ingredientsSelected.includes(ingredient.ingredient)){
                    return true;
                }else{
                    return false;
                }
            }).filter((validation) => {if (validation == true){return validation}}).length;
            var score_appareil = 0;
            if(appareilsSelected.includes(recipe.appliance)){
                score_appareil++
            }
            const score_ustensile = recipe.ustensils.map((ustensils) => {
                if(ustensilesSelected.includes(ustensils)){
                    return true;
                }else{
                    return false;
                }
            }).filter((validation) => {if (validation == true){return validation}}).length;
            const score = score_ingredient + score_appareil + score_ustensile;
            if( score > 0 ){
                return {recipe, score}
            }
        }).filter((element) => {if(element != undefined ){ return element}})
        writeOnSearchBar(true)
        if (document.querySelector('.search-bar').value.length == 0){
            loadRecipes(recipeWithScore)
        }
    }
}



function writeOnSearchBar(pathOnSearch){
    const value = document.querySelector('.search-bar').value;
    let recipeTmp = [];
    if( value != null && value.length != 0 ){
        if(recipeWithScore.length != 0){
            recipeTmp = recipeWithScore.filter((recipe) => {
                if(recipe.recipe.description.toUpperCase().includes(value.toUpperCase())){
                    return {'score' : recipe.score++, 'recipe' : recipe.recipe}
                }else if(recipe.recipe.name.toUpperCase().includes(value.toUpperCase())){
                    return {'score' : recipe.score++, 'recipe' : recipe.recipe}
                }else if(recipe.recipe.ingredients.length != 0 && recipe.recipe.ingredients.map((ingredient) => {
                       return ingredient.ingredient
                   }).filter((ingredient) => {
                        if(ingredient.toUpperCase().includes(value.toUpperCase())){
                            return true
                        }}).length > 0){
                    return {'score' : recipe.score++, 'recipe' : recipe.recipe}
                }
            })
        }else{
            recipeTmp = recipes.filter((recipe) => {
                if(recipe.description.toUpperCase().includes(value.toUpperCase())){
                    return recipe
                }else if(recipe.name.toUpperCase().includes(value.toUpperCase())){
                    return recipe
                }else if(recipe.ingredients.length != 0 && recipe.ingredients.map((ingredient) => {
                       return ingredient.ingredient
                   }).filter((ingredient) => {
                        if(ingredient.toUpperCase().includes(value.toUpperCase())){
                            return true
                        }}).length > 0){
                    return recipe
                }
            })
        }
        loadRecipes(recipeTmp)
    }else if(!pathOnSearch){
        onSearch(listIngredientSelected, listAppareilSelected, listUstensileSelected)
    }else{
        loadRecipes(recipeWithScore)
    }
}


loadRecipes(recipes)
loadIngredientAppareilUstensile()
setItemsIngredient(ingredientsWithoutItemSelected)
setItemsAppareil(appareilsWithoutItemSelected)
setItemsUstensile(ustensilesWithoutItemSelected)