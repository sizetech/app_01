function listarPortas(){
apagarMSGs();
carregar('ativar');
	var lista = '';
	$.post(URLBASE+'abrir_portao.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
				var y = 1;
				var situacao = '';
					$.each( data, function( ) {
						
						
						lista += ' <li onclick="abrirPortao('+data[x].ID+');" style="padding-left:5px; min-height:0; margin:5px 20px;" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	' <a href="#">'+data[x].nome;
						lista +=  '</a></li>';

					
					
						y++;
						x++;
					});
					$('#listaportao').html(lista);
					$('#listaportao').listview("refresh");
					carregar('desativar');
		}, 'json');
						

}

function abrirPortao(id){
	apagarMSGs();
carregar('ativar');
	var lista = '';
	$.post(URLBASE+'abrir_portao.php', {acao:'acionar', id:idmorador(), id_portao:id}, function(data) {

				var situacao = '';
					$.each( data, function( ) {
						
						
						if(data.status){
							$('.msgsucesso_portao p').html(data.mensagem);
							$('.msgsucesso_portao').css('display','block');
						}else{
							$('.msgerro_portao p').html(data.mensagem)
							$('.msgerro_portao').css('display','block');
						}
						
					
					
						
					});
					carregar('desativar');
		}, 'json');
}

	