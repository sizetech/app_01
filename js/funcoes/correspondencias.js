function chamarCorrespondencia(){
carregar('ativar');
	var lista = '';
	$.post(URLBASE+'correspondencias.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
				var y = 1;
				var situacao = '';
					$.each( data, function( ) {
						
						if(y % 2 == 0){
							var classe="d";
						}else{
							var classe="e";
						}
						
								 if(data[x].status == 'Na Portaria'){
								situacao =  "A RETIRAR";
								}
								else{
								situacao =  "PEGOU";
								}
								

						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:5px; min-height:0; margin:5px 20px;" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	' <a href="#"><h2> CHEGOU EM: '+data[x].data_cadastro;
						lista +=	' <img src="img/btn/correspondencia.png" align="right" style="margin: 0px 0px;">';
						lista +=	' </h2></a>';
						lista +=	' <form style="display:none">';	
						lista +=	' <div class="ui-collapsible-content ui-body-inherit" aria-hidden="false">	';
						lista +=    ' <h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">FOTO DA CORRESPONDENCIA</h3>';
						lista += 	' <center><img src="'+URLARQUIVOS+data[x].foto+'"></center>';
						lista +=	' <fieldset data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all"><div class="ui-controlgroup-controls ">';		
						lista += 	'   <a href="#" id="btn-list-detalhe" style=" margin: 0px 18px 0px -20px;" class="ui-btn ui-corner-all">'+situacao+'</a>';
						lista +=	'</div></fieldset>';
						lista +=	'</div>';
						lista +=	'</form>';
						lista +=  '</li>';

					
					
						y++;
						x++;
					});
					$('#listacorrespondencias').html(lista);
					$('#listacorrespondencias').listview("refresh");
					carregar('desativar');
		}, 'json');
						

}

	