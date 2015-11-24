<?php
	
	error_reporting(0);
	
	$search = $_GET['search'];

	$client = new SoapClient("https://pagos.tijuana.gob.mx/WebServiceMultas/Multas.asmx?WSDL");

	$res = $client->consultarMulta(array(
		"placa" => (string)$search, 
		"Licencia" => "",
		"paterno" => "", 
		"materno" => "", 
		"nombres" => ""
	));	

	$tmp = (array)$res;

	if(empty($tmp) == true) {
		$res = null;
		$res = $client->consultarMulta(array(
			"placa" => "", 
			"Licencia" => (string)$search,
			"paterno" => "", 
			"materno" => "", 
			"nombres" => ""
		));	
	}

	echo $res->{'consultarMultaResult'}->any;

?>