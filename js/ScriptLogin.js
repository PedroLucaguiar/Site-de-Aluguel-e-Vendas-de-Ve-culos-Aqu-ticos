// Abre / Fecha Aba de Login e Cadastro

let divautenticar = document.getElementById('Autenticar')
let fecharlogin = document.querySelector('.fecharopcoes3')
let divlogin = document.querySelector('.blockautt')

fecharlogin.addEventListener('click', esconderlogin)
divautenticar.addEventListener('click', aparecerlogin)

function esconderlogin(){
    divlogin.style.display = 'none';
    corpo.style.overflow = 'auto';
}

function aparecerlogin(){
    let blocoperfil = document.getElementById('blocoperfil')
    resetinputs()
    if(divautenticar.textContent != 'Perfil'){
        divlogin.style.display = 'flex';
        
    }
    else{
        blocoperfil.style.display = 'flex';
        insertperfil()
    }
    corpo.style.overflow = 'hidden';
}

// Cadastro

cadastro = document.getElementById('cadastrar')
cadastro.addEventListener('click', getinfoscadastro)

function getinfoscadastro(){
    let divcadastrar = document.getElementById('divcadastro')
    let nome = document.getElementById('loginnome')
    let usuario = document.getElementById('loginusuario')
    let senha = document.getElementById('loginsenha')
    let senhaconf = document.getElementById('loginsenhaconf')
    let cpf = document.getElementById('logincpf')
    let email = document.getElementById('loginemail')

    let usuariosstorage = localStorage.getItem('usuarios')
    usuariosstorage = JSON.parse(usuariosstorage)

    usuarios = []

    cliente = [
        {
        c_nome:'',
        c_usuario:'',
        c_senha:'',
        c_cpf:'',
        c_email:'',
        c_pontos:''
        },
    ]

    for(item in usuariosstorage){
        usuarios.push(usuariosstorage[item])
    }

    if(nome.value != '' && usuario.value != '' && senha.value != '' && senhaconf.value != '' 
    && cpf.value != '' && email.value != ''){
        if(senha.value != senhaconf.value){
            senha.style.color = 'red';
            senhaconf.style.color = 'red';
        }
        else{
            cliente[0].c_nome = nome.value
            cliente[0].c_usuario = usuario.value
            cliente[0].c_senha = senha.value
            cliente[0].c_cpf = cpf.value
            cliente[0].c_email = email.value
            cliente[0].c_pontos = 0

            usuarios.push(cliente[0])
            localStorage.setItem('usuarios',JSON.stringify(usuarios))


            divcadastrar.style.display = 'none';

        }
    }
    corpo.style.overflow = 'auto';
}

// login 


cadastro = document.getElementById('logar')
cadastro.addEventListener('click', login)

function login(){
    let divcadastrar = document.getElementById('divcadastro')
    let usuario = document.getElementById('logarusuario')
    let senha = document.getElementById('logarsenha')
    
    let Storageuser = localStorage.getItem('usuarios')
    Storageuser = JSON.parse(Storageuser)

    let iduser = []

    if(usuario.value == ''){
        usuario.style.color = 'red';
    }
    if(senha.value == ''){
        senha.style.color = 'red';
    }
    if(usuario.value != '' && senha.value != ''){
        for(user in Storageuser){
            if(Storageuser[user].c_senha == senha.value && Storageuser[user].c_usuario == usuario.value){
                divcadastrar.style.display = 'none';

                
                divautenticar.innerHTML = ''
                divautenticar.innerHTML = '<a >Perfil</a>'

                iduser.push(true)
                iduser.push(user)

                localStorage.setItem('loginstatus',JSON.stringify(iduser))

            }

        }
    }


    corpo.style.overflow = 'auto';
}

// verifica se ta logado ou não

function verificastatus(){
    let status = JSON.parse(localStorage.getItem('loginstatus'))

    if(status){
        if(status[0] == true){
            let divautenticar = document.getElementById('Autenticar')
    
            divautenticar.innerHTML = ''
            divautenticar.innerHTML = '<a >Perfil</a>'
            
            return status[1]
        }
    }

}

verificastatus()

// Insere infos no perfil

function insertperfil(){
    let htmldivperfil = document.querySelector('.infousuário')

    let Storageuser = localStorage.getItem('usuarios')
    Storageuser = JSON.parse(Storageuser)

    user = Storageuser[verificastatus()]


    htmldivperfil.innerHTML = ''
    htmldivperfil.innerHTML = `
    <h3>Infomações Pessoais</h3>
    <p>Nome: ${user.c_nome} </p>
    <p>Email: ${user.c_email}</p>
    <p>CPF: ${user.c_cpf}</p>
    <p>Pontos: ${user.c_pontos}</p>
    `
}

// Fechar perfil

f_perfil = document.getElementById('fecharopcoes4')
f_perfil.addEventListener('click', fecharperfil)

function fecharperfil(){
    let blocoperfil = document.getElementById('blocoperfil')

    blocoperfil.style.display = 'none';
    corpo.style.overflow = 'auto';
}

// Deslogar

Perfildeslogar = document.getElementById('deslogar')
Perfildeslogar.addEventListener('click', f_deslogar)

function f_deslogar(){
    let divautenticar = document.getElementById('Autenticar')
    
    divautenticar.innerHTML = ''
    divautenticar.innerHTML = '<a >Autenticar</a>'

    localStorage.removeItem('loginstatus');
    fecharperfil()
}

// reset inputs

function resetinputs(){
    let input_nome = document.getElementById('loginnome')
    let input_usuario = document.getElementById('loginusuario')
    let input_senha = document.getElementById('loginsenha')
    let input_senhaconf = document.getElementById('loginsenhaconf')
    let input_cpf = document.getElementById('logincpf')
    let input_email = document.getElementById('loginemail')

    input_nome.value = ''
    input_usuario.value = ''
    input_senha.value = ''
    input_senhaconf.value = ''
    input_cpf.value = ''
    input_email.value = ''

    let input_log_usuario = document.getElementById('logarusuario')
    let input_log_senha = document.getElementById('logarsenha')

    input_log_usuario.value = ''
    input_log_senha.value = ''
}