
function salario() {
    let salarioBruto = parseFloat(document.getElementById('income').value) || 0;
    let imposto = 0.0;
    let porcentagem = 0.0 + "%";

    if (salarioBruto <= 2112.00) {
      imposto = 0.0 ; porcentagem = 0.0;
    } else if (salarioBruto <= 2826.65) {
      imposto = (salarioBruto - 2112.00) * 0.075 ; porcentagem = 7.5;
    } else if (salarioBruto <= 3751.05) {
      imposto = (2826.65 - 2112.00) * 0.075 + (salarioBruto - 2826.65) * 0.15 ; porcentagem = 15 ;
    } else if (salarioBruto <= 4664.68) {
      imposto = (2826.65 - 2112.00) * 0.075 +
        (3751.05 - 2826.65) * 0.15 +
        (salarioBruto - 3751.05) * 0.225 ; porcentagem = 22.5;
    } else {
      imposto = (2826.65 - 2112.00) * 0.075 +
        (3751.05 - 2826.65) * 0.15 +
        (4664.68 - 3751.05) * 0.225 +
        (salarioBruto - 4664.68) * 0.275; porcentagem =   27.5 ;
    }
    
    
    let salarioLiquido = salarioBruto - imposto;
    
    const data = [
      { label: 'Imposto', value: imposto, color: '#000000' },
      { label: 'Salário Líquido', value: salarioLiquido, color: '#c9c8c8ff' }
    ];
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    createSlices(data, total);
    updateTotal(total);
    addEventListeners(data);

    const porc = document.getElementById('change');
    porc.innerHTML = `${porcentagem}%`;
  }

  function createSlices(data, total) {
    const svg = document.querySelector('.slices');
    svg.innerHTML = ''; 
    const centerX = 100;
    const centerY = 100;
    const radius = 70;
    const innerRadius = 40;

    let currentAngle = -90;

    data.forEach((item, index) => {
      const percentage = item.value / total;
      const angle = percentage * 360;

      const slice = createSlice(
        centerX,
        centerY,
        radius,
        innerRadius,
        currentAngle,
        angle,
        item.color,
        index
      );

      svg.appendChild(slice);
      currentAngle += angle;
    });
  }

  function createSlice(centerX, centerY, radius, innerRadius, startAngle, angle, color, index) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.classList.add('slice', `slice-${index + 1}`);
    group.setAttribute('data-index', index);

    const endAngle = startAngle + angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const x3 = centerX + innerRadius * Math.cos(endRad);
    const y3 = centerY + innerRadius * Math.sin(endRad);
    const x4 = centerX + innerRadius * Math.cos(startRad);
    const y4 = centerY + innerRadius * Math.sin(startRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', color);

    group.appendChild(path);
    return group;
  }

  function updateTotal(total) {
    const totalElement = document.getElementById('totalValue');
    totalElement.textContent = formatCurrency(total);
  }

  function addEventListeners(data) {
    const slices = document.querySelectorAll('.slice');
    slices.forEach((slice, index) => {
      slice.addEventListener('mouseenter', () => showValue(data, index));
      slice.addEventListener('mouseleave', () => hideValue(index));
    });
  }

  function showValue(data, index) {
    const item = data[index];
    const valueElement = document.getElementById(`value${index + 1}`);
    const textElement = document.getElementById(`value${index + 1}Text`);

    textElement.textContent = `${item.label}: ${formatCurrency(item.value)}`;
    valueElement.classList.add('show');
  }

  function hideValue(index) {
    const valueElement = document.getElementById(`value${index + 1}`);
    valueElement.classList.remove('show');
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  document.addEventListener('DOMContentLoaded', () => {
    salario();
  });
