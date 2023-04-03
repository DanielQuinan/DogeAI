let slideIndex = 1;
showSlides(slideIndex);

// Controles dos botões de anterior/próximo
function plusSlide(n) {
    showSlides(slideIndex += n);
  }

// Controle de thumbnail de imagens
function slideAtual(n) {
    showSlides(slideIndex = n);
  }

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

const receberPergunta = document.getElementById("pergunta");
const resultado = document.getElementById("resposta");


receberPergunta.addEventListener("keypress", (e)=>{
    if(receberPergunta.value && e.key === 'Enter')
    enviarPergunta();
});

const CHAVE_API = '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'

function enviarPergunta(){
    const ePergunta = receberPergunta.value;

    fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
        Authorization: "Bearer " + CHAVE_API,
    },
    body: JSON.stringify({
        model: "text-davinci-003",
        prompt: ePergunta,
        max_tokens: 3072,
        temperature: 1.0
        
    }),
    })
    .then((response) => response.json())
    .then((json) => {
        if(resultado.value) resultado.value += "\n"

        if (json.error?.message){
            resultado.value += `Error: ${json.error.message}`
        } else if (json.choices?.[0].text) {
            var text = json.choices[0].text || "Sem Resposta";
            resultado.value += "Chat GPT: " + text;
        }
        resultado.scrollTop = resultado.scrollHeight;
    })
    
    .catch((error)=> console.error("Error", error))
    .finally(()=>{
        receberPergunta.value = '';
        receberPergunta.disabled = false;
        receberPergunta.classList.remove('loader')
        document.getElementById("dogebg").src = dogebg.src.replace("dogebg2.png", "dogebg.png");
        document.getElementById("pergunta").placeholder = 'Pergunte qualquer coisa ao Doge'
        receberPergunta.focus();
    });


    if (resultado.value) resultado.value += "\n\n\n";
    resultado.value += `Usuário: ${ePergunta}`
    receberPergunta.classList.add('loader');
    document.getElementById("dogebg").src = dogebg.src.replace("dogebg.png", "dogebg2.png");
    document.getElementById("pergunta").disabled = true;
    document.getElementById("pergunta").placeholder = ''
    receberPergunta.value = ''
    resultado.scrollTop = resultado.scrollHeight;
    
}
