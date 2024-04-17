const botaoIniciarCamera = document.querySelector('[data-video-botao]');
const campoCamera = document.querySelector('[data-camera]');
const video = document.querySelector('[data-video]');
const botaoTirarFoto = document.querySelector('[data-tirar-foto]');
const canvas = document.querySelector('[data-video-canvas]');
const mensagem = document.querySelector('[data-mensagem]');
const botaoTirarFotoNovamente = document.querySelector('[data-tirar-foto-novamente]');
const botaoEnviarFoto = document.querySelector('[data-enviar]');

botaoIniciarCamera.addEventListener('click', abrirCamera);

async function abrirCamera() {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

    botaoIniciarCamera.style.display = 'none';
    campoCamera.style.display = 'block';

    video.srcObject = iniciarVideo;
};

botaoTirarFoto.addEventListener('click', function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL('image/png');

    campoCamera.style.display = 'none';
    mensagem.style.display = 'block';
});

botaoTirarFotoNovamente.addEventListener('click', () => {
    mensagem.style.display = 'none'
    abrirCamera();
});

botaoEnviarFoto.addEventListener('click', () => {
    const receberDadosExistentes = localStorage.getItem('cadastro');
    const converterRetorno = JSON.parse(receberDadosExistentes); 

    converterRetorno.imagem = imagemURL;

    localStorage.setItem('cadastro', JSON.stringify(converterRetorno));

    window.location.href = './abrir-conta-form-3.html';
});

