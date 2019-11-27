const movies = [
  {
    id: '1',
    title: 'Oceans 8',
    category: 'Comedy',
    likes: 4,
    dislikes: 1
  }, {
    id: '2',
    title: 'Midnight Sun',
    category: 'Comedy',
    likes: 2,
    dislikes: 0
  }, {
    id: '3',
    title: 'Les indestructibles 2',
    category: 'Animation',
    likes: 3,
    dislikes: 1
  }, {
    id: '4',
    title: 'Sans un bruit',
    category: 'Thriller',
    likes: 6,
    dislikes: 6
  }, {
    id: '5',
    title: 'Creed II',
    category: 'Drame',
    likes: 16,
    dislikes: 2
  }, {
    id: '6',
    title: 'Pulp Fiction',
    category: 'Thriller',
    likes: 11,
    dislikes: 3
  }, {
    id: '7',
    title: 'Pulp Fiction',
    category: 'Thriller',
    likes: 12333,
    dislikes: 32
  }, {
    id: '8',
    title: 'Seven',
    category: 'Thriller',
    likes: 2,
    dislikes: 1
  }, {
    id: '9',
    title: 'Inception',
    category: 'Thriller',
    likes: 2,
    dislikes: 1
  }, {
    id: '10',
    title: 'Gone Girl',
    category: 'Thriller',
    likes: 22,
    dislikes: 12
  },
]

//export const movies$ = new Promise((resolve, reject) => setTimeout(resolve, 100, movies))

window.addEventListener("load",run,false);


function run(){
	
	
	//On initialise le select pour choisir la catégorie voulue
	var optionList = document.getElementsByClassName('listFilm')[0];
	var listCateg = new Array();
	var nb = 0 ;
	movies.forEach(function(movie){
		var categ = movie['category'];
		if(!isIn(listCateg,categ) ) {
			listCateg.push(categ);
			var opt = document.createElement('option')
			opt.appendChild( document.createTextNode(categ) );
			opt.value = nb;
			optionList.appendChild(opt);
			nb++;
		}
	});
	optionList.addEventListener('change',actionFilm,false); // recharge la page quand on changera la catégorie
	
	
	var listNbFilm = document.getElementsByClassName('NbFilmPage')[0]; // récupere le nombre de film à afficher par page
	listNbFilm.addEventListener('change',actionFilm,false); // recharge la page quand on changera le nombre de film par page
	
	//	Button précédent
	var buttonPrecedent = document.getElementById('precedent');
	buttonPrecedent.addEventListener('click',changePage,false);
	//	Button suivant
	var buttonSuivant = document.getElementById('suivant');
	buttonSuivant.addEventListener('click',changePage,false);
	
	var pageMax= 0;
	
	
	actionFilm();
	/**
	* Initialise le button précédant et suivant afin de ne pouvoir seulement appuyer sur le button suivant, remet la page à 1 
	* et appel l'affichage des films
	*/
	function actionFilm(){
		buttonPrecedent.removeAttribute('class');
		buttonPrecedent.setAttribute('class','buttonGrise');	
		buttonSuivant.removeAttribute('class');
		buttonSuivant.setAttribute('class','buttonAffiche');
		page = 1;
		document.getElementsByClassName('numPage')[0].innerHTML = 1;
		afficheFilm();
	}
	
	/**
	* affiche les films en fonction de leur catégorie, du nomber de film a afficher par page et de la page  
	*/
	function afficheFilm(){
		var nbFilmAffiche = 1;
		var nbFilm = 0;
		
		var nbFilmPage = parseInt(listNbFilm.options[listNbFilm.selectedIndex].text); // réupere le nombre de film par page
		var choix = optionList.options[optionList.selectedIndex].text; // récupere la catégorie à afficher
		
		document.body.removeChild(document.getElementById('afficheFilm')); // réinitialise la div des films
		
		// initialise la div des films
		var div = document.createElement('div');
		div.setAttribute('id','afficheFilm');
		document.body.appendChild(div);
		var center = document.createElement('center');
		div.appendChild(center);
				
		movies.forEach(function(movie){
			if( (choix == movie['category']) || ( choix == 'Tous' ) ){
				if( (nbFilmAffiche/page <= nbFilmPage) && (nbFilmAffiche >  nbFilmPage*(page-1))  ){ // évite d'afficher un nombre de film supérieur	ET	 supérieur au nombre vouleur	ET	 	
				
				
				
				//carte
					var carte = document.createElement('div');
					carte.setAttribute('id','cartes');
					carte.setAttribute('class',movie['id']);
					center.appendChild(carte);
					
				// button delete
					var supp = document.createElement('img');
					supp.setAttribute('class','delete');
					supp.setAttribute('name',movie['id']);
					supp.src = 'images/delete.png';
					supp.addEventListener('click',deleteMovie,false);
					carte.appendChild(supp);
					
				//image
					var img = document.createElement('img');
					img.setAttribute('class','imageFilm');
					img.src = 'films/'+movie['title']+'.jpg';
					carte.appendChild(img);
				//titre
					var title = document.createElement('p');
					title.innerHTML = movie['title'];
					title.setAttribute('class','title');
					carte.appendChild(title);
					
				//category
					var category = document.createElement('p');
					category.innerHTML = movie['category'];
					category.setAttribute('class','category');
					carte.appendChild(category);
					
				//jauge
					var jauge = document.createElement('div'); 
					jauge.setAttribute('class','jauge');
					carte.appendChild(jauge);
					
					var divLike = document.createElement('div');
					divLike.setAttribute('class','divLike');
					jauge.appendChild(divLike);
					
					var imgLike = document.createElement('img');
					imgLike.setAttribute('class','imgLike');
					imgLike.src = 'images/like.png';
					imgLike.addEventListener('click',likeAction,false);
					imgLike.addEventListener('mouseover',changeLike,false);
					divLike.appendChild(imgLike);
					
					var like =  document.createElement('span');
					like.setAttribute('class','like');
					var nbLike = movie['likes'];
					if(nbLike.toString().length > 3 ){	// change le nombe si celui-ci est supérieur 999 ex: 12000 => 12k
						nbLike = nbLike.toString().substring(0,nbLike.toString().length-3)+'k';
					}
					like.innerHTML = nbLike ;
					divLike.appendChild(like);
					
					var divDislike = document.createElement('div');
					divDislike.setAttribute('class','divDislike');
					jauge.appendChild(divDislike);
			
					var imgDislike = document.createElement('img');
					imgDislike.setAttribute('class','imgDislike');
					imgDislike.src = 'images/dislike.png';
					imgDislike.addEventListener('click',dislikeAction,false);
					imgDislike.addEventListener('mouseover',changeDislike,false);
					divDislike.appendChild(imgDislike);
					
					var dislike =  document.createElement('span');
					dislike.setAttribute('class','dislike');
					var nbDislike = movie['dislikes'];
					if(nbDislike.toString().length > 3 ){ // change le nombe si celui-ci est supérieur 999 ex: 12000 => 12k
						nbDislike = nbDislike.toString().substring(0,nbDislike.toString().length-3)+'k';
					}
					dislike.innerHTML = nbDislike ;
					divDislike.appendChild(dislike);	
					
					var jaugeDislike = document.createElement('div'); 
					jaugeDislike.setAttribute('class','jaugeDislike');
					jauge.appendChild(jaugeDislike);
					
					var jaugeLike = document.createElement('div');
					jaugeLike.setAttribute('class','jaugeLike');
					jaugeLike.style.width =  Math.round(movie['likes']/(movie['likes']+movie['dislikes'])*100*1.2) +'px';
					jaugeDislike.appendChild(jaugeLike);
					
				
					}
				nbFilmAffiche++;
				nbFilm ++ ;
			}
		});
		pageMax = nbFilm/nbFilmPage; // page maximun que l'on peut afficher
	}
	/**
	* fonction qui ajoute un dislike à un film
	*/
	function dislikeAction(){
		var elem = this;
		var movieToDislike = this.parentNode.parentNode.parentNode.className; 	// film à disliker
		var nbDislike; // nombre de dislike que posède le film
		movies.forEach(function(movie){
			if(movie['id'] == movieToDislike){
				nbDislike = movie['dislikes'] + 1 ;
				movie['dislikes'] = nbDislike;
				if(nbDislike.toString().length > 3 ) nbDislike = nbDislike.toString().substring(0,nbDislike.toString().length-3)+'k';// change le nombe si celui-ci est supérieur 999 ex: 12000 => 12k
				elem.parentNode.parentNode.getElementsByClassName('jaugeDislike')[0].getElementsByClassName('jaugeLike')[0].style.width = Math.round(movie['likes']/(movie['likes']+movie['dislikes'])*120) +'px';
				// ajuste le width de la div jaugeLike en fonction du nombre de like / like + dislike * 100 * 1.2 (car le width jaugeDislike = 120px)
				
			}
		});		
		this.parentNode.getElementsByClassName('dislike')[0].innerHTML = nbDislike ; // afiche le nouveau nombre de dislike
		
		
	}
	/**
	* fonction qui ajoute un like à un film
	*/	
	function likeAction(){
		var elem = this;
		var movieTolike = this.parentNode.parentNode.parentNode.className; // film à liker
		var nblike ; // nombre de like que posède le film
		movies.forEach(function(movie){
			if(movie['id'] == movieTolike){
				nblike = movie['likes'] +1;
				movie['likes'] = nblike;
				if(nblike.toString().length > 3 )nblike = nblike.toString().substring(0,nblike.toString().length-3)+'k';// change le nombe si celui-ci est supérieur 999 ex: 12000 => 12k
				elem.parentNode.parentNode.getElementsByClassName('jaugeDislike')[0].getElementsByClassName('jaugeLike')[0].style.width = Math.round(movie['likes']/(movie['likes']+movie['dislikes'])*120) +'px';
				// ajuste le width de la div jaugeLike en fonction du nombre de like / like + dislike * 100 * 1.2 (car le width jaugeDislike = 120px)
			}
		});		
		this.parentNode.getElementsByClassName('like')[0].innerHTML = nblike ; // afiche le nouveau nombre de like
		
		
	}
	
	/**
	* supprimer un film 
	*/	
	function deleteMovie(){
		var movieToDelete = this.parentNode.className; // le film à supprimer
		this.parentNode.parentNode.removeChild(this.parentNode);	// le retire de laffichage
		
		movies.forEach(function(movie, index, object){		// le recheche dans le array movies
			if(movie['id'] == movieToDelete){
				object.splice(index, 1); // le retire 
			}
		});
		
		listCateg.forEach(function(categ, index, object){	// le retire de la liste déroulante si jamais la catégorie ne posède plus de film
			var isIn = false;
			movies.forEach(function(movie){
				if( categ == movie['category'])  isIn = true;
			});
			if(!isIn){ // si elle n'est plus présente on la retire
				optionList.remove(index+1);
				object.splice(index, 1);
			}
		});
	}
	
	/**
	*	change de page quand on clique sur un des bouttons
	*/
	function changePage(){
		var action = this.id; // récuprer l'action à faire => précédent ou suivant
		if( (this.className != 'buttonGrise') &&(pageMax > 1 )){	// si le bouton n'est pas grisé et que la page maximun est supérieur à 1 ;
		
			// on affiche les buttons
			buttonPrecedent.removeAttribute('class');
			buttonPrecedent.setAttribute('class','buttonAffiche');	
			buttonSuivant.removeAttribute('class');
			buttonSuivant.setAttribute('class','buttonAffiche');
			if(action == 'suivant'){
				page++;
			}
			if(action =='precedent'){
				page--;
			}
			if( page >= pageMax ){ // si la page maximun est atteint
				buttonSuivant.removeAttribute('class');
				buttonSuivant.setAttribute('class','buttonGrise');
			}
			else if( page <= 1){// si la page minimun est atteint
				buttonPrecedent.removeAttribute('class');
				buttonPrecedent.setAttribute('class','buttonGrise');
			}
			document.getElementsByClassName('numPage')[0].innerHTML = page;
			afficheFilm();
		}
	}
	
	/**
	* cherche a savoir si un élément est pésent dans la collection d'un array
	* @param tab (array)  => array comprenant une collection
	* @param elem (string) => élément a rechercher
	* @return true si l'élément est présent dans le tableau false si non
	**/
	function isIn(tab, elem){
		isNot = false;
		for(nb = 0 ; nb < tab.length ; nb++){
			if ( elem == tab[nb]) isNot = true;
		}
		return isNot ;
	}
	
	/**
	* change l'image du like en bleu quand la souris passe dessus
	*/
	function changeLike() {
		this.src = 'images/likeBleu.png';
		this.addEventListener("mouseleave", function(){this.src = 'images/like.png';}); // remet l'image normal quand la souris se déplace
	}
	/**
	* change l'image du dislike en bleu quand la souris passe dessus
	*/
	function changeDislike() {
		this.src = 'images/dislikeRed.png';
		this.addEventListener("mouseleave", function(){this.src = 'images/dislike.png';});// remet l'image normal quand la souris se déplace
	}
	
	





}


