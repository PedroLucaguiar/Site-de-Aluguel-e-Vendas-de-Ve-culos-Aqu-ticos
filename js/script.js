// ---------------------------- Script Botão menu superior ----------------------------

const btnmenu = document.getElementById('clicavel')
const options = document.getElementById('options')

function show(){
    options.classList.toggle('ativo')
    options.classList.toggle('options')
}

btnmenu.addEventListener('click', show)

 // ---------------------------- Abre e fecha o carrinho ----------------------------
let carrinhocomitem = document.querySelector('.blockcarrinho')
let fecharcarrinho = document.querySelector('.fecharopcoes1')
let abrircarrinho = document.querySelector('.nmrcarrinho')
let corpo = document.querySelector('body')


fecharcarrinho.addEventListener('click', esconder)
abrircarrinho.addEventListener('click', aparecer)

function esconder(){
    carrinhocomitem.style.display = 'none';
    corpo.style.overflow = 'auto';
}

function aparecer(){
    carrinhocomitem.style.display = 'flex';
    corpo.style.overflow = 'hidden';
    atualizar()
    selecionabotãodeletar()
}

// ------------------ Atualiza o carrinho ------------------

var cartitens = []


function atualizar(){

    let carrinhohtml = document.querySelector('.blockcarrinhoprodutos')
    let valortotal = document.querySelector('.valortotalexibir')
    let titulo = document.getElementById('title').textContent
    let somavalor = 0
    let srcimagem = ''
    
    if( cartitens.length === 0){
        itenslocalstorage = localStorage.getItem('carrinhoitens')
        itenslocalstorage = JSON.parse(itenslocalstorage)
        for(i in itenslocalstorage){
            cartitens.push(itenslocalstorage[i])
        }
    }
    carrinhohtml.innerHTML = ''
    
    // Src dinamico para home
    if(titulo == 'AquaMarine - Home' ){
        srcimagem = `<img src="./img/Carrinho/${cartitens[i].tag}.png"></img>`
    }
    
    // Src dinamico para Catamarã, Jet, Iates e Categorias

    if(titulo == 'AquaMarine - Catamarã' || titulo == 'AquaMarine - Jet Ski' 
    || titulo == 'AquaMarine - Iates' || titulo =='AquaMarine - Categoria'){
        srcimagem = `<img src="../img/Carrinho/${cartitens[i].tag}.png"></img>`
    }

    // Src dinamico para as embarcações especificas

    if(titulo == 'AquaMarine - ULTRA 310X' || titulo == 'AquaMarine - ULTRA 310LX-S' 
     || titulo == 'AquaMarine - Azimut Grande S10' || titulo =='AquaMarine - Azimut S7' 
     || titulo =='AquaMarine - Nautitech 46 Open' || titulo =='AquaMarine - Lagoon 46'){
        srcimagem = `<img src="../../img/Carrinho/${cartitens[i].tag}.png"></img>`
    }

    console.log(cartitens)

    for(let i=0; i < cartitens.length; i++){
        
        somavalor += cartitens[i].preço

        carrinhohtml.innerHTML +=  `
        <div  class="produto">

            <div class="deletarproduto">
                <label>
                    <span></span>
                    <span></span>
                </label>
            </div>

            <div class="produtodv1">
                ${srcimagem}
            </div>
        
            <div class="produtodv2">
                <h4>${cartitens[i].nome}</h4>
                <p>Retirada: ${cartitens[i].datainicial}  </p>
                <p>Devolução: ${cartitens[i].datafinal}  </p>
                <p>Quantidade de dias: ${cartitens[i].dias}  </p>
                <p>Valor do aluguel: R$ ${cartitens[i].preço}</p>
            </div>
        </div>
        ` 
    }

    valortotal.innerHTML = ''
    valortotal.innerHTML +=  `<h4 id="valorpagamento"> Valor Total: R$ ${somavalor} </h4>
        <div> 
        <p><input id="usarpontos" type="checkbox"> Usar Pontos</p>
            <a id="efetuarpagamento">Efetuar Pagamento</a>
        </div>
    `

    // evento click no botão de pagar
    let efPag = document.getElementById('efetuarpagamento')
    efPag.addEventListener('click', EfetuarPagamento)

    // Eevento click no check box de usar pontos
    let teste = document.getElementById('usarpontos')

    teste.addEventListener('click', attsubvalor)

    selecionabotãodeletar()
    cartitens = []
    return somavalor
}

atualizar()


// ------------------ Deleta item do carrinho ------------------

function selecionabotãodeletar(){

    let botaodeletar = document.querySelectorAll('.deletarproduto')
    let divprodutonocarrinho = document.querySelectorAll('.produto')
    let itemnocarrinho = localStorage.getItem('carrinhoitens')
    itemnocarrinho = JSON.parse(itemnocarrinho)
  
    for (let i=0; i < botaodeletar.length ; i++){
        botaodeletar[i].addEventListener('click', () => { 
            
            localStorage.removeItem('carrinhoitens')
            itemnocarrinho.splice(i,1)

            localStorage.setItem('carrinhoitens',JSON.stringify(itemnocarrinho))
            atualizar()
        })       
    }

}


// Efetuar Pagamento

function EfetuarPagamento(){

    let divcarrinho = document.querySelector('.blockcarrinho')
    let itenslocalstorage = JSON.parse(localStorage.getItem('carrinhoitens'))
    let usuarioslocalstorage = JSON.parse(localStorage.getItem('usuarios'))
    let status = verificastatus()
    let usuariostemp = []
    
    if(typeof status == 'undefined'){
        alert('Obrigatório estar logado.')
    }
    if(typeof status != 'true'){
        
        for(users in usuarioslocalstorage){
            usuariostemp.push(usuarioslocalstorage[users])
        }

        resultado = usarpontos()
        usuariostemp[status].c_pontos = resultado[1]
        localStorage.setItem('usuarios',JSON.stringify(usuariostemp))
        localStorage.removeItem('carrinhoitens')
        esconder()
    }
}   

// Da desconto com pontos

function usarpontos(){
    let usepontos = document.getElementById('usarpontos')
    let status = JSON.parse(localStorage.getItem('loginstatus'))
    let usuariologado = JSON.parse(localStorage.getItem('usuarios'))
    let usuarios = JSON.parse(localStorage.getItem('usuarios'))
    let itenslocalstorage = JSON.parse(localStorage.getItem('carrinhoitens'))
    let saldo = 0
    let valor = 0

    if(status){
        if(status[0] == true){
             
            pontosusuarios = usuariologado[status[1]].c_pontos
        }
    }

    for(item in itenslocalstorage){
        valor = itenslocalstorage[item].preço + valor
    }

    if(usepontos){
        if(usepontos.checked){
            if(valor/2 < pontosusuarios){
                saldo = valor / 2
                pontosusuarios = pontosusuarios - saldo
            }
            else{
                saldo = valor - pontosusuarios
                pontosusuarios -= pontosusuarios
            }
        }
        else{
            saldo = valor
            pontosusuarios = valor/10 + pontosusuarios
        }
    }
    pontosusuarios = Math.trunc(pontosusuarios)

    return [saldo,pontosusuarios]
}

// Atualiza o valor da compra conforme uso de pontos ou não

function attsubvalor(){
    let valorpagar = usarpontos()
    let valorpagamento = document.getElementById('valorpagamento')
    
    valorpagamento.textContent =  `Valor Total: R$ ${valorpagar[0]}`
}