function meusveiculos(){
	var lista = '';
	$.post(URLBASE+'meus_veiculos.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						/*lista += ' <li style="padding-left:0; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
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
						*/
						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:0; min-height:0; margin:0px 10px;" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<a href="" class="link"><h2>'+data[x].marca;
						lista +=	'<img src="img/btn/ocorrencias_pequeno.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2></a>';
						lista +=	'<form style="display:none">';	
						lista +=	'<div class="ui-collapsible-content ui-body-inherit" aria-hidden="false">	';
						lista +=  	' <center><img src="'+data[x].banner+'"></center>';
						lista +=    ' <h3 style="text-shadow: none; color: #FFF;">MARCA:'+data[x].marca+'</h3>';
						lista +=	' <h3 style="text-shadow: none; color: #FFF;">MODELO:'+data[x].modelo+'</h3>';
						lista +=    ' <h3 style="text-shadow: none; color: #FFF;">PLACA: '+data[x].placa+'</h3> '; 
						lista +=	' <h3 style="text-shadow: none; color: #FFF;">COR:'+data[x].cor+'</h3>';					
						lista += 	' <h3 style="text-shadow: none; color: #FFF;">DATA CADASTRO:'+data[x].data_cadastro+'</h3>';
						lista +=	' <fieldset data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all"><div class="ui-controlgroup-controls ">';		
						lista += 	'   <a href="#" onClick="editar_meus_veiculos('+data[x].ID+');" id="btn-list-detalhe" style=" margin: 0px 18px 0px -20px;" class="ui-btn ui-corner-all">EDITAR CADASTRO</a>';
						lista += 	' 	<a href="#" onClick="CancelarVeiculo('+data[x].ID+');" id="btn-list" style="background-color:#820d12;border-color:#820d12; " class="ui-btn ui-corner-all">EXCLUIR</a>';
						lista +=	'</div></fieldset>';
						lista +=	'</div>';
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

function novoVeiculo(){
	$('#id_form_veiculos').val(idmorador());
	var resposta = '';
	resposta += "<option value=''>-- Selecione a Marca --</option>";
	$.post(URLBASE+'querys/meus-veiculos.php', {id:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].marca+"</option>";
						x++;
					})
					$("#local_form_veiculos").html(resposta);
	})

}

