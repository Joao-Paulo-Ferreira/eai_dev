//declarando os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeLine = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .timer_text");
const timeCount = document.querySelector(".timer .timer_sec");


//Clique do botão Iniciar
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //mostra o box de informações
}

//Clique do botão Sair
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //volta para a tela de inicio /esconde o box
}

//Clique do botão continuar
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //remove o info box
    quiz_box.classList.add("activeQuiz"); //mostra o box quiz
    mostraQuestoes(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let timeValue = 15;
let que_count = 0;
let que_num = 1;
let userScore = 0;
let counter; 
let counterLine;
let widthValue = 0; 

//const next_btn = quiz_box.querySelector(".next_btn");
//const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult")
    timeValue = 15;
    que_count = 0;
    que_num = 1; 
    userScore = 0;
    widthValue = 0; 
    mostraQuestoes(que_count);
    queCounter(que_num);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Tempo restante";
    next_btn.classList.remove("show");
}

quit_quiz.onclick = ()=>{
    window.location.reload();
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

//Clique do botão próxima questão
next_btn.onclick = ()=>{
    if(que_count < questoes.length - 1){
        que_count++;
        que_num++;
        mostraQuestoes(que_count);
        queCounter(que_num);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Tempo restante";
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        //console.log("Questões Completadas")
        showResultBox();
    }
}

//gerando questões e opções do array
function mostraQuestoes(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questoes[index].num + '. ' + questoes[index].questao + '</span>';
    let option_tag = '<div class="option"><span>' + questoes[index].opcoes[0] + '</span></div>'
                    +'<div class="option"><span>' + questoes[index].opcoes[1] + '</span></div>'
                    +'<div class="option"><span>' + questoes[index].opcoes[2] + '</span></div>'
                    +'<div class="option"><span>' + questoes[index].opcoes[3] + '</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(resp){
    clearInterval(counter);
    clearInterval(counterLine);
    let userResp = resp.textContent;
    let respCorret = questoes[que_count].resp;
    let allOptions = option_list.children.length;
    if(userResp == respCorret){
        userScore += 1;
        console.log(userScore);
        resp.classList.add("correct")
        console.log("Resposta correta");
        resp.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        resp.classList.add("incorrect");
        console.log("Resposta errada");
        resp.insertAdjacentHTML("beforeend", crossIcon);
        //se respostas forem incorretas serão mostradas as respostas corretas
        for(i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent == respCorret){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    //selecionar apenas uma opção
    for (i = 0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");   
    }
    next_btn.classList.add("show");
}

function showResultBox(){
    info_box.classList.remove("activeInfo") //remove o info box
    quiz_box.classList.remove("activeQuiz") //remove o quiz box
    result_box.classList.add("activeResult") //mostra o result box
    const textPontuacao = result_box.querySelector(".score_text");
    if(userScore > 3){
        let tagPontuacao = '<span>e parabéns! Você acertou <strong>' + userScore + '</strong> de <strong>' + questoes.length + '</strong></span>';
        textPontuacao.innerHTML = tagPontuacao;
    }else if(userScore > 1){
        let tagPontuacao = '<span>e legal, Você acertou <strong>' + userScore + '</strong> de <strong>' + questoes.length + '</strong></span>';
        textPontuacao.innerHTML = tagPontuacao;
    }else{
        let tagPontuacao = '<span>e desculpe, Você acertou apenas <strong>' + userScore + '</strong> de <strong>' + questoes.length + '</strong></span>';
        textPontuacao.innerHTML = tagPontuacao;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            //timeCount.textContent = "00"
            timeText.textContent = "Tempo esgotado";

            const allOptions = option_list.children.length;
            let respCorret = questoes[que_count].resp;

            for(i = 0; i < allOptions; i++){
                if(option_list.children[i].textContent == respCorret){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }

            for (i = 0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");   
            }
            next_btn.classList.add("show"); 
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
            
        }
    }
}

function queCounter(index){
    //const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><strong>'+ index +'</strong> of <strong>' + questoes.length + '</strong> Questões</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}