/**
 * Gerar uma "string" com 5 caracteres random
 */
export function random8() {
  return Math.random()
    .toString(36)
    .slice(2, 10);
}

/**
 * Pausa a execução por um número específico de milissegundos.
 * @param {number} ms Número de milissegundos para pausar.
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
