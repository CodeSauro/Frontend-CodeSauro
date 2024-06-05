import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockPhasesDataTypeService {

  constructor() { }

  getMockData() {
    return [
      { id: 1,
        explaining_phase_page_1: "O Codesauro está preparando uma poção mágica e para criá-la precisamos colocar o tipo certo dentro do caldeirão",
        explaining_phase_page_2: `Existem vários tipos para criar uma poção mágica. Coloque o tipo "Cadeia" para que o Codeusauro crie a poção mágica corretamente`,
        variables_page_1: ["false", "bola", "almoçar", "null", "carro", "barril", "01001"],
        correct_answers_page_1: ["bola", "almoçar", "carro", "barril"],
        variables_page_2: ["futebol", "maça", "true", "32322", "laranja", "34.32"],
        correct_answers_page_2: ["futebol", "maça", "laranja"],
        variables_page_3: ["false", "escola", "banana", "dinossauro", "434.00"],
        correct_answers_page_3: ["escola", "banana", "dinossauro"],
        variables_page_4: ["false", "true", "televisão", "dinheiro", "null", `"null"`],
        correct_answers_page_4: ["televisão", "dinheiro", "dinossauro", `"null"`],
        knowledge_validation_question: `Do que se trata uma "Cadeia" na programação em Portugol?`,
        knowledge_validation_answers: ["Um número inteiro", "Uma sequência de caracteres, como letras", "Um comando para desenhar na tela", "Um tipo de som emitido pelo computador"],
        knowledge_validation_correct_answer: "Uma sequência de caracteres, como letras"
      },
    ];
  }
}
