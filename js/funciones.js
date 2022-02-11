function imprimirAlerta(mensaje, container, tipo) {
  const alerta = document.querySelector('.alerta');

  if (!alerta) {
    const divAlerta = document.createElement('div');
    divAlerta.classList.add(
      'px-4',
      'py-3',
      'rounded',
      'max-w-lg',
      'mx-auto',
      'mt-6',
      'text-center',
      'border',
      'alerta'
    );
    if (tipo === 'error') {
      divAlerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
    } else {
      divAlerta.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
    }
    divAlerta.textContent = mensaje;
    container.appendChild(divAlerta);
    setTimeout(() => {
      divAlerta.remove();
    }, 3000);
  }
}

export { imprimirAlerta };
