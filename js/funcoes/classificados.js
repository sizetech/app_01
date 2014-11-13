


function classificados(){
carregar('ativar');
	var lista = '';
	$.post(URLBASE+'classificados.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;									
					$.each( data, function( ) {
						
						lista += '	 <li onclick="abrirCoollapsible(this);" style="padding-left:5px;margin:5px 20px; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista += '		<a href="#"><h2 style="color: #FFF;text-shadow: none;">'+data[x].produto+'<img src="img/btn/classificados.png" align="right" style="margin: 0px 0px;"></h2></a>';
						lista +=	'<form style="display:none" >';
						lista += '	 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">PUBLICADO EM :'+data[x].data+'</h3><br>';
						lista += '	 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">VENDEDOR :'+data[x].vendedor+' - '+data[x].quem_vende+' </h3><br>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">VALOR: R$'+data[x].preco+'</h3><br>';
						lista += '		<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DESCRIÇÃO</h3> <br>'+data[x].descricao;
						
						lista += ' </form>';
						lista += '	</li>';
						x++;
						
					});
					$('#listaeventos').html(lista);
					$('#listaeventos').listview("refresh");
					carregar('desativar');
		}, 'json');
						

}
