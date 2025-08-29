document.addEventListener("DOMContentLoaded", function () {
    const nivel = localStorage.getItem("nivelExercicio");
    const dados = JSON.parse(localStorage.getItem("avaliacaoDados")) || {};
    const nome = dados.nome || "Usuário";

    const nivelBox = document.getElementById("nivelExercicio");
    const feedbackLista = document.getElementById("feedbackLista");

    if (nivelBox) {
        const texto = nivel ? `${nome}, seu nível é: ${nivel}` : "Não foi possível calcular seu nível.";
        nivelBox.textContent = texto;

        nivelBox.classList.remove("nivel-iniciante", "nivel-intermediario", "nivel-avancado");

        const n = (nivel || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        if (n === "iniciante") nivelBox.classList.add("nivel-iniciante");
        else if (n === "intermediario") nivelBox.classList.add("nivel-intermediario");
        else if (n === "avancado") nivelBox.classList.add("nivel-avancado");
    }

    if (!feedbackLista) return;

    if (dados.idade) {
        const idade = parseInt(dados.idade);
        if (!isNaN(idade)) {
            if (idade <= 30) feedbackLista.innerHTML += "<li>Idade jovem, mais facilidade para iniciar treinos.</li>";
            else if (idade <= 45) feedbackLista.innerHTML += "<li>Boa idade, mas exige atenção ao ritmo dos treinos.</li>";
            else feedbackLista.innerHTML += "<li>Idade mais avançada, ideal começar com treinos leves.</li>";
        }
    }

    if (dados.peso && dados.altura) {
        const peso = parseFloat(dados.peso);
        const altura = parseFloat(dados.altura) / 100;
        if (!isNaN(peso) && !isNaN(altura) && altura > 0) {
            const imc = peso / (altura * altura);
            if (imc >= 18.5 && imc <= 24.9) {
                feedbackLista.innerHTML += "<li>Seu IMC está adequado.</li>";
            } else if (imc >= 25 && imc <= 29.9) {
                feedbackLista.innerHTML += "<li>Seu IMC indica sobrepeso leve, cuidado com a intensidade.</li>";
            } else {
                feedbackLista.innerHTML += "<li>Seu IMC está fora da faixa saudável, sugerimos iniciar devagar.</li>";
            }
        }
    }

    if (dados.dores === "Não") feedbackLista.innerHTML += "<li>Ausência de dores, bom sinal para prática física.</li>";
    if (dados.dores === "Sim") feedbackLista.innerHTML += "<li>Relato de dores, atenção para não exagerar nos treinos.</li>";

    if (dados.tempo === "Menos de 1 ano") feedbackLista.innerHTML += "<li>Prática recente de atividade física.</li>";
    if (dados.tempo === "Entre 2 e 4 anos") feedbackLista.innerHTML += "<li>Tempo moderado sem exercícios.</li>";
    if (dados.tempo === "Mais de 5 anos") feedbackLista.innerHTML += "<li>Longo tempo sem treinar, comece aos poucos.</li>";

    if (dados.fumo === "Nunca fumei") feedbackLista.innerHTML += "<li>Hábito saudável: nunca fumou.</li>";
    if (dados.fumo === "Já fumei, porém não fumo mais") feedbackLista.innerHTML += "<li>Ex-fumante, atenção ao condicionamento inicial.</li>";
    if (dados.fumo === "Fumo ativamente") feedbackLista.innerHTML += "<li>Tabagismo afeta o desempenho, inicie com treinos leves.</li>";

    if (dados.alimentacao) feedbackLista.innerHTML += `<li>Sua alimentação foi classificada como: ${dados.alimentacao}.</li>`;
    if (dados.sono) feedbackLista.innerHTML += `<li>Sono médio: ${dados.sono}.</li>`;
});