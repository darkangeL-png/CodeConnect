const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("imagem-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo (arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPricipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const ConteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPricipal.src = ConteudoDoArquivo.url
            nomeDaImagem.textContent = ConteudoDoArquivo.nome
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    } 
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tags")) {
        const tagRemover = evento.target.parentElement;
        listaTags.removeChild(tagRemover);
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript", "Back-end", "Python"];

async function VerificarTags(tagsTexto) {
    return new Promise((resolve) => {
        setTimeout(() =>{
            resolve(tagsDisponiveis.includes(tagsTexto));
        }, 1000)
    })
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagtexto = inputTags.value.trim();
        if (tagtexto !== "") {
            try {
            const tagExiste = await VerificarTags(tagtexto);
            if (tagExiste) {
                const tagNova = document.createElement("li");
                tagNova.innerHTML = `<p>${tagtexto}</p> <img src="./img/close-black.svg" class="remove-tags">`
                listaTags.appendChild(tagNova);
                inputTags.value = "";
            } else {
                alert("tag nao foi encontrada")
            }
            } catch (error) {
                console.error("erro ao verificar se a tag existe")
                alert("Erro a existemcia da tag. verifique o console.")
            }
        }
    }
})

const botaoPublicar = document.querySelector(".botao-publicar");

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto , tagsDoProjeto) {
    return new Promise((resolve,reject) =>{
        setTimeout(() => {

            const deuCerto = Math.random() > 0.5;

            if (deuCerto) {
                resolve("Projeto publicado com sucesso")
            } else {
                reject("Erro ao publicar o projeto")
            }
        },2000)
    })
}

botaoPublicar.addEventListener("click", async (evento) =>{
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("Descricao").value;
    const tagsDoProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto ,tagsDoProjeto);
        console.log(resultado);
        alert("Deu tudo certo")
    }  catch(error) {
        console.log("Deu errado:", error)
        alert("Deu tudo errado")
    }
})

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset();

    imagemPricipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "imagem_projeto.png";

    listaTags.innerHTML = "";
})