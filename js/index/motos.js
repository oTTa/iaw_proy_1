var motos_json = {
				"motos":[
						    {
								id: 1,
								tipo: "Naked",
								marca: "Yamaha",
								cilindraje: 125,
								modelo: "YBR125 ED",
								colores: ["#ffffff","#000000","#cc0000"],
								rating: 3,
								precio: 80000,
								url_imagenes : ["images/motos/naked/yamaha/125/YBR125_ED/blanco.jpg",
												"images/motos/naked/yamaha/125/YBR125_ED/negro.jpg",
												"images/motos/naked/yamaha/125/YBR125_ED/rojo.jpg"
											   ],
								url_minis : ["images/motos/naked/yamaha/125/YBR125_ED/"],
								url_video : "https://www.youtube.com/embed/lleTv_EnyMU",
								vendedores : [
											{
												id: 1,
												nombre:"ASSEN MOTOS",
												direccion:"Brandsen 234",
												telefono:"0291 456-5606",
												latitud: -38.720988,
												longitud: -62.256835,
											},
											{
												id:2,
												nombre:"EUROMOTO",
												direccion:"Av. Parchappe 1250",
												telefono:"0291 455-7067",
												latitud: -38.724319,
												longitud:  -62.251674,
											},
											{
												id:3,
												nombre:"KANDO",
												direccion:"Av. Gral. D. Cerri 765",
												telefono:"0291 452-8726",
												latitud: -38.722134,
												longitud: -62.255279,
											}
											]
							},
							{
								id: 2,
								tipo: "Touring",
								marca: "BMW",
								cilindraje: 800,
								modelo:  "F 800 Gs",
								colores: ["#fcfcfc","#ffffff","#cc0000"],
								rating: 5,
								precio: 250000,
								url_imagenes : ["images/motos/touring/bmw/800/F_800_Gs/blanco_metalizado.jpg",
												"images/motos/touring/bmw/800/F_800_Gs/blanco.jpg",
												"images/motos/touring/bmw/800/F_800_Gs/rojo.jpg"
											   ],
								url_minis : ["images/motos/touring/bmw/800/F_800_Gs/"],
								url_video : "https://www.youtube.com/embed/BaQiI3vkJdA",
								vendedores : [
											{
												id:4,
												nombre:"MotoZone",
												direccion:"Villarino 555",
												telefono:"0291 451-6792",
												latitud: -38.728063,
												longitud: -62.268129,
											}, 
											{
												id:3,
												nombre:"KANDO",
												direccion:"Av. Gral. D. Cerri 765",
												telefono:"0291 452-8726",
												latitud: -38.722134,
												longitud: -62.255279,
											}
											]
							}
						]
			};
var color_select = 0;
var moto_select = null;

$(document).ready(function() {
	cargar_datos(motos_json.motos);
    $('#tipo').change(function () {
    	filtrar(motos_json.motos);
    });
    $('#marca').change(function () {
    	filtrar(motos_json.motos);
    });
    $('#cilindraje').change(function () {
    	filtrar(motos_json.motos);
    });
    $('#modelo').change(function () {
    	filtrar(motos_json.motos);
    });
});

function cargar_datos(){
	var motos = motos_json.motos;
	$("#tipo").empty();
	$("#marca").empty();
	$("#cilindraje").empty();
	$("#modelo").empty();

	$("#tipo").append('<option data-tokens=""></option>');
	$("#marca").append('<option data-tokens=""></option>');
	$("#cilindraje").append('<option data-tokens=""></option>');
	$("#modelo").append('<option data-tokens=""></option>');
	for (var i = 0; i < motos.length; i++) {
		$("#tipo").append('<option data-tokens="' + motos[i].tipo + '">' + motos[i].tipo + '</option>');
		$("#marca").append('<option data-tokens="' + motos[i].marca + '">' + motos[i].marca + '</option>');
		$("#cilindraje").append('<option data-tokens="' + motos[i].cilindraje + '">' + motos[i].cilindraje + 'cc</option>');

	}
	$("#tipo").selectpicker('refresh');
	$("#marca").selectpicker('refresh');
	$("#cilindraje").selectpicker('refresh');
	$("#modelo").selectpicker('refresh');
}

function limpiar_busqueda(){
	cargar_datos();
	$("#imagen_moto").attr("src", "images/moto.png");
	$("#video").attr("src", "https://www.youtube.com/embed/gn1AeD95BxY");
	$("#precio").text("$0");
	$("#colores").empty();
	$("#estrellas").empty();
	for (var j = 0; j < 5; j++) {
		$("#estrellas").append('<span class="estrella glyphicon glyphicon-star-empty" aria-hidden="true"></span>');
	}
	color_select = 0;
	moto_select = null;
	$("#descargar_moto").removeAttr('download');
	$("#descargar_moto").removeAttr('href');
	$("#descargar_json").removeAttr('href');
}

function filtrar(motos){
	var tipo = $("#tipo").find("option:selected").data("tokens");
	var marca = $("#marca").find("option:selected").data("tokens");
	var cilindraje = $("#cilindraje").find("option:selected").data("tokens");
	var modelo = $("#modelo").find("option:selected").data("tokens");

	$("#tipo").empty();
	$("#marca").empty();
	$("#cilindraje").empty();
	$("#modelo").empty();

	if (tipo=="") 
		$("#tipo").append('<option data-tokens=""></option>');

	if (marca=="")
		$("#marca").append('<option data-tokens=""></option>');

	if (cilindraje=="")
		$("#cilindraje").append('<option data-tokens=""></option>');	

	if (modelo==""){
		$("#modelo").append('<option data-tokens=""></option>');
		for (var i = 0; i < motos.length; i++) {
			if (cumple_filtrado(motos[i], tipo, marca, cilindraje)){
					$("#tipo").append('<option data-tokens="' + motos[i].tipo + '">' + motos[i].tipo + '</option>');
					$("#marca").append('<option data-tokens="' + motos[i].marca + '">' + motos[i].marca + '</option>');
					$("#cilindraje").append('<option data-tokens="' + motos[i].cilindraje + '">' + motos[i].cilindraje + 'cc</option>');
					if(tipo!="" && marca!="" && cilindraje!=""){
						$("#modelo").attr('disabled',false);
						$("#modelo").append('<option data-tokens="' + motos[i].modelo + '">' + motos[i].modelo + '</option>');
					}
			}
		}
	
		$("#tipo").selectpicker('refresh');
		$("#marca").selectpicker('refresh');
		$("#cilindraje").selectpicker('refresh');
		$("#modelo").selectpicker('refresh');
	}
	else{
		var i=0;
		encontre = false;
		while (!encontre && i<motos.length) {
			if (es_moto_seleccionada(motos[i], tipo, marca, cilindraje,modelo)){
				encontre=true;
				moto_select=motos[i];
				$("#imagen_moto").attr("src", motos[i].url_imagenes[0]);
				$("#video").attr("src", motos[i].url_video);
				$("#precio").text('$'+motos[i].precio);
				$("#estrellas").empty();
				$("#descargar_json").attr('href',"data:text/plain;charset=UTF-8," + encodeURIComponent(JSON.stringify(moto_select,null,2)));
				for (var j = 0; j < motos[i].rating; j++) {
					$("#estrellas").append('<span class="estrella glyphicon glyphicon-star" aria-hidden="true"></span>');
				}
				for (var j = 0; j < (5-motos[i].rating); j++) {
					$("#estrellas").append('<span class="estrella glyphicon glyphicon-star-empty" aria-hidden="true"></span>');
				}
				for (var j = 0; j < motos[i].colores.length; j++) {
					$("#colores").append('<div id="color'+j+'" data-color="'+j+'" class="box_color"></div>');
					$("#color"+j).css('background-color', motos[i].colores[j]);
					$("#color"+j).click(function() {
					  var color= $(this).data("color");
					  $("#imagen_moto").attr("src", moto_select.url_imagenes[color]);
					  $(this).css('border', '3px solid #009999');
					  $("#color"+color_select).css('border', '1px solid black');
					  $("#descargar_moto").attr('href',moto_select.url_imagenes[color]);
					  color_select= color;
					});
					if (j==0){
						$("#color"+0).css('border', '3px solid #009999');
						$("#descargar_moto").attr('download',true);
						$("#descargar_moto").attr('href',moto_select.url_imagenes[0]);
					}
				}
			}
			i++;
		}
	}

}

function cumple_filtrado(moto, tipo, marca, cilindraje){
	if ((moto.tipo==tipo || tipo=="") && (moto.marca==marca || marca=="") && (moto.cilindraje==cilindraje || cilindraje==""))
		return true;
	else
		return false;
}

function es_moto_seleccionada(moto, tipo, marca, cilindraje, modelo){
	if (moto.tipo==tipo && moto.marca==marca && moto.cilindraje==cilindraje && moto.modelo==modelo)
		return true;
	else
		return false;
}
