(function () {
  conectarDB();
  const nombreInput = document.querySelector('#nombre');
  const emailInput = document.querySelector('#email');
  const telefonoInput = document.querySelector('#telefono');
  const empresaInput = document.querySelector('#empresa');
  const formulario = document.querySelector('#formulario');
  let DB;

  formulario.addEventListener('submit', actualizarCliente);

  // Verificar el ID de la URL
  const parametrosURL = new URLSearchParams(window.location.search);
  const idCliente = parametrosURL.get('id');

  if (idCliente) {
    setTimeout(() => {
      obtenerCliente(idCliente);
    }, 500);
  }

  function obtenerCliente(id) {
    const transaction = DB.transaction(['crm'], 'readonly');
    const objectStore = transaction.objectStore('crm');

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (e) {
      const cursor = e.target.result;
      if (cursor) {
        if (cursor.value.id === id) {
          llenarFormulario(cursor.value);
        }
        cursor.continue();
      }
    };
  }

  function actualizarCliente(e) {
    e.preventDefault();

    if (
      nombreInput.value === '' ||
      emailInput.value === '' ||
      telefonoInput.value === '' ||
      empresaInput.value === ''
    ) {
      imprimirAlerta('Todos los campos son obligatorios', 'error');
      return;
    }

    // Actualizar Cliente

    const clienteActualizado = {
      nombre: nombreInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
      empresa: empresaInput.value,
      id: idCliente,
    };

    const transaction = DB.transaction(['crm'], 'readwrite');
    objectStore = transaction.objectStore('crm');
    objectStore.put(clienteActualizado);

    transaction.onerror = function () {
      imprimirAlerta('Hubo un error al editar el cliente', 'error');
    };

    transaction.oncomplete = function () {
      imprimirAlerta('Editado Correctamente');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    };
  }

  function llenarFormulario(datosCliente) {
    const { nombre, email, telefono, empresa } = datosCliente;
    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
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
})();
