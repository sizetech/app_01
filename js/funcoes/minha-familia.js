function chamarFamilia() {
	var lista = '';
	var resposta = '';
	$.post(URLBASE+'minha_familia.php', {acao:'retornarTodos', id_morador:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
					
						
						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:0; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<a href="" class="link"><h2>'+data[x].nome;
						lista +=	'<img src="img/btn/reservas.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2></a>';
						lista +=	'<form style="display:none">';	
						lista +=	' <fieldset data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all"><div class="ui-controlgroup-controls ">';
						lista +=	'<a href="#form_familia" onClick="novaFamilia();" id="btn-list-detalhe" class="ui-btn ui-corner-all">Detalhes/Editar</a>';
						lista +=	'<a href="#" onClick="CancelarReserva('+data[x].ID+');" id="btn-list" class="ui-btn ui-corner-all ui-last-child" >Excluir</a>	';
						lista +=	'</div></fieldset>';
						lista +=	'</div>';
						lista +=  '</li>';
					
						x++;
					});
					
					
					$('#listafamilia').html(lista);
					$('#listafamilia').listview("refresh");
					
		}, 'json');


}

function novaFamilia(){
	$("#minha_familia").val('');
	$("#sexo_form_familia").val('');
	$("#data_nascimento_form_familia").val('');
	$("#email_form_familia").val('');
	$("#rg_form_familia").val('');
	$("#cpf_form_familia").val('');
	$("#telefone_form_familia").val('');
	$("#celular_form_familia").val('');
	$("#classificacao_form_familia").val('');
	$("#senha_form_familia").val('');
	$("#acao_form_familia").val('novo');
	$("#id_familia").val(idmorador());
	        
}

function registrarFamilia(){
carregar('ativar');
	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						chamarFamilia();
											
						if(data.status){
							$('.msgsucesso_familia p').html(data.mensagem);
							$('.msgsucesso_familia').css('display','block');
						}else{
							$('.msgerro_familia p').html(data.mensagem)
							$('.msgerro_familia').css('display','block');
						}
						carregar('desativar');
						window.location = "#minha_familia";
					
					}); 
		} 
	}; 
	 $('#formulario_meus_animais').ajaxSubmit(options);
	
	
	return false;

}