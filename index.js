// Dados iniciais
let data = [
  { name: "Vendas", value: 400, color: "#00c3ffff" },
  { name: "Marketing", value: 300, color: "#e3e3e3ff" },
]


// Função para calcular o total
function getTotal() {
  return data.reduce((sum, item) => sum + item.value, 0)
}

// Função para criar um segmento do gráfico
function createSegment(item, startAngle, endAngle, index) {
  const radius = 80
  const innerRadius = 50

  // Converter ângulos para radianos
  const startAngleRad = (startAngle * Math.PI) / 180
  const endAngleRad = (endAngle * Math.PI) / 180

  // Calcular pontos do arco (referência externa do SVG)
  const x1 = Math.cos(startAngleRad) * radius
  const y1 = Math.sin(startAngleRad) * radius
  const x2 = Math.cos(endAngleRad) * radius
  const y2 = Math.sin(endAngleRad) * radius

  const x3 = Math.cos(startAngleRad) * innerRadius
  const y3 = Math.sin(startAngleRad) * innerRadius
  const x4 = Math.cos(endAngleRad) * innerRadius
  const y4 = Math.sin(endAngleRad) * innerRadius

  // Determinar se o arco é maior que 180 graus (Large Arc Flag)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0

  // Criar o path do segmento (Comando 'd' do SVG Path Data)
  const pathData = [
    `M ${x1} ${y1}`, // Mover para o ponto externo inicial
    `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`, // Arco externo
    `L ${x4} ${y4}`, // Linha para o ponto interno final
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x3} ${y3}`, // Arco interno
    "Z", // Fechar o path
  ].join(" ")

  // Criar elemento path
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
  path.setAttribute("d", pathData)
  path.setAttribute("fill", item.color)
  path.setAttribute("class", "chart-segment") // Classe para o CSS de animação
  path.setAttribute("data-name", item.name)
  path.setAttribute("data-index", index)

  // NOVO: Adicionar eventos de mouse para a animação de hover
  path.addEventListener('mouseenter', () => handleSegmentHover(path, true));
  path.addEventListener('mouseleave', () => handleSegmentHover(path, false));

  return path
}

// NOVO: Função para lidar com o hover (passar o mouse)
function handleSegmentHover(pathElement, isEntering) {
    if (isEntering) {
        pathElement.classList.add('hovered');
    } else {
        pathElement.classList.remove('hovered');
    }
}

// Função para renderizar o gráfico
function renderChart() {
  const chartGroup = document.querySelector(".chart-group")
  const totalValue = document.querySelector(".total-value")

  if (!chartGroup || !totalValue) return

  // Limpar gráfico anterior
  chartGroup.innerHTML = ""

  // Atualizar total
  const total = getTotal()
  totalValue.textContent = total

  let currentAngle = -90 // Começar do topo

  // Criar segmentos
  data.forEach((item, index) => {
    const percentage = item.value / total
    const angle = percentage * 360
    const endAngle = currentAngle + angle

    const segment = createSegment(item, currentAngle, endAngle, index)
    chartGroup.appendChild(segment)

    currentAngle = endAngle
  })

  // Renderizar legenda
  renderLegend()
}

// Função para renderizar a legenda
function renderLegend() {
  const legend = document.querySelector(".legend")
  if (!legend) return

  legend.innerHTML = ""

  data.forEach((item) => {
    const legendItem = document.createElement("div")
    legendItem.className = "legend-item"

    const colorBox = document.createElement("div")
    colorBox.className = "legend-color"
    colorBox.style.backgroundColor = item.color

    const text = document.createElement("span")
    text.className = "legend-text"
    const percentage = ((item.value / getTotal()) * 100).toFixed(1); 
    text.textContent = `${item.name}: ${item.value} (${percentage}%)`

    legendItem.appendChild(colorBox)
    legendItem.appendChild(text)
    legend.appendChild(legendItem)
  })
}

// Removida a função handleSegmentClick
// Removida a função randomizeData

// Inicializar o gráfico quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  renderChart()
})