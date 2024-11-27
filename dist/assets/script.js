document.addEventListener("DOMContentLoaded", () => {
    // Primeiro, verificamos se todos os carrosseis estão no DOM
    const carrosseis = document.querySelectorAll(".carrossel-container");
  
    if (carrosseis.length === 0) {
      console.error("Nenhum carrossel encontrado no DOM.");
      return; // Se não houver carrosseis, o script para de executar
    }
  
    carrosseis.forEach(container => {
      // Verifica se os elementos necessários estão presentes antes de tentar usá-los
      const carrossel = container.querySelector(".carrossel");
      const fotoMaior = container.previousElementSibling.querySelector(".foto-principal");
      const miniaturas = carrossel ? carrossel.querySelectorAll(".miniatura") : [];
      const setaEsquerda = container.querySelector(".seta.esquerda");
      const setaDireita = container.querySelector(".seta.direita");
  
      // Verifica se todos os elementos foram encontrados
      if (!carrossel || !fotoMaior || miniaturas.length === 0 || !setaEsquerda || !setaDireita) {
        console.error("Elementos do carrossel estão faltando no DOM.");
        return; // Se faltar qualquer elemento necessário, o script para de executar para esse carrossel
      }
  
      let scrollPosition = 0;
      const miniaturaWidth = 160; // Largura de cada miniatura (incluindo o gap)
      let activeCarrossel = null; // Variável para controlar qual carrossel está ativo
  
      // Atualiza a imagem principal ao clicar na miniatura
      miniaturas.forEach((miniatura, index) => {
        miniatura.addEventListener("click", () => {
          fotoMaior.src = miniatura.src;
          fotoMaior.alt = miniatura.alt;
          activeCarrossel = container; // Marca o carrossel como ativo
        });
      });
  
      // Movimento do carrossel para a direita
      setaDireita.addEventListener("click", () => {
        const maxScroll = carrossel.scrollWidth - container.offsetWidth;
        if (scrollPosition < maxScroll) {
          scrollPosition += miniaturaWidth;
          carrossel.style.transform = `translateX(-${scrollPosition}px)`;
        }
      });
  
      // Movimento do carrossel para a esquerda
      setaEsquerda.addEventListener("click", () => {
        if (scrollPosition > 0) {
          scrollPosition -= miniaturaWidth;
          carrossel.style.transform = `translateX(-${scrollPosition}px)`;
        }
      });
  
      // Lógica para mudar a imagem maior com as teclas do teclado
      document.addEventListener("keydown", (event) => {
        if (activeCarrossel === null) return; // Verifica se há um carrossel ativo
  
        const miniaturasAtivas = activeCarrossel.querySelectorAll(".miniatura");
        let currentIndex = Array.from(miniaturasAtivas).findIndex(miniatura => miniatura.src === fotoMaior.src);
  
        if (event.key === "ArrowRight") {
          // Para a tecla de seta para a direita
          if (currentIndex < miniaturasAtivas.length - 1) {
            currentIndex++;
            fotoMaior.src = miniaturasAtivas[currentIndex].src;
            fotoMaior.alt = miniaturasAtivas[currentIndex].alt;
          }
        } else if (event.key === "ArrowLeft") {
          // Para a tecla de seta para a esquerda
          if (currentIndex > 0) {
            currentIndex--;
            fotoMaior.src = miniaturasAtivas[currentIndex].src;
            fotoMaior.alt = miniaturasAtivas[currentIndex].alt;
          }
        }
      });
    });
  });
  