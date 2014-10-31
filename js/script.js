const URLBASE = "http://serve.iflexdigital.com.br/lomatech/app/";

function idmorador(){
	return($.cookie('IDAppLomactech'));

}
/*-----------------------------------------MEUS--DADOS-----------------------------------------*/
function meusdados(){


	$.post(URLBASE+'meus_dados.php', {acao:'retornar', id:idmorador()}, function(data) {
					$.each( data, function( ) {
						$('#id_morador_form_meus_dados').val(idmorador());
						
						$('#nome_meus_dados').val(data.nome);
						$('#nome_form_dados').val(data.nome);
						
						$('#sexo_meus_dados').val(data.sexo);
						$('#sexo_form_dados').val(data.sexo);
						
						$('#data_nascimento_meus_dados').val(data.data_nascimento);
						$('#data_nascimento_form_dados').val(data.data_nascimento);
						
						$('#email_meus_dados').val(data.email);
						$('#email_form_dados').val(data.email);
						
						$('#rg_meus_dados').val(data.rg);
						$('#rg_form_dados').val(data.rg);
						
						$('#cpf_meus_dados').val(data.cpf);
						$('#cpf_form_dados').val(data.cpf);
						
						$('#telefone_meus_dados').val(data.telefone);
						$('#telefone_form_dados').val(data.telefone);
						
						$('#celular_meus_dados').val(data.celular);
						$('#celular_form_dados').val(data.celular);
						
						$('#classificacao_meus_dados').val(data.tipo);
						$('#classificacao_form_dados').val(data.tipo);
						
						$('#banner_meus_dados').attr('src',data.banner);
						$('#banner_form_dados').attr('src',data.banner);
						
						$('#andar_meus_dados').val(data.andar);						
						$('#andar_form_dados').val(data.andar);
						
						$('#condominio_meus_dados').val(data.condominio);
						$('#condominio_form_dados').val(data.condominio);
						
						$('#torrebloco_meus_dados').val(data.blocotorres);
						$('#torrebloco_form_dados').val(data.blocotorres);
						
						$('#apartamento_meus_dados').val(data.apartamentosala);
						$('#apartamento_form_dados').val(data.apartamentosala);
						
					})
		}, 'json');

}


function editar_meus_dados(){
	$.post(URLBASE+'meus_dados.php', $('#formulario_meus_dados').serialize(), function(data) {
					$.each( data, function( ) {
					
						meusdados();
											
						if(data.status){
							$('.msgsucesso_meus_dados p').html(data.mensagem);
							$('.msgsucesso_meus_dados').css('display','block');
						}else{
							$('.msgerro_meus_dados p').html(data.mensagem)
							$('.msgerro_meus_dados').css('display','block');
						}
						window.location = "#meus_dados";
					
					});
	})

}




$(function(){
	var validar = idmorador();
	var ancora = window.location.hash;
	if(!validar){
		window.location = "#login";
	}else{
		if(ancora == '' || ancora == '#home'){
			window.location = "#painel";
		}
		
	
	}
	// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#meus_dados"){
				meusdados();
			}
	//fim

	

	$('#formulario_login').submit(function(){
		
		$.post(URLBASE+'logar.php', $( this ).serialize(), function(data) {
					$.each( data, function( ) {
						if(data.retorno){
							$.cookie('IDAppLomactech', data.id, { expires: 360 });
							window.location = "#painel";						
						}else{
						
							$('.errologin').html(data.mensagem);
						}
					
					})
		}, 'json');
	
	return false;
	})
			
			

})
/*-----------------------------------------MEUS--ANIMAIS-----------------------------------------*/
function meusanimais(){
	var lista = '';
	$.post(URLBASE+'meu_animais.php', {acao:'retornarTodos', id_morador:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						lista += ' <li style="padding-left:0; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<h2>'+data[x].nome_animal;
						lista +=	'<img src="img/btn/animais.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2>';
						lista +=	'<form >';
						lista +=	  '<fieldset data-role="controlgroup" data-type="horizontal">';
						lista +=		'<a href="#form_meus_animais" onClick="editar_meus_animais('+data[x].ID+');" id="btn-list-detalhe" class="ui-btn ui-corner-all">Detalhes/Editar</a>';
						lista +=		'<a href="#" onClick="excluirAnimal('+data[x].ID+');" id="btn-list" class="ui-btn ui-corner-all">Excluir</a>	';
						lista +=	 ' </fieldset>';
						lista +=	'</form>';
						lista +=  '</li>';
						x++;
					});
					$('#listadeanimais').html(lista);
					$('#listadeanimais').listview("refresh");
		}, 'json');
						

}
// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#meus_animais"){
				meusanimais();
			}
	//fim
	function editar_meus_animais(){
	$.post(URLBASE+'meus_animais.php', $('#formulario_meus_animais').serialize(), function(data) {
					$.each( data, function( ) {
					
						meusanimais();
											
						if(data.status){
							$('.msgsucesso_meus_animais p').html(data.mensagem);
							$('.msgsucesso_meus_animais').css('display','block');
						}else{
							$('.msgerro_meus_animais p').html(data.mensagem)
							$('.msgerro_meus_animais').css('display','block');
						}
						window.location = "#meus_animais";
					
					});
	})

}
/*-----------------------------------------DOCUMENTOS--INFORMES-----------------------------------------*/
function documentos(){
	var lista = '';
	$.post(URLBASE+'documentos_informes.php', {acao:'retornarTodos', condominio:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						lista += ' <div class="ui-grid-b-meio">';
						lista += ' <div class="ui-bar ui-bar-b-meio" style="height:40px;" > ';
						lista += ' <img src="img/btn/doc_pequeno.png" align="right" style="margin: 10px 0px;"> ';
						lista += '<p class="apresentacao">'+data[x].titulo;
						lista += '</p>';
						lista += '<p class="apresentacao_data"><h2>30/10/2014</h2> <br><h5 style="margin-left: 13px;font-size: 12px;">08:00hrs</h5> </p>';
						lista +=	'</div>';
						lista +=	  '</div>';
						x++;
					});
					$('#listadocumentos').html(lista);
					$('#listadocumentos').listview("refresh");
		}, 'json');
						

}
// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#documentos_informes"){
				documentos();
			}
	//fim
	
/*-----------------------------------------RESERVAS-----------------------------------------*/
function reservas(){
	var lista = '';
	$.post(URLBASE+'reservas.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						lista += ' <a href="#form_reservas" id="btn-list-detalhe novo" style="float: right; width: 40%;margin-right: 90px;" class="ui-btn ui-corner-all">Efetuar Reserva</a> ';
						lista += 	' <ul data-role="listview">';
						lista += 		' <li style="padding-left:0; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista += 				' <h2> '+data[x].nome;' <img src="img/btn/reservas.png" align="right" style="margin: 0px 0px;">';
						lista += 					' <p class="apresentacao_data"><h2 style="color: #FFF;text-shadow: none;margin-left:13px">30/10/2014</h2> ';
						lista += 						' <h5 class="data_detalhe">'+data[x].horario_inicio; às +data[x].horario_fim;'</h5> ';
						lista += 						' <h2 style="color:#FFF; text-shadow: none;text-align:center;">'+data[x].nome;
						lista += 					' </p> ';
						lista += 				'</h2>';
						lista += 			'<form >';
						lista += 				'<fieldset data-role="controlgroup" data-type="horizontal">';
						lista += 					'<a href="#form_reservas" onClick="detalhe_reservas('+data[x].ID+');" id="btn-list-detalhe" class="ui-btn ui-corner-all">Ver Dados</a>';
						lista += 					'<a href="#" onClick="cancelar_reserva('+data[x].ID+');" id="btn-list" class="ui-btn ui-corner-all">Cancelar</a>	';
						lista += 				' </fieldset>';
						lista += 			'</form>';
						lista += 		'</li>';
						lista += 	'</ul>';
						x++;
					});
					$('#listareservas').html(lista);
					$('#listareservas').listview("refresh");
		}, 'json');
						

}
// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#reservas"){
				reservas();
			}
	//fim
/*------------------------------------------------EVENTOS-------------------------------------------*/
function eventos(){
	var lista = '';
	$.post(URLBASE+'eventos.php', {acao:'retornarTodos', condominio:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						lista += '	 <li style="padding-left:0; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista += '		<h2 style="color: #FFF;text-shadow: none;">' +data[x].nome; '<img src="img/btn/eventos.png" align="right" style="margin: 0px 0px;"></h2> ';
						lista += ' 		<h1 style="color:#FFF; text-shadow: none;text-align:center;font-size:20px;">' +data[x].nome; '</h1>';
						lista += '	 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">PUBLICADO EM :31/10/2014</h3><br>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DATA DO EVENTO E LOCAL</h3>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">Data e hora de Inicio: 18/10/2014 ás 00:00:00</h4>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">Data e hora de Termino: 18/10/2014 ás 00:00:00</h4>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">Local:' +data[x].nome;'</h4>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">Evento Para: ' +data[x].nome;'</h4>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DESCRIÇÃO DO EVENTO</h3>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">' +data[x].descricao;'</h4>';
						lista += '	</li>';
						x++;
					});
					$('#listaeventos').html(lista);
					$('#listaeventos').listview("refresh");
		}, 'json');
						

}
// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#eventos"){
				eventos();
			}
	//fim
	
/*-----------------------------------------MINHA FAMILIA---------------------------------------------------*/
function minha_familia(){


	$.post(URLBASE+'minha_familia.php', {acao:'retornar', id:idmorador()}, function(data) {
					$.each( data, function( ) {
						$('#id_morador_form_familia').val(idmorador());
						
						$('#nome_minha_familia').val(data.nome);
						$('#nome_form_familia').val(data.nome);
						
						$('#sexo_minha_familia').val(data.sexo);
						$('#sexo_form_familia').val(data.sexo);
						
						$('#data_nascimento_minha_familia').val(data.data_nascimento);
						$('#data_nascimento_form_familia').val(data.data_nascimento);
						
						$('#email_minha_familia').val(data.email);
						$('#email_form_familia').val(data.email);
						
						$('#rg_minha_familia').val(data.rg);
						$('#rg_form_familia').val(data.rg);
						
						$('#cpf_minha_familia').val(data.cpf);
						$('#cpf_form_familia').val(data.cpf);
						
						$('#telefone_minha_familia').val(data.telefone);
						$('#telefone_form_familia').val(data.telefone);
						
						$('#celular_minha_familia').val(data.celular);
						$('#celular_form_familia').val(data.celular);
						
						$('#classificacao_minha_familia').val(data.tipo);
						$('#classificacao_form_familia').val(data.tipo);
						
						$('#banner_minha_familia').attr('src',data.banner);
						$('#banner_form_familia').attr('src',data.banner);
						
						
						
					})
		}, 'json');

}


function editar_familia(){
	$.post(URLBASE+'minha_familia.php', $('#formulario_minha_familia').serialize(), function(data) {
					$.each( data, function( ) {
					
						meusdados();
											
						if(data.status){
							$('.msgsucesso_minha_familia p').html(data.mensagem);
							$('.msgsucesso_minha_familia').css('display','block');
						}else{
							$('.msgerro_minha_familia p').html(data.mensagem)
							$('.msgerro_minha_familia').css('display','block');
						}
						window.location = "#minha_familia";
					
					});
	})

}


	// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#minha_familia"){
				minha_familia();
			}
	//fim

/*-----------------------------------------------OCORRENCIAS----------------------------------------------
function ocorrencias(){
	var lista = '';
	$.post(URLBASE+'ocorrencias.php', {acao:'retornarTodos', condominio:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						lista += '<ul data-role="listview" id="listarocorrencia" >';
						lista += ' <li style="padding-left:0; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista += '  <h2 style="color: #FFF;text-shadow: none;"> '+data[x].titulo;' <img src="img/btn/ocorrencias_pequeno.png" align="right" style="margin: 0px 0px;">';
						lista += '   <form>';
						lista += '		<fieldset data-role="controlgroup" data-type="horizontal">';
						lista += '		<a href="#" id="btn-list-detalhe" style=" margin: 0px 18px 0px -20px;" class="ui-btn ui-corner-all">Em aberto</a>';
						lista += '		<a href="#" id="btn-list-detalhe" class="ui-btn ui-corner-all">Detalhes</a>';
						lista += '		<a href="#" onClick="excluirocorrencia '+data[x].ID+;' " id="btn-list" style="width: 40%;background-color:#820d12; " class="ui-btn ui-corner-all">Cancelar</a>';
						lista += '		</fieldset>';
						lista += '		</form>';													
						lista += '		</h2>';
						lista += '		<h1 style="color:#FFF; text-shadow: none;text-align:center;font-size:20px;">Apresentação de tipografia do aplicativo</h1>';
						lista += '		<img id="" src="">';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">PUBLICADO EM :31/10/2014</h3><br>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DATA DA OCORRENCIA E LOCAL</h3>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">Data: 18/10/2014 ás 00:00:00</h4>';							
						lista += '		<h4 style="text-shadow: none; color: #FFF;">Local: Financeiro</h4>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DESCRIÇÃO DA OCORRENCIA</h3>';
						lista += '		<h4 style="text-shadow: none; color: #FFF;">'+data[x].descricao;'</h4>';
						lista += '	</li>';
						lista += '</ul>';
						x++;
					});
					$('#listarocorrencias').html(lista);
					$('#listarocorrencias').listview("refresh");
		}, 'json');
}						


// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#ocorrencias"){
				ocorrencias();
			}
	//fim
*/

/*-----------------------------------------------MEUS--VEICULOS--------------------------------------*/
function meusveiculos(){
	var lista = '';
	$.post(URLBASE+'meus_veiculos.php', {acao:'retornarTodos', id_morador:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						lista += ' <li style="padding-left:0; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<h2>'+data[x].marca;
						lista +=	'<img src="img/btn/veiculo-pequeno.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2>';
						lista +=	'<form >';
						lista +=	  '<fieldset data-role="controlgroup" data-type="horizontal">';
						lista +=		'<a href="#form_meus_veiculos" onClick="editar_meus_veiculos('+data[x].ID+');" id="btn-list-detalhe" class="ui-btn ui-corner-all">Detalhes/Editar</a>';
						lista +=		'<a href="#" onClick="excluirveiuclo('+data[x].ID+');" id="btn-list" class="ui-btn ui-corner-all">Excluir</a>	';
						lista +=	 ' </fieldset>';
						lista +=	'</form>';
						lista +=  '</li>';
						x++;
					});
					$('#listarveiculos').html(lista);
					$('#listarveiculos').listview("refresh");
		}, 'json');
						

}
// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#meus_veiculos"){
				meusveiculos();
			}
	//fim
	function editar_meus_veiculos(){
	$.post(URLBASE+'meus_veiculos.php', $('#formulario_meus_veiculos').serialize(), function(data) {
					$.each( data, function( ) {
					
						meusveiculos();
											
						if(data.status){
							$('.msgsucesso_meus_veiculos p').html(data.mensagem);
							$('.msgsucesso_meus_veiculos').css('display','block');
						}else{
							$('.msgerro_meus_veiculos p').html(data.mensagem)
							$('.msgerro_meus_veiculos').css('display','block');
						}
						window.location = "#meus_veiculos";
					
					});
	})

}