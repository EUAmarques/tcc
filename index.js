function calcularIR() {
  const salario = parseFloat(document.getElementById('salario').value);

  if (isNaN(salario) || salario <= 0) {
    alert("Digite um valor válido de salário!");
    return;
  }

  let aliquota = 0;
  let parcelaDeduzir = 0;

  if (salario <= 2428.80) {
    aliquota = 0;
    parcelaDeduzir = 0;
  } else if (salario <= 2826.65) {
    aliquota = 0.075;
    parcelaDeduzir = 182.16;
  } else if (salario <= 3751.05) {
    aliquota = 0.15;
    parcelaDeduzir = 394.16;
  } else if (salario <= 4664.68) {
    aliquota = 0.225;
    parcelaDeduzir = 675.49;
  } else {
    aliquota = 0.275;
    parcelaDeduzir = 908.73;
  }

  const imposto = Math.max((salario * aliquota) - parcelaDeduzir, 0);
  const salarioLiquido = salario - imposto;

  document.getElementById('imposto').textContent = imposto.toFixed(2);
  document.getElementById('liquido').textContent = salarioLiquido.toFixed(2);
  document.getElementById('resultado').style.display = 'block';
}
let data = [
  { name: "Governo", value: 400, color: "#111213ff" },
  { name: "Cliente", value: 300, color: "#e3e3e3ff" },
];

// Referências ao container de informações
const chartInfo = document.getElementById("chart-info");
const contributionDiv = document.getElementById("contribution");
const individualDiv = document.getElementById("individual");

// Função para calcular o total
function getTotal() {
  return data.reduce((sum, item) => sum + item.value, 0);
}

// Função para criar um segmento do gráfico
function createSegment(item, startAngle, endAngle, index) {
  const radius = 80;
  const innerRadius = 50;

  const startAngleRad = (startAngle * Math.PI) / 180;
  const endAngleRad = (endAngle * Math.PI) / 180;

  const x1 = Math.cos(startAngleRad) * radius;
  const y1 = Math.sin(startAngleRad) * radius;
  const x2 = Math.cos(endAngleRad) * radius;
  const y2 = Math.sin(endAngleRad) * radius;

  const x3 = Math.cos(startAngleRad) * innerRadius;
  const y3 = Math.sin(startAngleRad) * innerRadius;
  const x4 = Math.cos(endAngleRad) * innerRadius;
  const y4 = Math.sin(endAngleRad) * innerRadius;

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  const pathData = [
    `M ${x1} ${y1}`,
    `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
    `L ${x4} ${y4}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x3} ${y3}`,
    "Z",
  ].join(" ");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  path.setAttribute("fill", item.color);
  path.setAttribute("class", "chart-segment");
  path.setAttribute("data-name", item.name);
  path.setAttribute("data-index", index);

  // Eventos de hover
  path.addEventListener('mouseenter', () => handleSegmentHover(path, true));
  path.addEventListener('mouseleave', () => handleSegmentHover(path, false));

  return path;
}

// Função para lidar com o hover
function handleSegmentHover(pathElement, isEntering) {
    const index = parseInt(pathElement.getAttribute("data-index"));
    const item = data[index];
    const total = getTotal();
    const percentage = ((item.value / total) * 100).toFixed(1);

    if (isEntering) {
        if(item.name === "Governo") {
            contributionDiv.textContent = `Parcela do governo: ${item.value} (${percentage}%)`;
            individualDiv.textContent = '';
        } else if(item.name === "Cliente") {
            contributionDiv.textContent = '';
            individualDiv.textContent = `Parcela do cliente: ${item.value} (${percentage}%)`;
        }

        chartInfo.style.display = "block";
        pathElement.classList.add('hovered');
    } else {
        chartInfo.style.display = "none";
        contributionDiv.textContent = '';
        individualDiv.textContent = '';
        pathElement.classList.remove('hovered');
    }
}

// Função para renderizar o gráfico
function renderChart() {
  const chartGroup = document.querySelector(".chart-group");
  const totalValue = document.querySelector(".total-value");

  if (!chartGroup || !totalValue) return;

  chartGroup.innerHTML = "";
  const total = getTotal();
  totalValue.textContent = total;

  let currentAngle = -90; // Começar do topo

  data.forEach((item, index) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const endAngle = currentAngle + angle;

    const segment = createSegment(item, currentAngle, endAngle, index);
    chartGroup.appendChild(segment);

    currentAngle = endAngle;
  });
}

// Inicializar o gráfico
document.addEventListener("DOMContentLoaded", () => {
  renderChart();
});
