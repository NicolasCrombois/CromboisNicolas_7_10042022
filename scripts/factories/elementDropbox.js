function itemDropboxFactory(data) {
    const nom = data;

    //Format d'affichage d'une option dans la dropbox
    function getOption(type) {
        const div = document.createElement( 'div' );
        div.id = nom.replace(' ', '_');
        div.classList.add('cols', 'col-4');
        div.innerHTML = nom
        div.onclick = function(){addItem(type, nom)};
        return (div);
    }
    //Format d'affichage d'une option dans la liste des items sélectionnés
    function getOptionDeleteable(type) {
        const div = document.createElement( 'div' );
        const p = document.createElement( 'p' );
        const i = document.createElement( 'i' );
        i.classList.add('fa-solid', 'fa-xmark');
        i.onclick = function(){removeItem(type, nom)};
        div.id = nom.replaceAll(' ', '_');
        p.innerHTML = nom
        div.appendChild(p);
        div.appendChild(i)
        return (div);
    }
    return { getOption, getOptionDeleteable }
}