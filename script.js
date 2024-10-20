function buscarCEP() {
    const cep = document.getElementById('cepInput').value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length !== 8) {
        alert('Por favor, insira um CEP válido com 8 dígitos.');
        return;
    }

    const apiURL = `https://viacep.com.br/ws/${cep}/json/`; // Corrigido, incluindo as crases para interpolação

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado!');
                return;
            }

            // Preenche os campos de endereço com os dados da API
            document.getElementById('logradouro').textContent = data.logradouro || 'N/A';
            document.getElementById('bairro').textContent = data.bairro || 'N/A';
            document.getElementById('localidade').textContent = data.localidade || 'N/A';
            document.getElementById('uf').textContent = data.uf || 'N/A';

            // Exibe o cartão de resultado
            document.getElementById('resultCard').classList.remove('d-none');
             // Exibe a imagem após a consulta bem-sucedida
             const imgElement = document.getElementById('imagemExibida');
             imgElement.style.display = 'block'; // Mostra a imagem
        })
        .catch(error => {
            console.error('Erro ao buscar o CEP:', error);
            alert('Ocorreu um erro ao buscar o CEP.');
        });
}
