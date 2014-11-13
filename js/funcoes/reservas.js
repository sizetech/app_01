
$(function(){

	$("#hora_inicio_form_reservas").keypress(function() {
			var valor = $(this).val();
			if($(this).val() != '' && valor.length == 5){
					$('#hora_fim_form_reservas').html("<option value=''> -- Carregando -- </option>");			
					var sala = $.post(URLBASE+"querys/query_verificar_hora.php", {
						data: $("#data_form_reservas").val(),   dependencia: $("#dependencia_form_reservas").val(), hora:$(this).val()
					}, function() {}).always(function(data) {
						if(data == 1){
								var sala2 = $.post(URLBASE+"querys/query_criar_hora.php", {
									data: $("#data_form_reservas").val(),   dependencia: $("#dependencia_form_reservas").val(), hora:$('#hora_inicio_form_reservas').val()
								}, function() {}).always(function(data) {
									$('#hora_fim_form_reservas').html(data);
									
								});
						
						}else{
							alert('Este Horário não esta disponível');
							$("#hora_inicio_form_reservas").val('');	
							$('#hora_fim_form_reservas').html("<option value=''> -- Coloque uma hora inicial -- </option>");							
						}
						
							
					});
		
			}
    });

     $("#hora_inicio_form_reservas").blur(function() {
			if($(this).val() != ''){
					$('#hora_fim_form_reservas').html("<option value=''> -- Carregando -- </option>");			
					var sala = $.post(URLBASE+"querys/query_verificar_hora.php", {
						data: $("#data_form_reservas").val(),   dependencia: $("#dependencia_form_reservas").val(), hora:$(this).val()
					}, function() {}).always(function(data) {
						if(data == 1){
								var sala2 = $.post(URLBASE+"querys/query_criar_hora.php", {
									data: $("#data_form_reservas").val(),   dependencia: $("#dependencia_form_reservas").val(), hora:$('#hora_inicio_form_reservas').val()
								}, function() {}).always(function(data) {
									$('#hora_fim_form_reservas').html(data);
									
								});
						
						}else{
							alert('Este Horário não esta disponível');
							$("#hora_inicio_form_reservas").val('');	
							$('#hora_fim_form_reservas').html("<option value=''> -- Coloque uma hora inicial -- </option>");							
						}
						
							
					});
		
			}
    });

})


function minhasreservas(){
carregar('ativar');
	var lista = '';
	var resposta = '';
	$.post(URLBASE+'reservas.php', {acao:'retornarTodos', id_morador:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
					
						
						lista += ' <li onclick="abrirCoollapsible(this);" style="padding-left:5px; margin:5px 20px; min-height:0" data-role="collapsible" data-theme="d" data-iconpos="right" data-inset="false">';
						lista +=	'<a href="" class="link"><h2>'+data[x].dependencia+' - '+data[x].dia_semana;
						lista +=	'<img src="img/btn/reservas.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2></a>';
						lista +=	'<form style="display:none">';	
						lista +=	'<div class="ui-collapsible-content ui-body-inherit" aria-hidden="false">	';
						lista +=	' <h3 style="color:#fff;font-size: 15px;text-shadow: none;"><b>Dia:</b> '+data[x].dependencia+' </h3>';
						lista +=	' <h3 style="color:#fff;font-size: 15px;text-shadow: none;"><b>Horário:</b> '+data[x].horario_inicio+' às '+data[x].horario_fim+' </h3>';
						lista +=	' <h3 style="color:#fff;font-size: 15px;text-shadow: none;"><b>Local:</b> '+data[x].dependencia+' </h3>';
						lista +=	' <fieldset data-role="controlgroup" data-type="horizontal" class="ui-controlgroup ui-controlgroup-horizontal ui-corner-all"><div class="ui-controlgroup-controls ">';
						lista +=	'<a href="#" onClick="CancelarReserva('+data[x].ID+');" style="background-color:#820d12;border-color:#820d12;"  id="btn-list" class="ui-btn ui-corner-all ui-last-child" >Cancelar</a>	';
						lista +=	'</div></fieldset>';
						lista +=	'</div>';
						lista += 	'</form>';
						lista +=  '</li>';
					
						x++;
					});
					
					
					$('#listareservas').html(lista);
					$('#listareservas').listview("refresh");
					carregar('desativar');
					
		}, 'json');


}

function CancelarReserva(id){
var ex = confirm("Deseja Cancelar?");
if(ex == true){
	$.post(URLBASE+'reservas.php', {id:id, acao:'excluir'}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						minhasreservas();
											
						if(data.status){
							$('.msgsucesso_meus_reservas p').html(data.mensagem);
							$('.msgsucesso_meus_reservas').css('display','block');
						}else{
							$('.msgerro_meus_reservas p').html(data.mensagem)
							$('.msgerro_meus_reservas').css('display','block');
						}
						window.location = "#reservas";
					})
	});
}

}

function novaReserva(){
	$('#id_form_reserva').val(idmorador());
	var resposta = '';
	resposta += "<option value=''>-- Selecione uma Depêndencia --</option>";
	$.post(URLBASE+'querys/dependencia.php', {id:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].nome+"</option>";
						x++;
					})
					$("#dependencia_form_reservas").html(resposta);
	})

}

function registrarReserva(){


	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						minhasreservas();
											
						if(data.status){
							$('.msgsucesso_meus_reservas p').html(data.mensagem);
							$('.msgsucesso_meus_reservas').css('display','block');
						}else{
							$('.msgerro_meus_reservas p').html(data.mensagem)
							$('.msgerro_meus_reservas').css('display','block');
						}
						carregar('desativar');
						window.location = "#reservas";
					
					}); 
		} 
	}; 
	if(validarFormularios('formulario_reservas') == true){
		carregar('ativar');
	 $('#formulario_reservas').ajaxSubmit(options);
	}
	
	
	return false;
}