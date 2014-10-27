const URLBASE = "http://serve.iflexdigital.com.br/lomatech/app/";

function idmorador(){
	return($.cookie('IDAppLomactech'));

}

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

function meusanimais(){
	var lista = '';
	$.post(URLBASE+'meu_animais.php', {acao:'retornarTodos', id_morador:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						lista += ' <li style="padding-left:0; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<h2>'+data[x].nome_animal;
						lista +=	'<img src="img/icones/icone-bino.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2>';
						lista +=	'<form >';
						lista +=	  '<fieldset data-role="controlgroup" data-type="horizontal">';
						lista +=		'<a href="#form_meus_animais" onClick="editarAnimal('+data[x].ID+');" id="btn-list-detalhe" class="ui-btn ui-corner-all">Detalhes/Editar</a>';
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
