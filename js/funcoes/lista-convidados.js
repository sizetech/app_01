function chamarListaConvidados(){
	var lista = '';
	$.post(URLBASE+'lista_convidados.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:0; min-height:0; margin:0px 10px;" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista += '		<a href="" class="link"><h2> '+data[x].nome+' <img src="img/btn/lista_convidados_pequena.png" align="right" style="margin: 0px 0px;"> ';
						lista += ' </h2> </a>';
						lista += '  <form style="display:none">';
						lista +=	'<div class="ui-collapsible-content ui-body-inherit" aria-hidden="false">	';								
						lista += ' 	<h3 style="color:#FFF; text-shadow: none;text-align:center;font-size:20px;">'+data[x].nome+'</h3>';
						lista += ' 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">PUBLICADO EM :31/10/2014</h3><br>';
						lista += ' 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DATA DA VISITA E LOCAL</h3>';
						lista += ' 	<h3 style="text-shadow: none; color: #FFF;">Data e hora de Inicio:'+data[x].data_entrada+' ás '+data[x].hora_entrada+'</h3>';
						lista += '	<h3 style="text-shadow: none; color: #FFF;">Data e hora de Terminio:'+data[x].data_saida+' ás '+data[x].hora_saida+'</h3>';
						lista += '	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">LISTA DE CONVIDADOS</h3>	';
						lista += ' 	<h3 style="text-shadow: none; color: #FFF;">Convidados</h3>	';
						lista += ' <input type="text" disabled name="nome" id="nome" value="" placeholder="">	';
						lista += ' <h3 style="text-shadow: none; color: #FFF;">Telefone</h3>';
						lista += ' <input type="text" disabled style="margin-bottom:10px;" class="telefone" name="telefone" id="telefone" value=""> ';
						lista +=	' <fieldset data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all"><div class="ui-controlgroup-controls ">';
						lista += 	'   <a href="#" id="btn-list-detalhe" style=" margin: 0px 18px 0px -20px;" class="ui-btn ui-corner-all">EM ANDAMENTO</a>';
						lista += 	' 	<a href="#" onClick="CancelarLista('+data[x].ID+');" id="btn-list" style="background-color:#820d12;border-color:#820d12; " class="ui-btn ui-corner-all">CANCELAR</a>';
						lista += ' </div></fieldset> ';		
						lista += ' </form>';
						lista +=  '</li>';
						
						x++;
					});
					$('#listarconvidados').html(lista);
					$('#listarconvidados').listview("refresh");
		}, 'json');
						

}
// funções de inicialização
	
		//verificar meus dados
			
			if(ancora == "#lista_convidados"){
				chamarListaConvidados();
			}
	//fim
function CancelarLista(id){

	$.post(URLBASE+'lista_convidados.php', {id:id, acao:'excluir'}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						chamarListaConvidados();
											
						if(data.status){
							$('.msgsucesso_meus_convidados p').html(data.mensagem);
							$('.msgsucesso_meus_convidados').css('display','block');
						}else{
							$('.msgerro_meus_convidados p').html(data.mensagem)
							$('.msgerro_meus_convidados').css('display','block');
						}
						window.location = "#lista_convidados";
					})
	})
};
function novaOcorrencia(){
	$('#id_form_lista_convidados').val(idmorador());
	var resposta = '';
	resposta += "<option value=''>-- Selecione um Local --</option>";
	$.post(URLBASE+'querys/lista_convidados_pessoas.php', {id:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].nome+"</option>";
						x++;
					})
					$("#nome_form_lista_convidados").html(resposta);
	})

}


function registrarListaConvidados(){

	bloquear('ativar');
	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						chamarListaConvidados();
											
						if(data.status){
							$('.msgsucesso_meus_convidados p').html(data.mensagem);
							$('.msgsucesso_meus_convidados').css('display','block');
						}else{
							$('.msgerro_meus_convidados p').html(data.mensagem)
							$('.msgerro_meus_convidados').css('display','block');
						}
						bloquear('desativar');
						window.location = "#lista_convidados";
					
					}); 
		} 
	}; 
	 $('#formulario_lista_convidados').ajaxSubmit(options);
	
	
	return false;
}
	
	