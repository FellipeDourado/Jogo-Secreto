let ListaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
     exibirTextoNaTela ('h1','jogo do número secreto');
    exibirTextoNaTela ('p','escolha um número de 1 a 10');
}

exibirMensagemInicial();

function verificarChute (){
    let chute = document.querySelector ('input'). value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela ('h1', 'Acertou!');
        let palavratentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemtentativas = `Você acertou o número secreto com ${tentativas} ${palavratentativa}!`;
        exibirTextoNaTela ('p', mensagemtentativas);
        document.getElementById('reiniciar').removeAttribute ('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor.');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}
function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt (Math.random () * numeroLimite + 1);
let QuantidadeDeElementosNaLista = ListaDeNumerosSorteados.length;

 if (QuantidadeDeElementosNaLista == numeroLimite) {
    ListaDeNumerosSorteados = [];
 }

   if (ListaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   } else {
    ListaDeNumerosSorteados.push(numeroEscolhido);
    console.log (ListaDeNumerosSorteados);
    return numeroEscolhido;
   }
   }

function limparCampo() {
    chute = document.querySelector ('input');
    chute.value = '';
    
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById ('reiniciar').setAttribute('disabled',true);
}