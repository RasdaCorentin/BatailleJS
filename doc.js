/* TODO LIST 
Créer un animation de jeu de cartes 
Gérer les égalité du jeu de bataille 
Mettre un système de score
*/
$(()=>{
    pairJoueurOrdi = createGame();
    
    $("button").click(()=>{
        //On utilise pairJoueurOrdi pour récupérer une carte du deck de chaque joueur
        let deckJoueur = pairJoueurOrdi.deckJoueur;
        let deckOrdi = pairJoueurOrdi.deckOrdi;

        let cardToReveal = deckJoueur.pop();
        let cardToReveal2 = deckOrdi.pop();
        
        //on va ensuite les disposer dans 
        /*<span id="terrainBataille" style="top:550px; height:500px; width:850px; position: absolute; border: 1px solid black; display: block;"></span>*/ 
        $("#terrainBataille").append("<img class='joueur' src='./cartes/"+cardToReveal.couleur+"_"+cardToReveal.tirage+".jpg'/>");
        $("#terrainBataille").append("<img class='ordi' src='./cartes/"+cardToReveal2.couleur+"_"+cardToReveal2.tirage+".jpg'/>");
        setTimeout(()=>{
            $("#terrainBataille").empty();
            let cartesJ = $(".joueur");
            let cartesO = $(".ordi");
            cartesO.eq(0).remove();
            cartesJ.eq(0).remove();
        }, 3000);  
        //Enléve une carte à chaque ensembre
    })
})

function randInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min); 
}
function randcard(){
    tirage = ""+randInt(1,8);
    rand = randInt(1,4);
    switch(rand){
        case 1 :
            couleur = "car";
            break;
        case 2 :
            couleur = "coe";
            break;
        case 3 : 
            couleur = "pic";
            break;
        case 4 :
            couleur = "tre";
            break;
    }
    return {
        tirage,
        couleur
    }
    //$(arg).attr("src","./cartes/"+str2+"_"+str+".jpg");
}

function createDeck(){
    //TODO : éviter les doublons
    let deck = [];
    // Utilise randcard pour créer un tableau de cartes de taille 26
    for(let i = 0; i < 26; i++){
        deck.push(randcard());
    }
    return deck;
}

function createGame(){
    let deckJoueur = createDeck();
    let deckOrdi = createDeck();
    let containerO = $("#containerOrdi")
    let containerJ = $("#containerJoueur")
    for(var i=0; i<deckJoueur.length; i++){
        containerJ.append($("<img class='joueur' src='./cartes/back_2.jpg'/>"))
    }
    let joueurCards = $(".joueur")
    //Disposer les cartes du joueur supperposées avec un léger déclage
    for(var i=0; i<deckJoueur.length; i++){
        joueurCards.eq(i).css({
            position: "absolute",
            top: "20px",
            left: (i*20+20)+"px"
        });
    }
    containerJ.css({
        border : "1px solid black",
        top : "1100px",
        height : "500px",
        width : "850px",
        position : "absolute",
    })
    for(var i=0; i<deckOrdi.length; i++){
        containerO.append($("<img class='ordi' src='./cartes/back_1.jpg'/>"))
    }
    //Disposer les cartes de l'ordinateur supperposées avec un léger déclage
    let ordiCards = $(".ordi")
    for(var i=0; i<deckOrdi.length; i++){
        ordiCards.eq(i).css({
            position: "absolute",
            top: "20px",
            left: (i*20+20)+"px"
        });
    }
    containerO.css({
        border : "1px solid black",
        height : "500px",
        width : "850px",
        position : "absolute",
    })

    return {
        deckJoueur,
        deckOrdi
    }
}