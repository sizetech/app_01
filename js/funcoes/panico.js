function ativarPanico(){
	if($('#panico_ativo').val() == "sim")
		pararPanico();
	else
		watchID = navigator.geolocation.watchPosition(mostrarTela, fail, { timeout: 10000 });

}

function pararPanico(){
  if(watchID){
                navigator.geolocation.clearWatch(watchID);
                watchID=null;
				var ativo = $('#panico_ativo').val();
					var id_panico = $('#id_panico_ativo').val();
					
					$.post(URLBASE+'panico.php', {acao:'desativar',panico:id_panico}, function(data) {
						var x = 0;									
							$.each( data, function( ) {
								
								if(data.retornar == true){
									
									alert("Panico Desativado");
									var ativo = $('#panico_ativo').val('nao');
									var id_panico = $('#id_panico_ativo').val('');
								}else{
								}
								
							});
				}, 'json');
            }

}

 function mostrarTela(position){
			var ativo = $('#panico_ativo').val();
			var id_panico = $('#id_panico_ativo').val();
			
			$.post(URLBASE+'panico.php', {acao:'ativar',ativo:ativo,panico:id_panico,latitude:position.coords.latitude, longitude:position.coords.longitude , id:idmorador()}, function(data) {
				var x = 0;									
					$.each( data, function( ) {
						
						if(data.retornar == true){
							$('#panico_ativo').val('sim');
							$('#id_panico_ativo').val(data.id);
							alert("Panico ativado, clique novamente para desativar");
						}else{
							alert("Panico não ativado");
						}
						
					});
		}, 'json');
			
        
        }