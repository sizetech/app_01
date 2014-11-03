const URLBASE = "http://serve.iflexdigital.com.br/lomatech/app/";
const URLARQUIVOS = "http://serve.iflexdigital.com.br/lomatech/";

function idmorador(){

	alert(1);
	//return($.cookie('IDAppLomactech'));
	return window.localStorage.getItem("IDAppLomactech");
	alert(window.localStorage.getItem("IDAppLomactech"));

}
function bloquear(a){
	/*
	if(a == 'ativar'){
		$(".preca").css("display","block");
		$("html").css("overflow","hidden");
	}else{
		$(".preca").css("display","none");
		$("html").css("overflow","visible");
	}
	
	*/
}

function carregar(a){
	
	if(a == 'ativar'){
		 $('html,body').animate({scrollTop: 0},'slow');	
		$(".preca").css("display","block");
		$("html").css("overflow","hidden");
	}else{
		$(".preca").css("display","none");
		$("html").css("overflow","visible");
	}
	
	
}




function meusdados(){

	bloquear('ativar');
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
						bloquear('desativar');
					})
		}, 'json');

}


function editar_meus_dados(){
	carregar('ativar');
	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						meusdados();
											
						if(data.status){
							$('.msgsucesso_meus_dados p').html(data.mensagem);
							$('.msgsucesso_meus_dados').css('display','block');
						}else{
							$('.msgerro_meus_dados p').html(data.mensagem)
							$('.msgerro_meus_dados').css('display','block');
						}
						carregar('desativar');
						window.location = "#meus_dados";
					
					}); 
		} 
	}; 
	 $('#formulario_meus_dados').ajaxSubmit(options);
	
	
	return false;
	
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
							 window.localStorage.setItem("IDAppLomactech", data.id);
							//$.cookie('IDAppLomactech', data.id, { expires: 360 });
							window.location = "#painel";						
						}else{
						
							$('.errologin').html(data.mensagem);
						}
					
					})
		}, 'json');
	
	return false;
	});
	
	
			
			

})
function abrirCoollapsible(a){
	var t = $(a).find( "form" ).css("display");
	if(t == 'none')
		$(a).find( "form" ).css("display","block");
	else
		$(a).find( "form" ).css("display",'none');

}

function Animal(ID){
$.post(URLBASE+'meu_animais.php', {acao:'retornar', id:ID()}, function(data) {
					$.each( data, function( ) {
						
						
					})
		}, 'json');

}
function meusanimais(){
	var lista = '';
	var resposta = '';
	$.post(URLBASE+'meu_animais.php', {acao:'retornarTodos', id_morador:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						
					
						
						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:0; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<a href="" class="link"><h2>'+data[x].nome_animal;
						lista +=	'<img src="img/icones/icone-bino.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2></a>';
						lista +=	'<form class="l" style="display:none" >';
						lista +=	  '<fieldset data-role="controlgroup" data-type="horizontal">';
						lista +=		'<a href="#form_meus_animais" onClick="chamarAnimal('+data[x].ID+');" id="btn-list-detalhe" class="ui-btn ui-corner-all">Detalhes/Editar</a>';
						lista +=		'<a href="#" onClick="excluirAnimal('+data[x].ID+');" id="btn-list" class="ui-btn ui-corner-all">Excluir</a>	';
						lista +=	 ' </fieldset>';
						lista +=	'</form>';
						lista +=  '</li>';
					
						x++;
					});
					
					
					$('.produtos').html(lista);
					$('.produtos').listview("refresh");
					$( ".miranda" ).collapsibleset( "refresh" );
		}, 'json');

}
// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#meus_animais"){
				meusanimais();
			}
	//fim
	
/*--------------------------------------------------DOCUMENTOS------------------------------------------------*/
function documentos(){
	var lista = '';
	$.post(URLBASE+'documentos_informes.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
				var y = 1;
					$.each( data, function( ) {
						
						if(y % 2 == 0){
							var classe="d";
						}else{
							var classe="e";
						}
						
						
						lista += ' <li  onclick="abrirCoollapsible(this);" data-theme="'+classe+'" style="padding-left:0; min-height:0" data-role="collapsible" data-theme="'+classe+'" data-iconpos="right" data-inset="false">';
						lista +=	'<a href="#" data-theme="'+classe+'" class="link"><h2>'+data[x].titulo;
						lista +=	'<img src="img/btn/doc_pequeno.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2></a>';
						lista +=	'<form style="display:none" >';
						lista += ' 	<h1 style="color:#FFF; text-shadow: none;text-align:center;font-size:20px;">'+data[x].titulo+'</h1>';
						lista += '	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">PUBLICADO EM :'+data[x].data_cadastro+'</h3><br>';
						lista += ' 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DOCUMENTO</h3>';
						lista += '  <a href="'+URLARQUIVOS+data[x].doc+'" id="btn-list-detalhe" style="margin: 5px;" class="ui-btn ui-corner-all">DOWNLOAD</a>';	
						lista += ' </form>';
						lista += ' </li>';
						
					
					
						y++;
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
	
