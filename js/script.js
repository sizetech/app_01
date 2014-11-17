const URLBASE = "http://serve.iflexdigital.com.br/lomatech/app/";
const URLARQUIVOS = "http://serve.iflexdigital.com.br/lomatech/";



function validarFormularios(id){
		var r = 0;
		$('#'+id+' [obg]').each(function (){
			if(r != 2){
				if(($(this).attr('class') == 'cnpj' || $(this).attr('id') == 'cnpj' ) && $(this).val() == '__.___.___/____-__'){
					$(this).focus();
					alert('Preencha o campo "'+$(this).attr('obg')+'"!');
					r = 2;
				}
				if(($(this).attr('class') == 'cpf' || $(this).attr('id') == 'cpf' ) && $(this).val() == '___.___.___-__'){
					$(this).focus();
					alert('Preencha o campo "'+$(this).attr('obg')+'"!');
					r = 2;
				}
				
				
				if($(this).val() == '' || $(this).attr("obgcomp") == $(this).val()){
					$(this).focus();
					alert('Preencha o campo "'+$(this).attr('obg')+'"!');
					r = 2;
				}
			}
		});
		
	if(r == 2){
		return(false);
	}else{
		return(true);
	}




}



 function capturarImagem(){
	$('#validar_form_dados').val(1);
      navigator.camera.getPicture(uploadPhoto, function(message) {
			$('#validar_form_dados').val(0);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.CAMERA,
			correctOrientation:true,
			AllowEdit: true
		}
            );
            }
 function PegarImagem(){
	$('#validar_form_dados').val(1);
      navigator.camera.getPicture(uploadPhoto, function(message) {
			$('#validar_form_dados').val(0);
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
			correctOrientation:true,
			AllowEdit: true
		}
            );
            }
 function uploadPhoto(imageURI) {
		alert(imageURI);
			$('#htmlImagem').attr('src',imageURI);
			$('#validar_form_dados').val(1);
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
            options.params = params;
            options.chunkedMode = false;
 
            var ft = new FileTransfer();
            ft.upload(imageURI, "http://serve.iflexdigital.com.br/lomatech/app/upload.php", win, fail, options);
        }
 
        function win(r) {
			alert(r.response);
			$("#arquivoMeusDados").val(r.response);
            $('#validar_form_dados').val(0);
        }
 
        function fail(error) {
			$('#htmlImagem').attr('src','');
           $('#validar_form_dados').val(0);
        }
	
function idmorador(){

	//return($.cookie('IDAppLomactech'));
	return window.localStorage.getItem("IDAppLomactech");

}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

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




function meusdados(){

	carregar('ativar');
	$.post(URLBASE+'meus_dados.php', {acao:'retornar', id:idmorador()}, function(data) {
					$.each( data, function( ) {
						$('#id_morador_form_meus_dados').val(idmorador());
						
						$('#nome_meus_dados').val(data.nome);
						$('#nome_form_dados').val(data.nome);
						
						$('#sexo_meus_dados').val(data.sexo);
						$('#sexo_form_dados').val(data.sexo);
						
						$('#data_nascimento_meus_dados').val(data.data_nascimentover);
						$('#data_nascimento_form_dados').val(data.data_nascimento);
						
						$('#email_meus_dados').val(data.email);
						$('#email_form_dados').val(data.email);
						
						$('#rg_meus_dados').val(data.rg);
						$('#rg_form_dados').val(data.rg);
						
						$('#cpf_meus_dados').val(data.cpf);
						$('#cpf_form_dados').val(data.cpf);
						$('#cpf_form_dados').mask("999.999.999-99");
						
						
						$('#telefone_meus_dados').val(data.telefone);
						$('#telefone_form_dados').val(data.telefone);
						var SPMaskBehavior = function (val) {
						  return val.replace(/\D/g, '').length === 11 ? '(00) 000 000 000' : '(00) 000 000 009';
						},
						spOptions = {
						  onKeyPress: function(val, e, field, options) {
							  field.mask(SPMaskBehavior.apply({}, arguments), options);
							}
						};

						$('#telefone_form_dados').mask(SPMaskBehavior, spOptions);

						
						$('#celular_meus_dados').val(data.celular);
						$('#celular_form_dados').val(data.celular);
						$('#celular_form_dados').mask(SPMaskBehavior, spOptions);
						
						$('#classificacao_meus_dados').val(data.tipo);
						$('#classificacao_form_dados').val(data.tipo);
						 var tipo = $("#classificacao_form_dados").val();
						if(tipo == ''){
								var atual =$("#classificacao_form_dados").html();
								 var opt = "<option selected value='"+data.tipo+"'>"+data.tipo+"</option>";
								 atual += opt;
								 $("#classificacao_form_dados").html(atual);
							
						}
						
						
						
						$('#banner_meus_dados').attr('src',data.banner);
						$('#banner_form_dados').attr('src',data.banner);
						
						$('#andar_meus_dados').val(data.andar);						
						
						$('#condominio_meus_dados').val(data.condominio);
						
						$('#torrebloco_meus_dados').val(data.blocotorres);
						
						$('#apartamento_meus_dados').val(data.apartamentosala);
						carregar('desativar');
					})
		}, 'json');

}


function editar_meus_dados(){
	var options = { 
		success:    function(data) { 
		
			$.each( data, function( ) {
					
						meusdados();
											
						if(data.status){
							$('.msgsucesso_meus_dados p').html(data.mensagem);
							$('.msgsucesso_meus_dados').css('display','block');
						}else{
							$('.msgerro_meus_dados p').html(data.mensagem)
							$('.msgerro_meus_dados').css('display','block');
						}
						carregar('desativar');
						window.location = "#meus_dados";
					
					}); 
				
		} 
	}; 
	if($('#validar_form_dados').val() == 0 && validarFormularios('formulario_meus_dados') == true ){
		carregar('ativar');
		$('#formulario_meus_dados').ajaxSubmit(options);
	}else{
		alert('Fazendo Upload da Imagem');
	}
	
	return false;
	
}



function sair(){
 window.localStorage.setItem("IDAppLomactech", false);
window.localStorage.setItem("NomeAppLomactech", false);
window.location = "#login";

}
$(function(){
$("input:password").blur(function(){
		
		var cla = $(this).attr('id');
		if(cla != 'senha_login' && $(this).val() != ''){
		cla = cla+'Erro';
		cla2 = "."+cla;
		$(cla2).html('');
		var tamanho = $(this).val().length;
		if(tamanho < 6){
			$(this).after( "<p class='"+cla+"' style='color:red'>A senha deve ter mais de 6 caracteres</p>" );
			$(this).val('');
			exit;
		}
		
		var tb = VerificarNumeros($(this).val());
		
		
		if(isNaN(VerificarNumeros($(this).val())) || (tb >= 0 && tb == $(this).val()) ){
			$(this).after( "<p class='"+cla+"' style='color:red'>É necessario ter letras e numeros</p>" );
			$(this).val('');
			exit;
		}
		
		$(cla2).html('');
		}
	
	
	});
	$('#cpf_form_dados').blur(function(){
	
				$('#msgCPFMeus').css("color","#2ECC40");
			  $('#msgCPFMeus').html("Verificando CPF");   
			  var sala = $.post( URLBASE+"querys/query_verificar_cpf_morador.php",{cpf:$(this).val(), id:idmorador()}, 
			  function() {        })  
			  .always(function(data) {  

				if(data == 1){
				  $('#msgCPFMeus').css("color","#FF4136");
				  $('#msgCPFMeus').html("CPF (<b>"+$("#cpf_form_dados").val()+"</b>) Já Cadastrado no sistema");
				  $("#cpf_form_dados").val('');          
				}else{
				  $('#msgCPFMeus').html("");
				}
			  });   
	
	});
	$("#classificacao_form_dados").change(function(){     
      if($(this).val() == "Outro"){
         var novo = prompt("Digite um outro tipo de Moradador");
         var atual = $(this).html();
         var opt = "<option selected value='"+novo+"'>"+novo+"</option>";
         atual += opt;
         $(this).html(atual);
      
      }
    });
	
	$("#email_form_dados").blur(function(){  
    
      $('#msgEmailMeus').css("color","#2ECC40");
      $('#msgEmailMeus').html("Verificando Email");   
      var sala = $.post( URLBASE+"querys/query_verificar_email_morador.php",{email:$(this).val(),id:idmorador()}, 
      function() {        })  
      .always(function(data) {  

        if(data == 1){
          $('#msgEmailMeus').css("color","#FF4136");
          $('#msgEmailMeus').html("E-mail (<b>"+$("#email_form_dados").val()+"</b>) Já Cadastrado no sistema");
          $("#email_form_dados").val('');          
        }else{
          $('#msgEmailMeus').html("");
        }
      });   
    }); 
	
	$("#celular_form_dados").blur(function(){  
    
      $('#msgCelularMeus').css("color","#2ECC40");
      $('#msgCelularMeus').html("Verificando CPF");   
      var sala = $.post( URLBASE+"querys/query_verificar_celular_morador.php",{celular:$(this).val(), id:idmorador()}, 
      function() {        })  
      .always(function(data) {  

        if(data == 1){
          $('#msgCelularMeus').css("color","#FF4136");
          $('#msgCelularMeus').html("Celular (<b>"+$("#celular_form_dados").val()+"</b>) Já Cadastrado no sistema");
          $("#celular_form_dados").val('');          
        }else{
          $('#msgCelularMeus').html("");
        }
      });   
    });

	$('input').click(function(){
		$('html,body').animate({scrollTop: $(this).offset().top },'slow');	
	});
	
	$('input').focus(function(){
		$('html,body').animate({scrollTop: $(this).offset().top },'slow');	
	});


	var validar = idmorador();
	$('#nomeMorador').html(window.localStorage.getItem("NomeAppLomactech"));
	if(!validar){
		window.location = "#login";
	}else{
			
			if(isNumber(validar)){
			
				window.location = "#painel";
			}else{
				window.location = "#login";
			}
		
	
	}
	// funções de inicialização
	
		//verificar meus dados
			
		

	

	$('#formulario_login').submit(function(){
	$('.errologin').css("display",'block');
							$('.errologin p').html('Aguarde...');
		$.post(URLBASE+'logar.php', $( this ).serialize(), function(data) {
					$.each( data, function( ) {
						if(data.retorno){
							 window.localStorage.setItem("IDAppLomactech", data.id);
							  window.localStorage.setItem("NomeAppLomactech", data.nome);
							  $('#nomeMorador').html(data.nome);
							//$.cookie('IDAppLomactech', data.id, { expires: 360 });
							$('.errologin').css("display",'none');
							window.location = "#painel";						
						}else{
							$('.errologin').css("display",'block');
							$('.errologin p').html(data.mensagem);
						}
					
					})
		}, 'json');
	
	return false;
	});
	
	
	$('#formulario_esqueci').submit(function(){
		
		$.post(URLBASE+'esqueci_senha.php', $( this ).serialize(), function(data) {
					$.each( data, function( ) {
						if(data.retorno){
							$('.msg_esqueci_senha').css("display",'block');
							$('.msg_error_esquec_senha').css("display",'none');
							$('.msg_esqueci_senha p').html(data.mensagem);
						}else{
							$('.msg_error_esquec_senha').css("display",'block');
							$('.msg_esqueci_senha').css("display",'none');
							$('.msg_error_esquec_senha p').html(data.mensagem);
						}
					
					})
		}, 'json');
	
	return false;
	});
	
	
	
	
	
	
			
			

})
function abrirCoollapsible(a){
	var t = $(a).find( "form" ).css("display");
	if(t == 'none')
		$(a).find( "form" ).css("display","block");
	else
		$(a).find( "form" ).css("display",'none');

}


	
/*--------------------------------------------------DOCUMENTOS------------------------------------------------*/
function documentos(){
	var lista = '';
	carregar('ativar');
	$.post(URLBASE+'documentos_informes.php', {acao:'retornarTodos', id:idmorador()}, function(data) {
				var x = 0;
				var y = 1;
					$.each( data, function( ) {
						
						if(y % 2 == 0){
							var classe="d";
						}else{
							var classe="e";
						}
						
						
						lista += ' <li   onclick="abrirCoollapsible(this);" data-theme="'+classe+'" style="padding-left:5px; margin:5px 20px; min-height:0" data-role="collapsible" data-theme="'+classe+'" data-iconpos="right" data-inset="false">';
						lista +=	'<a href="#"><h2>'+data[x].titulo;
						lista +=	'<img src="img/btn/doc_pequeno.png" align="right" style="margin: 0px 0px;">';
						lista +=	'</h2></a>';
						lista +=	'<form style="display:none" >';
						lista += ' 	<h1 style="color:#FFF; text-shadow: none;text-align:center;font-size:20px;">'+data[x].titulo+'</h1>';
						lista += '	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">PUBLICADO EM :'+data[x].data_cadastro+'</h3><br>';
						lista += ' 	<h3 style="text-shadow: none; color: #FFF;background-color: #85b200;width: 100%;">DOCUMENTO</h3>';
						lista += '  <a href="'+URLARQUIVOS+data[x].doc+'" id="btn-list-detalhe" style="margin: 5px;" class="ui-btn ui-corner-all">Baixar e Exibir</a>';	
						lista += ' </form>';
						lista += ' </li>';
						
					
					
						y++;
						x++;
					});
					$('#listadocumentos').html(lista);
					$('#listadocumentos').listview("refresh");
					carregar('desativar');
		}, 'json');
						

}
// funções de inicialização
	
		//verificar meus dados
			
 function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    // device APIs are available
    //
    function onDeviceReady() {
        // Register the event listener
        document.addEventListener("backbutton", onBackKeyDown, false);
		document.addEventListener("menubutton", onMenuKeyDown, false);
    }

    // Handle the back button
    //
    function onBackKeyDown() {
		carregar('desativar');
		var validar = idmorador();
		if(!validar){
			window.location = "#login";
		}else{
				
				if(isNumber(validar))
					history.back();  
				else
					window.location = "#login";
			
			
		
		}
		
    }
	
	 function onMenuKeyDown() {
		$( "#Painelmenu" ).panel( "open" );
    }
	
	 openFB.init({appId: '770138926373631'});
    //  Uncomment the line below to store the Facebook token in localStorage instead of sessionStorage
    //  openFB.init({appId: 'YOUR_FB_APP_ID', tokenStore: window.localStorage});
    function loginFace() {
        openFB.login(
                function(response) {
                    if(response.status === 'connected') {
						validarEmailFacebook();
						
						
                    } else {
                        alert('Facebook login failed: ' + response.error);
                    }
                }, {scope: 'email,read_stream,publish_stream'});
    }

    
	
	function validarEmailFacebook() {
        openFB.api({
            path: '/me',
            success: function(data) {
                console.log(JSON.stringify(data));
                
				var em = data.email;
					$('.errologin').css("display",'block');
					$('.errologin p').html('Aguarde...');
					$.post(URLBASE+'logarFacebook.php', {email:em}, function(data) {
								$.each( data, function( ) {
									if(data.retorno){
										 window.localStorage.setItem("IDAppLomactech", data.id);
										  window.localStorage.setItem("NomeAppLomactech", data.nome);
										  $('#nomeMorador').html(data.nome);
										  $('.errologin').css("display",'none');
										window.location = "#painel";						
									}else{
										$('.errologin').css("display",'block');
										$('.errologin p').html(data.mensagem);
									}
								
								})
					}, 'json');
	
			
            },
            error:function(data){
				alert('Erro');
			}
			
			});
			
    }
	
