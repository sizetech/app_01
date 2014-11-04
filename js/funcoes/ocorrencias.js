


function chamarOcorrencias(){
	var lista = '';
	$.post(URLBASE+'ocorrencias.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var situacao ='';
				var x = 0;
			
					$.each( data, function( ) {
						if ( data[x].status == 'NÃO'){
									var situacao ="Em Aberto";
								}else{
									var situacao ="Resolvido";
								}
				
						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:0; min-height:0; margin:5px 0px;" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<a href="" class="link"><h2>'+data[x].titulo_ocorrencia;
						lista +=	'<img src="img/btn/ocorrencias_pequeno.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2></a>';
						lista +=	'<form style="display:none">';	
						lista +=	'<div class="ui-collapsible-content ui-body-inherit" aria-hidden="false">	';
						lista +=    ' <p style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;"><b>PUBLICADO EM </b>:'+data[x].data_cadastro+'</p><br>';
						lista +=	' <p style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;"><b>DATA DA OCORRENCIA E LOCAL </b></p>';
						lista +=    ' <p style="text-shadow: none; color: #FFF;">Data: '+data[x].data_ocorrencia+' ás 00:00:00</p> '; 
						lista +=	' <p style="text-shadow: none; color: #FFF;">Local:'+data[x].local+'</p>';
						lista +=    ' <p style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DESCRIÇÃO DA OCORRENCIA</p>';
						lista += 	' <p style="text-shadow: none; color: #FFF;">'+data[x].descricao+'</p>';
						lista +=	' <fieldset data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all"><div class="ui-controlgroup-controls ">';		
						lista += 	'   <a href="#" id="btn-list-detalhe" style=" margin: 0px 18px 0px -20px;" class="ui-btn ui-corner-all">'+situacao+'</a>';
						lista += 	' 	<a href="#" onClick="CancelarOcorrencia('+data[x].ID+');" id="btn-list" style="background-color:#820d12;border-color:#820d12; " class="ui-btn ui-corner-all">Cancelar</a>';
						lista +=	'</div></fieldset>';
						lista +=	'</div>';
						lista +=	'</form>';
						lista +=  '</li>';

						x++;
						
					});
					$('#listaocorrencias').html(lista);
					$('#listaocorrencias').listview("refresh");
		}, 'json');
						

};
// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#ocorrencias"){
				chamarOcorrencias();
			}
	//fim 

function CancelarOcorrencia(id){

	$.post(URLBASE+'ocorrencias.php', {id:id, acao:'excluir'}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						chamarOcorrencias();
											
						if(data.status){
							$('.msgsucesso_minhas_ocorrencias p').html(data.mensagem);
							$('.msgsucesso_minhas_ocorrencias').css('display','block');
						}else{
							$('.msgerro_minhas_ocorrencias p').html(data.mensagem)
							$('.msgerro_minhas_ocorrencias').css('display','block');
						}
						window.location = "#ocorrencias";
					})
	})
};
function novaOcorrencia(){
	$('#id_form_ocorrencias').val(idmorador());
	var resposta = '';
	resposta += "<option value=''>-- Selecione um Local --</option>";
	$.post(URLBASE+'querys/ocorrencias.php', {id:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].nome+"</option>";
						x++;
					})
					$("#local_form_ocorrencias").html(resposta);
	})

}


function registrarOcorrencia(){

	bloquear('ativar');
	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						chamarOcorrencias();
											
						if(data.status){
							$('.msgsucesso_minhas_ocorrencias p').html(data.mensagem);
							$('.msgsucesso_minhas_ocorrencias').css('display','block');
						}else{
							$('.msgerro_minhas_ocorrencias p').html(data.mensagem)
							$('.msgerro_minhas_ocorrencias').css('display','block');
						}
						bloquear('desativar');
						window.location = "#ocorrencias";
					
					}); 
		} 
	}; 
	 $('#formulario_ocorrencias').ajaxSubmit(options);
	
	
	return false;
}


	