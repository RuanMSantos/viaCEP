const limparCampos = () => {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
    document.getElementById('ibge').value = "";
};

const meucallback = (conteudo) => { // o parametro indicado já é preenchido automaticamente pelo resultado da busca
    if (!('erro' in conteudo)){ // se ele não encontrar erro no resultado da busca
        document.getElementById('rua').value = conteudo.logradouro;
        document.getElementById('bairro').value = conteudo.bairro;
        document.getElementById('cidade').value = conteudo.localidade;
        document.getElementById('estado').value = conteudo.uf;
        document.getElementById('ibge').value = conteudo.ibge;
    }

    else {
        limparCampos();
        alert('CEP não encontrado!');
    }
};

const pesquisarCep = (valor) => {
    // Permite a digitação de apenas números
    var cep = valor.replace(/\D/g, ''); // \D permite apenas digitos e g fala que não precisa de uma validação sobre esses digitos

    if (cep != ""){
        // Expressão regular para aceitar apenas números de 0 a 9, com limite de tamanho 8
        var validacep = /^[0-9]{8}$/; // ^ é um caracter de permissão, [] o que está entre colchetes é o que vai ser permitido, {} as chaves são o tamanho,
        // e o $ significa o final da permissão

        // Verificação se é um cep dentro das regras permitidas
        if (validacep.test(cep)){
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('estado').value = "...";
            document.getElementById('ibge').value = "...";
        
            // Cria um elemento JavaScript
            var script = document.createElement("script"); // cria um elemento script

            // Associa a function meucallback
            script.src = "https://viacep.com.br/ws/" + cep + "/json/?callback=meucallback"; // end point do site. O callback não é obrigatório, mas ajuda
            // o callback envia o resultado para a função que estiver depois do sinal de igual

            // Insere o script no documento e carrega o conteúdo nos inputs
            document.body.appendChild(script); // adiciona o elemento no final
        }

        else {
            limparCampos();
            alert('Formato de CEP inválido');
        }
    }

    else {
        limparCampos();
        alert('Campo vazio!');
    }
};