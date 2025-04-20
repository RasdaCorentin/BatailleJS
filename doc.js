/* TODO LIST 
Créer un animation de jeu de cartes 

Gérer les égalité du jeu de bataille 
Mettre un système de score
*/
$(()=>{
    var scoreO = []
    var scoreJ = []
    let pairJoueurOrdi = createGame();
    
    $("button").click(()=>{
        let deckJoueur = pairJoueurOrdi.deckJoueur;
        let deckOrdi = pairJoueurOrdi.deckOrdi;
        //On utilise pairJoueurOrdi pour récupérer une carte du deck de chaque joueur
        tirageMain(deckJoueur, deckOrdi)
        
    })
})

function randInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min); 
}
function randcard(){
    tirage = ""+randInt(1,12);
    rand = randInt(1,4);
    switch(rand){
        case 1 :
            couleur = "Tile";
            break;
        case 2 :
            couleur = "Heart";
            break;
        case 3 : 
            couleur = "Pike";
            break;
        case 4 :
            couleur = "Clover";
            break;
    }
    return {
        tirage,
        couleur
    }
    //$(arg).attr("src","./cartes/"+str2+"_"+str+".jpg");
}

function createDeck(){
    let deck = [];
    // Utilise randcard pour créer un tableau de cartes de taille 26
    for(let i = 0; i < 26; i++){
        do {
            var candidat = randcard();
            //Vérifier si la carte existe déjà dans le deck
        } while (verifCarte(deck, candidat) == false);
        deck.push(candidat);
    }
    return deck;
}

function verifCarte(deck, carte){
    //Vérifier si la carte existe déjà dans le deck
    for(let i = 0; i < deck.length; i++){
        if(deck[i].tirage == carte.tirage && deck[i].couleur == carte.couleur){
            return false;
        }
    }
    return true;
}

function createGame(){
    let deckJoueur = createDeck();
    let deckOrdi = createDeck();
    let containerO = $("#containerOrdi")
    let containerJ = $("#containerJoueur")
    scoreO = [$("#scoreOrdi"),0]
    scoreJ = [$("#scoreJoueur"),0]
    scoreO[0].append($("<span style='font-size: 45px;'>"+scoreO[1]+"</span>"))
    scoreJ[0].append($("<span style='font-size: 45px;'>"+scoreJ[1]+"</span>"))
    for(let i=0; i<deckJoueur.length; i++){
        containerJ.append($("<img class='joueur' src='./Cards/back_2.jpg'/>"))
    }
    let joueurCards = $(".joueur")
    //Disposer les cartes du joueur supperposées avec un léger déclage
    for(let i=0; i<deckJoueur.length; i++){
        joueurCards.eq(i).css({
            position: "absolute",
            top: "20px",
            left: (i*20+20)+"px"
        });
    }
    containerJ.css({
        border : "1px solid black",
        top : "1300px",
        height : "500px",
        width : "850px",
        position : "absolute",
    })
    for(let i=0; i<deckOrdi.length; i++){
        containerO.append($("<img class='ordi' src='./Cards/back_1.jpg'/>"))
    }
    //Disposer les cartes de l'ordinateur supperposées avec un léger déclage
    let ordiCards = $(".ordi")
    for(let i=0; i<deckOrdi.length; i++){
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

function tirageMain(deckJ, deckO){
    //  
        
    let mains = {joueur: deckJ.pop(), ordi: deckO.pop()}
    let decks = {joueur: deckJ, ordi: deckO}
    $("#terrainBataille").append("<img class='joueur' src='./Cards/Style/black/"+mains.joueur.couleur+"_"+mains.joueur.tirage+".png'/>");
    $("#terrainBataille").append("<img class='ordi' src='./Cards/Style/black/"+mains.ordi.couleur+"_"+mains.ordi.tirage+".png'/>");
    evalMain(mains, decks)
    setTimeout(()=>{
        $("#terrainBataille").empty();
        let cartesJ = $(".joueur");
        let cartesO = $(".ordi");
        cartesO.eq(0).remove();
        cartesJ.eq(0).remove();
    }, 5000);  
    return {
        joueur : mains.joueur,
        ordi : mains.ordi
    }
}

function evalMain(mains, decks){
    //recup sous la forme {mains.joueur.tirage, mains.ordi.tirage}
    if(mains.joueur.tirage > mains.ordi.tirage){
        //Augmenter le score du joueur 
        scoreJ[1] += 1
        scoreJ[0].css({
            color : "blue",
            fontSize : "45px"
        })
        scoreJ[0].text(scoreJ[1])

    } else if(mains.joueur.tirage == mains.ordi.tirage){
        //Retirer deux cartes
        tirageMain(decks.joueur, decks.ordi)
    }
    else{
        scoreO[1] += 1
        scoreO[0].text(scoreO[1])
        scoreO[0].css({
            color : "red",
            fontSize : "45px"
        })
        //augmenter le score de l'ordi 
    }
}