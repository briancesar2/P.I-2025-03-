window.onload = function() {
    const form = document.getElementById("avaliacaoForm");
    const dadosSalvos = JSON.parse(localStorage.getItem("avaliacaoDados"));
    if (dadosSalvos) {
        for (let campo in dadosSalvos) {
            let input = form.elements[campo];
            if (input) {
                if (input.type === "radio") {
                    let radios = document.getElementsByName(campo);
                    radios.forEach(r => {
                        if (r.value === dadosSalvos[campo]) {
                            r.checked = true;
                        }
                    });
                } else {
                    input.value = dadosSalvos[campo];
                }
            }
        }
    }
};

document.getElementById("avaliacaoForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const form = e.target;
    let dados = {};
    Array.from(form.elements).forEach(el => {
        if (el.name) {
            if (el.type === "radio" && el.checked) {
                dados[el.name] = el.value;
            } else if (el.type !== "radio") {
                dados[el.name] = el.value;
            }
        }
    });

    localStorage.setItem("avaliacaoDados", JSON.stringify(dados));

    let pontos = 0;

    const idade = parseInt(dados.idade);
    if (!isNaN(idade)) {
        if (idade <= 30) pontos += 2;
        else if (idade <= 45) pontos += 1;
    }

    const peso = parseFloat(dados.peso);
    const altura = parseFloat(dados.altura) / 100;
    if (!isNaN(peso) && !isNaN(altura) && altura > 0) {
        const imc = peso / (altura * altura);
        if (imc >= 18.5 && imc <= 24.9) pontos += 2;
        else if (imc >= 25 && imc <= 29.9) pontos += 1;
    }

    if (dados.dores === "Não") pontos += 2;

    if (dados.tempo === "Menos de 1 ano") pontos += 2;
    if (dados.tempo === "Entre 2 e 4 anos") pontos += 1;

    if (dados.fumo === "Nunca fumei") pontos += 2;
    if (dados.fumo === "Já fumei, porém não fumo mais") pontos += 1;

    if (dados.alimentacao === "Excelente") pontos += 2;
    if (dados.alimentacao === "Boa") pontos += 1;

    if (dados.sono === "De 7 a 8 horas" || dados.sono === "Mais de 8 horas") pontos += 2;
    if (dados.sono === "De 5 a 6 horas") pontos += 1;

    let nivel = "Iniciante";
    if (pontos >= 6 && pontos <= 9) nivel = "Intermediário";
    if (pontos >= 10) nivel = "Avançado";

    localStorage.setItem("nivelExercicio", nivel);

    window.location.href = "resultadoform.html";
});