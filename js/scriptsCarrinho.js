// ---------------------------- produtos + infos ----------------------------
const produtos = [
    {
        nome:'Azimut Grande S10',
        tag:'AzimutS10',
        preço: 650,
        nocarrinho: 0

    },
    {
        nome:'Azimut S7',
        tag:'AzimutS7',
        preço: 600,
        nocarrinho: 0 
    },
    {
        nome:'JET SKI ULTRA 310X',
        tag:'JTultra310x',
        preço: 400,
        nocarrinho: 0 
    },
    {
        nome:'JET SKI ULTRA 310LX-S',
        tag:'JTultra310lxs',
        preço: 420,
        nocarrinho: 0 
    },
    {
        nome:'Lagoon 46',
        tag:'Lagoon46',
        preço: 350,
        nocarrinho: 0 
    },
    {
        nome:'Nautitech 46 Open',
        tag:'Lagoon46open',
        preço: 370,
        nocarrinho: 0 
    },
]



// ---------------------------- Abrir opções de alugel ----------------------------

const fundocinza = document.getElementById('blockcopcoes')
const botfechar = document.getElementById('fecharopcoes')
const iniciaralugar = document.getElementById('btnalugar')


botfechar.addEventListener('click', esconde)
iniciaralugar.addEventListener('click', aparece)

function esconde(){
    fundocinza.style.display = 'none';
    corpo.style.overflow = 'auto';
    deletemensage()
}

function aparece(){
    fundocinza.style.display = 'flex';
    corpo.style.overflow = 'hidden';
    checkclick()
}

 // ---------------------------- add item no carrinho ----------------------------
 function additemcarrinho(){
        
    if(getvalueinput() != true){
        let carrinhohtml = document.querySelector('.blockcarrinhoprodutos')
        let nomeproduto = document.getElementById('produto').textContent
        let prt = produtos[conta(produtos, nomeproduto)]

        let molde = [
            {
                nome:'',
                tag:'',
                preço: 0,
                datainicial: 0,
                datafinal: 0,
                dias: 0,
                pontos:0
            },
        ]


        if( cartitens.length === 0){
            let itenslocalstorage = localStorage.getItem('carrinhoitens')
            itenslocalstorage = JSON.parse(itenslocalstorage)
            for(i in itenslocalstorage){
                cartitens.push(itenslocalstorage[i])
            }
        }


        valorsubtotal = checkclick() 
        datainicio =  getinicialdate()
        datafinalizado = getfinaldate()
        diasdealuguel = difDias()
        
        
        // Passa valores do aluguel para a lista molde

        molde[0].nome = `${prt.nome}`
        molde[0].tag = `${prt.tag}`
        molde[0].preço = valorsubtotal * diasdealuguel
        molde[0].datainicial = datainicio
        molde[0].datafinal = datafinalizado
        molde[0].dias = diasdealuguel
        molde[0].pontos =(valorsubtotal * diasdealuguel)/10



        cartitens.push(molde[0])

        selecionabotãodeletar()
        localStorage.setItem('carrinhoitens',JSON.stringify(cartitens))
        cartitens = []
        esconde()
        resetcheck()
    }
}

const confirmaropcoes = document.querySelector('.opcooesdiv2')

confirmaropcoes.addEventListener('click' , additemcarrinho)

//------------- Pega o nome do produto apartir da pagina e verifica seu index na lista -------------

function conta(obj, val){
    i = 0
    for(item in obj){
        for(var chave in obj[i]) {
            if(String(obj[i][chave]) === val) {
                return i;
            }
        }
        i ++
    }
}

//------------- Maximizar foto -------------

let foto = document.getElementsByClassName('fotos')
let divaparecer = document.getElementsByClassName('fotomax')
let divdesaparecer = document.getElementsByClassName('fotomaxatv')
let divdaimg = document.querySelector('.divfotomax')
let endereço =''


for (let i=0; i < foto.length ; i++){
    foto[i].addEventListener('click', () => { 
        
        divaparecer[0].classList.toggle('fotomaxatv')
        divaparecer[0].classList.toggle('fotomax')

        
        endereço = foto[i].children[0].getAttribute('src')
        divdaimg.innerHTML = ` <img src="${endereço}" alt="">
        ` 
        


        for (let i=0; i < divdesaparecer.length ; i++){
            divdesaparecer[i].addEventListener('click', () => { 
                
                divdesaparecer[0].classList.toggle('fotomax')
                divdesaparecer[0].classList.toggle('fotomaxatv')

                divdaimg.innerHTML = `` 
                
            }) 
        }
    })     
    
}

// Insere o nome da embarcação no menu de opções de aluguel

document.getElementById('nomedoproduto').textContent = document.getElementById('produto').textContent


// verificar se as datas estão em branco, se sim, impedem do item ser add ao carrinho

function getvalueinput(){

    let datainicio = document.getElementById('datainicio')
    let datafinal = document.getElementById('datafinal')
    let divdatas = document.getElementById('DatasInvalidas')

    if(fundocinza.style.display == 'flex'){
        if(isNaN(datainicio.value) == '' || isNaN(datafinal.value) =='' ){
            divdatas.textContent = 'Obrigatório o preenchimento das datas.'
            return true;
        }
    }

}

// Apaga a mensagem de obrigatoriedade das datas

function deletemensage(){
    let divdatas = document.getElementById('DatasInvalidas')
    let datainicio = document.getElementById('datainicio')
    let datafinal = document.getElementById('datafinal')

    divdatas.textContent = ''
    datafinal.value = ''
    datainicio.value = ''
}


// Click event for check-box and values for this

function checkclick(){

    let botaocheck = document.querySelectorAll('.opcoescheck')
    let valorzinho = 0

    valorzinho = 0


    for (let i=0; i < botaocheck.length ; i++){

        if(botaocheck[i].checked){

            if(i == 0){
                valorzinho += 300
            }
            if(i == 1){
                valorzinho += 126
            }
            if(i == 2){
                valorzinho += 150
            }
            if(i == 3){
                valorzinho += 332
            }
            if(i == 4){
                valorzinho += 275
            }

        }

        subtotal(valorzinho)
    }
    
    for (let i=0; i < botaocheck.length ; i++){
        botaocheck[i].addEventListener('click', () => { 
            
            if(botaocheck[i].checked){

                if(i == 0){
                    valorzinho += 300
                }
                if(i == 1){
                    valorzinho += 126
                }
                if(i == 2){
                    valorzinho += 150
                }
                if(i == 3){
                    valorzinho += 332
                }
                if(i == 4){
                    valorzinho += 275
                }

            }else{

                if(i == 0){
                    valorzinho -= 300
                }
                if(i == 1){
                    valorzinho -= 126
                }
                if(i == 2){
                    valorzinho -= 150
                }
                if(i == 3){
                    valorzinho -= 332
                }
                if(i == 4){
                    valorzinho -= 275
                }

            }
            subtotal(valorzinho)
        })       
    }
    return subtotal(valorzinho)
    
}


// Insere o Subtotal no menu de opções de aluguel

function subtotal(valor){
    let subtotalhtml = document.getElementById('subtotalmenuopc')
    let nomeproduto = document.getElementById('produto')
    let valordoproduto = produtos[conta(produtos, nomeproduto.textContent)].preço
    let dias = difDias()
    
    
    subtotalhtml.textContent = `Diária: R$ ${valordoproduto + valor} `
    valorretorno = (valordoproduto + valor)
    


    return (valorretorno)
}

// reseta os check box

function resetcheck(){
    let botaocheck = document.querySelectorAll('.opcoescheck')

    for (let i=0; i < botaocheck.length ; i++){
        if(botaocheck[i].checked){
            botaocheck[i].checked = false;
        }
    }
}


// Get na data inicial

function getinicialdate(){
    let datainicio = document.getElementById('datainicio').value
    
    let dia  = datainicio.split("-")[0];
    let mes  = datainicio.split("-")[1];
    let ano  = datainicio.split("-")[2];

    datainicio = ano + '/' + ("0"+mes).slice(-2) + '/' + ("0"+dia).slice(-2);

    return datainicio
}

// Get na data final

function getfinaldate(){
    let datafinal = document.getElementById('datafinal').value

    let dia  = datafinal.split("-")[0];
    let mes  = datafinal.split("-")[1];
    let ano  = datafinal.split("-")[2];

    datafinal = ano + '/' + ("0"+mes).slice(-2) + '/' + ("0"+dia).slice(-2);
   
    return datafinal
}

// Calcula os dias de aluguel

function difDias(){
    let datainicio = document.getElementById('datainicio').value
    let datafinal = document.getElementById('datafinal').value
    
    datainicio = new Date(datainicio)
    datafinal = new Date(datafinal)

    return parseInt( (datafinal - datainicio) / (24 * 3600 * 1000) + 1 );
}
