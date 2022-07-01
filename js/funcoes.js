$(function(){
	
	var operacao = "A"; //"A"=Adição; "E"=Edição
	var indice_selecionado = -1;
	var tbClientes = localStorage.getItem("tbClientes");// Recupera os dados armazenados

	tbClientes = JSON.parse(tbClientes); // Converte string para objeto
	if(tbClientes == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbClientes = [];

	function Adicionar(){
		var cli = GetCliente("Codigo", $("#txtCodigo").val());

		if(cli != null){
			alert("Código já cadastrado.");
			return;
		}//Deixa o input com o Focus
		 

		var cliente = JSON.stringify({
			Codigo 	 	 : $("#txtCodigo").val(),
			Produto   	 : $("#txtNome").val(),
			Medida 	     : $("#txtMedida").val(),
			Estoque 	 : $("#txtEstoque").val(),
			Custo 		 : $("#txtCusto").val(),
			Perecivel 	 : $("#txtPerecivel").val(),
			DtaFab 	     : $("#txtDtaFab").val(),
			DtaVal 	     : $("#txtDtaVal").val()
		});

		tbClientes.push(cliente);

		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));

		alert("Produto Cadastrado com Sucesso!.");
		return true;
	}

	function Editar(){
		tbClientes[indice_selecionado] = JSON.stringify({
			Codigo   	 : $("#txtCodigo").val(),
			Produto   	 : $("#txtNome").val(),
			Medida 	     : $("#txtMedida").val(),
			Estoque 	 : $("#txtEstoque").val(),
			Custo 		 : $("#txtCusto").val(),
			Perecivel 	 : $("#txtPerecivel").val(),
			DtaFab 	     : $("#txtDtaFab").val(),
			DtaVal 	     : $("#txtDtaVal").val()
			});
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Produto ALTERADO com sucesso! Informações editadas.")
		operacao = "A";
		return true;
	}

	function Listar(){
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Codigo </th>"+
			"	<th>Produto </th>"+
			"	<th>Medida </th>"+
			"	<th>Estoque	</th>"+
			"	<th>Custo </th>"+
			"	<th>Perecivel </th>"+
			"	<th>DtaFab </th>"+
			"	<th>DtaVal </th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		 for(var i in tbClientes){
			var cli = JSON.parse(tbClientes[i]);
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><img src='img/edit.png' alt='"+i+"' class='btnEditar'/><img src='img/delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
										 "	<td>"+cli.Codigo+ "		</td>" + 
										 "	<td>"+cli.Produto+ " 	</td>" + 
										 "	<td>"+cli.Medida+ "		</td>" + 
										 "	<td>"+cli.Estoque+ "	</td>" + 
										 "	<td>"+cli.Custo+ "		</td>" + 
										 "	<td>"+cli.Perecivel+ "	</td>" + 
										 "	<td>"+cli.DtaFab+ "	    </td>" + 
										 "	<td>"+cli.DtaVal+ "	    </td>" + 
		  								 "</tr>");
		 }
		 
	}

	function Excluir(){
		tbClientes.splice(indice_selecionado, 1);
		localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
		alert("Registro EXCLUIDO com sucesso!.");
	}

	function GetCliente(propriedade, valor){
		var cli = null;
        for (var item in tbClientes) {
            var i = JSON.parse(tbClientes[item]);
            if (i[propriedade] == valor)
                cli = i;
        }
        return cli;
	}

	Listar();

	$("#frmCadastro").on("submit",function(){
		/* Função Validar */
		var cod = frmCadastro.txtCodigo;
		var pro = frmCadastro.txtNome;
		var letras = /^[a-zA-Z\s]+$/;
		var med = frmCadastro.txtMedida;
		var est = frmCadastro.txtEstoque;
		var numint = /^[0-9]+$/;
		var numdec = /^\d{1,3}(\d{3})*\,\d{3}$/;
		var cus = frmCadastro.txtCusto;
		var custo = /^\d{1,3}(\.\d{3})*\,\d{2}$/;
		var per = frmCadastro.txtPerecivel;
		var dtf = frmCadastro.txtDtaFab;
		var dtv = frmCadastro.txtDtaVal;	


		if(cod.value == "") {
			alert("Digite o Código do Produto.")
			return false;
		}

		if(pro.value == "") {	
			alert("Digite um nome para o Produto.")
			return false;
		} 
		
		if(pro.value.length > 50){
			alert("O produto deverá conter no máximo 50 caracteres")
			return false;
		}

		if(!pro.value.match(letras)){
			alert("O produto deverá conter somente Letras")
			return false;
		}

		if(per.value == ""){
			alert("Informar se o produto é Perecível")
			return false;
		}

		if(med.value == "") {
			alert("Digite a Unidade de Medida Correspondente.")
			return false;
		}

		if(est.value == "") {
			alert("Digite uma Quantidade.")
			return false;
		}
	
		if(med.value == "lt" &&  !est.value.match(numdec)){
			alert("Para unidade de medidas em  Litros (lt) a quantidade deve seguir o exemplo '0,000'")
			return false;
		}

		if(med.value == "kg" &&  !est.value.match(numdec)){
			alert("Para unidade de medidas em  Quilograma (kg) a quantidade deve seguir o exemplo '0,000'")
			return false;
		}

		if(med.value == "un" &&  !est.value.match(numint)){
			alert("Para unidade de medidas em Unidades (un) a quantidade deve ser inteiro como o exemplo '10'")
			return false;
		}

		if(cus.value == ""){
			alert("Informar o custo do Produto com virgula (,). Ex. 0,00")
			return false;
		}

		if(cus.value == ""){
			alert("Informar o custo do Produto")
			return false;
		}
		if(!cus.value.match(custo)){
			alert("Informe o custo do produto conforme valor monetario (BR). Ex. 0.000,00 (Duas casas Decimais)") 
			return false;
		}

		if(dtf.value == ""){
			alert("Informe a Data de Fabricação do Produto")
			return false;
		}

		// if(per == "Sim" && DtaFab.value > 0 ){
		// 	alert("Data de Fabricação maior que Data de Vencimento! Verificar se a data de Fabricação foi informada corretamente.")
		// 	return false;
		// }

		if(dtv.value == ""){
			alert("Informe a Data de Validade do Produto")
			return false;
		}

		// if(difvenc.value < 0 ){
		// 	alert("Produto Vencido! Verificar se a data de valida foi informada corretamente.")
		// 	return false;
		// }

		if(operacao == "A")
			return Adicionar();
		else
			return Editar();
		});


	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbClientes[indice_selecionado]);
		$("#txtCodigo").val(cli.Codigo);
		$("#txtNome").val(cli.Produto);
		$("#txtMedida").val(cli.Medida);
		$("#txtEstoque").val(cli.Estoque);
		$("#txtCusto").val(cli.Custo);
		$("#txtPerecivel").val(cli.Perecivel);
		$("#txtDtaFab").val(cli.DtaFab);
		$("#txtDtaVal").val(cli.DtaVal);
		$("#txtCodigo").attr("readonly","readonly");
		$("#txtNome").focus();
		//window.location.replace("index.html");
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice_selecionado = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});

	// $("#meuModal").on("shown.modal", function () {
	// 	$("#meuInput").trigger("focus")
	//   })
	//   var myModal = new bootstrap.Modal(document.getElementById("myModal"), options)
	 
	//   myModal.addEventListener("shown.modal", function () {
	//   myInput.focus()
	//   })  
});
