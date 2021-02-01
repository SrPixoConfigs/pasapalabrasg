// Variables
// -----------------------------------------------------------------------------

var words = [
	new Word(0, "A", "Contiene la A:", " Agrupacion de personas que se encuentran conectadas a la red", "Sociedad digital"),
	new Word(1, "B", "Empieza por B:", " Espacio diferenciado entre personas por un medio digital", "Brecha digital"),
	new Word(2, "C", "Empieza por C:", " Práctica legal que consiste en el ejercicio del derecho de autor con el objetivo de propiciar el libre uso y distribución de una obra", "Copyleft"),
	new Word(3, "D", "Empieza por D:", " Certificado de identidad electronico relacionado con tu documento de identidad", "DNI electrónico"),
	new Word(4, "E", "Empieza por E:", " Disciplina filosófica que estudia el bien y el mal y sus relaciones con la moral y el comportamiento humano", "Ética"),
	new Word(5, "F", "Empieza por F:", " Signo que una persona realiza para certificar su identidad en un documento electronico", "Firma electronica"),
	new Word(6, "G", "Empieza por G:", " Colección de programas informáticos formados por software libre", "GNU"),
	new Word(7, "H", "Contiene la H:", " Ciberataque con el que se intenta redirigir el tráfico web al sitio del atacante", "Pharming"),
	new Word(8, "I", "Contiene la I:", " Término que hace referencia al estado activo de conectividad", "Online"),
	new Word(9, "J", "Contiene la J:", " Información o enunciado verbal que el emisor envía al receptor a través de un canal de comunicación", "Mensaje"),
	new Word(10, "K", "Empieza por K:", " Unidad de longitud que equivale a 1000 metros", "Kilómetro"),
	new Word(11, "L", "Contiene la L:", " Docuemnto electronico que identifica a una persona con una clave publica, para hacer tramites online", "Certificado digital"),
	new Word(12, "M", "Empieza por M:", " Considerarse a su mismo como una marca comercial y tenerque publicitarse.", "Marca personal"),
	new Word(13, "N", "Contiene la N:", " Perteneciente o relativo a la electrónica", "Electrónico"),
	new Word(14, "O", "Contiene la O:", " Recompensa, galardón o remuneración que se da por algún mérito o servicio.", "Premio"),
	new Word(15, "P", "Empieza por P:", " Calzado de lona, con suela de esparto, cáñamo o goma, que se sujeta al pie por presión o con unas cintas que se atan al tobillo.", "Phishing"),
	new Word(16, "Q", "Empieza por Q:", " Accion de identificar a una persona en un mensaje en una red social", "Etiquetar"),
	new Word(17, "R", "Empieza por R:", " Opinión o consideración en que se tiene a alguien o algo.", "Reputación"),
	new Word(18, "S", "Empieza por S:", " Término anglosajón que se emplea familiarmente para referirse a las estafas por medios electrónicos", "Scamming"),
	new Word(19, "T", "Empieza por T:", " Siglas de Tecnologías de Informacion y de la Comunicación", "TICS"),
	new Word(20, "U", "Empieza por U:", " Que usa algo", "Usuario"),
	new Word(21, "V", "Contiene la V:", " Signo o combinación de signos para hacer funcionar ciertos aparatos.", "Clave"),
	new Word(22, "X", "Contiene la X:", " Persona no conocida", "Extraño"),
	new Word(23, "Y", "Contiene la Y:", " Derecho exclusivo de un autor, editor o concesionario para explotar una obra literaria, científica o artística durante cierto tiempo.", "Copyright"),
	new Word(24, "Z", "Contiene la Z:", " Difusión mundial de modos, valores o tendencias que fomenta la uniformidad de gustos y costumbres.", "Globalización")
];

// Functions
// -----------------------------------------------------------------------------

function Word(idNumber, letter, hint, definition, word, correct) {
	this.idNumber = idNumber;
	this.letter = letter;
	this.hint = hint;
	this.definition = definition;
	this.word = word;
	this.correct = null;
}

function showDefinition(pos) {
	$("#js--hint").html(words[pos].hint);
	$("#js--definition").html(words[pos].definition);
}

var remainingWords = 25;

function checkAnswer(pos) {
	var userAnswer = $("#js--user-answer").val().toLowerCase();
	if (userAnswer == words[pos].word.toLowerCase()) {
		words[pos].correct = true;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--success");

	} else {
		words[pos].correct = false;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--failure");
	}
	remainingWords--;
	$("js--score").html(remainingWords);

	return count++;
}

function pasapalabra(pos) {
	var w = words.splice(pos, 1)[0];
	words.push(w);

}

function continuePlaying() {
	if (count != 25) {
		$("#js--user-answer").val("");
		showDefinition(count);
	} else {
		endGame();
	}
}

var seconds;
var temp;

function countdown() {
	seconds = $("#js--timer").html();
	seconds = parseInt(seconds, 10);
	if (seconds == 1) {
		temp = $("#js--timer");
		temp.innerHTML = 0;
		endGame();
		return;
	}
	seconds--;
	temp = $("#js--timer");
	temp.html(seconds);
	timeoutMyOswego = setTimeout(countdown, 1000);
}

function endGame() {
	$("#js--question-controls").addClass("hidden");
	$("#js--pa-controls").removeClass("hidden");
	$("#js--end-title").html("Fin de partida!");
	$("#js--end-subtitle").html(showUserScore());
	$("#js--close").addClass("hidden")
}

function showUserScore() {
	var counter = 0;
	for (i = 0; i < words.length; i++) {
		if (words[i].correct == true) {
			counter++;
		}
	}
	return "Has conseguido un total de " + counter + " aciertos.";
}


// Main Program
// ----------------------------------------------------------------------------- */

// New game
var count = 0; // Counter for answered words
$("#js--new-game").click(function() {
	$("#js--ng-controls").addClass("hidden");
	$("#js--question-controls").removeClass("hidden");
	$("#js--close").removeClass("hidden");
	showDefinition(count);
	countdown();
});

// Send the answer
$("#js--send").click(function() {
	checkAnswer(count);
	continuePlaying();
});

// Key bindings for send the answer
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "13") {
		checkAnswer(count);
		continuePlaying();
	}
});

// Skip the word
$("#js--pasapalabra").click(function() {
	pasapalabra(count);
	continuePlaying();
});


// Play again
$("#js--pa").click(function() {
	location.reload()
});

// End the game
$("#js--close").click(function() {
	endGame();
});
