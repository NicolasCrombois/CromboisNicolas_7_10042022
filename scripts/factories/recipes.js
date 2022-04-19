function recipeFactory(data) {
    const id = data.id;
    const name = data.name;
    const servings = data.servings;
    const ingredients = data.ingredients;
    const time = data.time;
    const description = data.description;
    const appliance = data.appliance;
    const ustensils = data.ustensils;

    //Format d'affichage d'une option dans la dropbox
    function getCardRecipe() {
        const container = document.createElement( 'div' );
        container.id = id;
        container.classList.add('cols', 'col-4', 'item-board');
        const div = document.createElement( 'div' );
        div.classList.add('item-board_content');
        const img = document.createElement( 'div' );
        img.classList.add('fakeImg')
        
        
        const informationDiv = document.createElement( 'div' );
        informationDiv.classList.add('item-board___information');

        
        const row1 = document.createElement( 'div' );
        row1.classList.add('row');

        const h1 = document.createElement( 'h1' );
        h1.innerHTML = name;
        h1.classList.add('cols', 'col-8');

        const i = document.createElement( 'i' );
        i.classList.add('fa-solid','fa-clock');
        const b = document.createElement( 'b' );
        b.classList.add('time');
        b.appendChild(i);
        b.innerHTML = b.innerHTML+' '+time+' min';
        b.classList.add('cols', 'col-4');


        
        const row2 = document.createElement( 'div' );
        row2.classList.add('row');

        const listIngredient = document.createElement('div');
        listIngredient.classList.add('cols', 'col-5', 'item-board_information__ingredients')
        ingredients.forEach(ingredient => {
            const pI = document.createElement('p');
            if(!ingredient.unit){
                ingredient.unit = "";
            }
            if(!ingredient.quantity){
                ingredient.quantity = "";
                doubleDot = ""
            }else{
                doubleDot = " : "
            }
            pI.innerHTML = '<b>' + ingredient.ingredient + doubleDot + '</b>'+ ingredient.quantity +' '+ ingredient.unit;
            listIngredient.appendChild(pI);
        });
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('cols', 'col-7', 'item-board_information__description')
        descriptionDiv.innerHTML = description;

        div.appendChild(img);

        row1.appendChild(h1);
        row1.appendChild(b);
        row2.appendChild(listIngredient);
        row2.appendChild(descriptionDiv);
        informationDiv.appendChild(row1);
        informationDiv.appendChild(row2);
        div.appendChild(informationDiv);

        container.appendChild(div);

        return (container);
    }

    return { getCardRecipe }
}

