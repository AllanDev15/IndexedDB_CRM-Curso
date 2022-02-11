(function () {
  let DB;
  conectarDB();
  const formulario = document.querySelector('#formulario');

  formulario.addEventListener('submit', validarCliente);

  function validarCliente(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    if (nombre === '' || email === '' || telefono === '' || empresa === '') {
      imprimirAlerta('Todos los campos son obligatorios', 'error');
      return;
    }

    // Crear un objeto con la información

    const cliente = {
      nombre,
      email,
      telefono,
      empresa,
      id: Math.random().toString(36).slice(2),
    };

    crearNuevoCliente(cliente);
  }

  function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = function () {
      console.log('Hubo un error al abrir la conexion');
    };
    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;
    };
  }

  function crearNuevoCliente(cliente) {
    console.log(DB);
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');
    objectStore.add(cliente);

    transaction.onerror = function () {
      imprimirAlerta('Hubo un error al agregar el cliente a la base de datos', 'error');
    };
    transaction.oncomplete = function () {
      imprimirAlerta('El cliente se agrego correctamente');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    };
  }
})();
