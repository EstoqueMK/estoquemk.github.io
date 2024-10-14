// Função para salvar dados no Local Storage
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Função para recuperar dados do Local Storage
function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Função para atualizar o estoque
function updateEstoque(produto, quantidade) {
    let estoque = getFromLocalStorage('estoque') || {};
    estoque[produto] = (estoque[produto] || 0) + quantidade;
    saveToLocalStorage('estoque', estoque);
    updateUI();
}

// Função para atualizar a interface do usuário
function updateUI() {
    const estoque = getFromLocalStorage('estoque') || {};
    // Aqui você atualizaria os elementos da UI com os dados do estoque
    // Por exemplo:
    const estoqueGrid = document.querySelector('.dashboard-grid');
    if (estoqueGrid) {
        estoqueGrid.innerHTML = '';
        for (const [produto, quantidade] of Object.entries(estoque)) {
            estoqueGrid.innerHTML += `<div>${produto}: ${quantidade}</div>`;
        }
    }
}

// Função para adicionar um novo item
function adicionarItem(event) {
    event.preventDefault();
    const form = event.target;
    const produto = form.querySelector('[name="produto"]').value;
    const quantidade = parseInt(form.querySelector('[name="quantidade"]').value);
    updateEstoque(produto, quantidade);
}

// Event listener para o formulário de adição de itens
document.querySelector('#addItemForm').addEventListener('submit', adicionarItem);

// Carregar dados do Local Storage ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});
