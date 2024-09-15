export interface Usuario {
  id?: number,
  nome: string,
  apelido: string,
  email: string,
  telefone: string,
  senha: string,
  estrelas: number,
  vidas: number,
  tempoParaProximaVida: string
  regeneracaoPausada: boolean;
}
