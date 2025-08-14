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
    alert("Formulário salvo com sucesso!");
});