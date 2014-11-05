$(function(){

	$("#marca_form_meus_veiculos").change(function(){			 
			$('#modelo_form_meus_veiculos').html("<option> -- Carregando --</option>");		
			var sala = $.post( URLBASE+"querys/modelo-veiculos.php",{marca:$(this).val()}, function() {		
			})			 
			.always(function(data) {				
				$('#modelo_form_meus_veiculos').html(data);			
			});		
		});	

});

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
function meusveiculos(){
	var lista = '';
	$.post(URLBASE+'meus_veiculos.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
			
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
						lista += 	'   <a href="#form_meus_veiculos" onClick="editar_meus_veiculos('+data[x].ID+');" id="btn-list-detalhe" style=" margin: 0px 18px 0px -20px;" class="ui-btn ui-corner-all">EDITAR CADASTRO</a>';
						lista += 	' 	<a href="#"onClick="excluirVeiculo('+data[x].ID+');" id="btn-list" style="background-color:#820d12;border-color:#820d12; " class="ui-btn ui-corner-all">EXCLUIR</a>';
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

function chamarVeiculo(ID){
	
					carregar('ativar');
						$("#marca_form_meus_veiculos").val('');
						$("#modelo_form_meus_veiculos").val('');
						$("#placa_form_meus_veiculos").val('');
						$("#cor_form_meus_veiculos").val('');
						$("#id_form_meus_veiculos").val('');
						$("#acao_form_meus_veiculos").val('');
						$("#banner_veiculo_editar").attr("src",'');
	
	
		var resposta = '';
	$.post(URLBASE+'querys/marca-veiculos.php', {}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].marca+"</option>";
						x++;
					})
					$("#marca_form_meus_veiculos").html(resposta);
	})
	
	$.post(URLBASE+'meus_veiculos.php', {acao:'retornar', id:ID}, function(data) {

					var x = 0;
					$.each( data, function( ) {
					if(x == 0){
						$("#marca_form_meus_veiculos").val(data.marca);
						$("#modelo_form_meus_veiculos").val(data.modelo);
						$("#placa_form_meus_veiculos").val(data.placa);
						$("#cor_form_meus_veiculos").val(data.cor);
						$("#id_form_meus_veiculos").val(data.ID);
						$("#acao_form_meus_veiculos").val('editar');
						$('select#,modelo_form_meus_veiculos option').val(data.tipo).attr("selected","selected");
						$("#banner_veiculo_editar").attr("src",data.banner);
						var marca = data.marca;
						var modelo  = data.modelo;
						

								var sala = $.post( URLBASE+'querys/modelo-veiculos.php',{id:modelo,id:modelo}, function() {		
								})			 
								.always(function(data) {	
									$('#modelo_form_meus_veiculos').html(data);			
								});
								
								
						}
						x++;
						carregar('desativar');
					})
					$("#marca_form_meus_veiculos").html(resposta);
	})
	
	}
		function editar_meus_veiculos(){
		
	carregar('ativar');
	var options = { 
		success:function(data) { 
					$.each( data, function( ) {
					meusveiculos();					
						if(data.status){
							$('.msgsucesso_meus_veiculos p').html(data.mensagem);
							$('.msgsucesso_meus_veiculos').css('display','block');
						}else{
							$('.msgerro_meus_veiculos p').html(data.mensagem)
							$('.msgerro_meus_veiculos').css('display','block');
						}
						carregar('desativar');
						window.location = "#meus_veiculos";
					
					});
		}
	};
	 $('#formulario_meus_veiculos').ajaxSubmit(options);
	
	
	return false;
	

}
function novoVeiculo(){
	$('#id_form_meus_veiculos').val(idmorador());
	$('#acao_form_meus_veiculos').val('novo');
	var resposta = '';
	resposta += "<option value=''>-- Selecione a Marca --</option>";
	
	$.post(URLBASE+'querys/marca-veiculos.php', {}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].marca+"</option>";
						
						x++;
					})
					$("#marca_form_meus_veiculos").html(resposta);
	})
	

}
	function excluirVeiculo(ID){
	carregar('ativar');
	$.post(URLBASE+'meus_veiculos.php', {id:ID, acao:'excluir'}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						meusveiculos();
											
					if(data.status){
							$('.msgsucesso_meus_veiculos p').html(data.mensagem);
							$('.msgsucesso_meus_veiculos').css('display','block');
						}else{
							$('.msgerro_meus_veiculos  p').html(data.mensagem)
							$('.msgerro_meus_veiculos ').css('display','block');
						}
						carregar('desatuvar');
						window.location = "#meus_veiculos";
					})
	})

}
			
	
	



function registrarVeiculos(){

	bloquear('ativar');
	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						meusveiculos();
											
						if(data.status){
							$('.msgsucesso_meus_veiculos p').html(data.mensagem);
							$('.msgsucesso_meus_veiculos').css('display','block');
						}else{
							$('.msgerro_meus_veiculos  p').html(data.mensagem)
							$('.msgerro_meus_veiculos ').css('display','block');
						}
						bloquear('desativar');
						window.location = "#meus_veiculos";
					
					}); 
		} 
	}; 
	 $('#formulario_meus_veiculos').ajaxSubmit(options);
	
	
	return false;
}

