import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockPhasesDataTypeService {

  constructor() { }

  getMockData() {
    return [
      { id: 1,
        number_of_pages_explaining: 4,
        explaining_phase_page_1: "O Codesauro está fazendo uma poção mágica! Para que dê certo, precisamos escolher o ingrediente certo para colocar no caldeirão.",
        explaining_phase_page_2: `Há muitos ingredientes, que são os tipos de dados na programação, mas só um é o certo. Arraste o tipo "Cadeia" até o caldeirão para fazer a poção!`,
        explaining_phase_page_3: `Em Portugol, o tipo "Cadeia" é uma sequência de letras ou palavras, como um segredo que usamos para escrever mensagens no computador.`,
        explaining_phase_page_4: "Agora que você conhece o tipo de dados Cadeia, vamos fazer a poção mágica juntos!",
        number_of_pages_phases: 4,
        variables_page_1: ["verdadeiro", "gato", "comer", "7", "bicicleta", "cadeira", "101110"],
        correct_answers_page_1: ["gato", "comer", "bicicleta", "cadeira"],
        variables_page_2: ["azul", "correr", "10", "peixe", "sol", "falso", "00001111", "nulo"],
        correct_answers_page_2: ["azul", "correr", "peixe", "sol"],
        variables_page_3: ["vermelho", "saltar", "14", "lua", "verdadeiro", "falso"],
        correct_answers_page_3: ["vermelho", "saltar", "lua"],
        variables_page_4: ["amarelo", "nadar", "20.00", "girassol", "estrela", "nulo", "101010"],
        correct_answers_page_4: ["amarelo", "nadar", "girassol", "estrela"],
        number_of_pages_questions: 1,
        knowledge_validation_question: `Na programação em Portugol, quando falamos sobre o tipo de dados "Cadeia", o que isso significa?`,
        knowledge_validation_answers: ["É um tipo de número", "É como uma fila de letras ou palavras", "É um comando para fazer desenhos no computador", "É um som que o computador pode fazer"],
        knowledge_validation_correct_answer: "É como uma fila de letras ou palavras",
      },
      { id: 2,
        number_of_pages_explaining: 2,
        explaining_phase_page_1: "teste...",
        explaining_phase_page_2: "teste...",
        number_of_pages_phases: 4,
        variables_page_1: ["teste..."],
        correct_answers_page_1: ["teste..."],
        variables_page_2: ["teste..."],
        correct_answers_page_2: ["teste..."],
        variables_page_3: ["teste..."],
        correct_answers_page_3: ["teste..."],
        variables_page_4: ["teste..."],
        correct_answers_page_4: ["teste..."],
        number_of_pages_questions: 1,
        knowledge_validation_question: "teste...",
        knowledge_validation_answers: ["teste..."],
        knowledge_validation_correct_answer: "teste...",
      },
    ];
  }
}
