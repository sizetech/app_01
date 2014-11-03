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
function excluirAnimal(ID){
	carregar('ativar');
	$.post(URLBASE+'meu_animais.php', {id:ID, acao:'excluir'}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						
						meusanimais();
											
						if(data.status){
							$('.msgsucesso_meus_animais p').html(data.mensagem);
							$('.msgsucesso_meus_animais').css('display','block');
						}else{
							$('.msgerro_meus_animais p').html(data.mensagem)
							$('.msgerro_meus_animais').css('display','block');
						}
						carregar('desatuvar');
						window.location = "#meus_animais";
					})
	})

}
$(function(){

	$("#tipo_form_animal").change(function(){			 
			$('#raca_form_animal').html("<option> -- Carregando --</option>");		
			var sala = $.post( URLBASE+"querys/query_select_raca.php",{animal:$(this).val()}, function() {		
			})			 
			.always(function(data) {				
				$('#raca_form_animal').html(data);			
			});		
		});	

});

function chamarAnimal(ID){
	
					carregar('ativar');
						$("#nome_animal_form_animal").val('');
						$("#cor_form_animal").val('');
						$("#tipo_form_animal").val('');
						$("#id_animal_form_animal").val('');
						$("#acao_animal_form_animal").val('');
						$("#foto_animal_editar").attr("src",'');
	
	
		var resposta = '';
	$.post(URLBASE+'querys/animais.php', {}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].animal+"</option>";
						x++;
					})
					$("#tipo_form_animal").html(resposta);
	})
	
	$.post(URLBASE+'meu_animais.php', {acao:'retornar', id:ID}, function(data) {
					var x = 0;
					$.each( data, function( ) {
					if(x == 0){
						$("#nome_animal_form_animal").val(data.nome_animal);
						$("#cor_form_animal").val(data.cor);
						$("#tipo_form_animal").val(data.tipo);
						$("#id_animal_form_animal").val(data.ID);
						$("#acao_animal_form_animal").val('editar');
						$('select#tipo_form_animal option').val(data.tipo).attr("selected","selected");
						$("#foto_animal_editar").attr("src",data.foto);
						var animal = data.tipo;
						var raca  = data.raca;
						

								var sala = $.post( URLBASE+'querys/animais_raca.php',{id_animal:animal,id:raca}, function() {		
								})			 
								.always(function(data) {	
									$('#raca_form_animal').html(data);			
								});
								
								
						}
						x++;
						carregar('desativar');
					})
					$("#tipo_form_animal").html(resposta);
	})
	
	
	
			
	
	

}


function editar_animal(){
	carregar('ativar');
	var options = { 
		success:    function(data) { 
			$.each( data, function( ) {
					
						meusanimais();
											
						if(data.status){
							$('.msgsucesso_meus_animais p').html(data.mensagem);
							$('.msgsucesso_meus_animais').css('display','block');
						}else{
							$('.msgerro_meus_animais p').html(data.mensagem)
							$('.msgerro_meus_animais').css('display','block');
						}
						carregar('desativar');
						window.location = "#meus_animais";
					
					}); 
		} 
	}; 
	 $('#formulario_meus_animais').ajaxSubmit(options);
	
	
	return false;
	
}
function novoAnimal(){
carregar('ativar');
	$("#nome_animal_form_animal").val('');
						$("#cor_form_animal").val('');
						$("#tipo_form_animal").val('');
						$("#id_animal_form_animal").val('');
						$("#acao_animal_form_animal").val('');
						$("#foto_animal_editar").attr("src",'');
	var resposta = '';
	$.post(URLBASE+'querys/animais.php', {}, function(data) {
				var x = 0;
					$.each( data, function( ) {
						resposta += "<option value='"+data[x].ID+"'>"+data[x].animal+"</option>";
						x++;
					})
					$("#tipo_form_animal").html(resposta);
	})
	$("#acao_animal_form_animal").val('novo');
	$("#id_animal_form_animal").val(idmorador());
	carregar('desativar');
}