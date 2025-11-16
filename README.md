<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Seguimiento de reuniones</title>
  
  <!-- Importamos Supabase como módulo -->
  <script type="module">
    import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

    // --- Configuración de Supabase ---
    const supabaseUrl = 'https://tvifqejxdmhfsvygqvyr.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2aWZxZWp4ZG1oZnN2eWdxdnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NzEzODcsImV4cCI6MjAxNTI0NzM4N30.8ZP2J9EOw7KgBeE1qzO34cOYPQNjYzZICZtdnPvjK-g';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // --- Selectores del DOM ---
    // Esperamos a que el DOM esté cargado para asignar los elementos
    document.addEventListener('DOMContentLoaded', () => {
      
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const loginBtn = document.getElementById('login-btn');
      const signupBtn = document.getElementById('signup-btn');
      const messageBox = document.getElementById('message-box');

      // --- Función de Feedback para el Usuario ---
      /**
       * Muestra un mensaje en la página.
       * @param {string} message - El texto a mostrar.
       * @param {boolean} isError - true si es error (rojo), false si es éxito (verde).
       */
      function showMessage(message, isError = true) {
        messageBox.textContent = message;
        messageBox.className = 'message'; // Resetea clases
        if (message) {
          messageBox.classList.add(isError ? 'error' : 'success');
        }
      }

      /**
       * Activa o desactiva los botones y el estado de carga.
       * @param {boolean} isLoading - true para desactivar botones (cargando).
       */
      function setLoading(isLoading) {
        loginBtn.disabled = isLoading;
        signupBtn.disabled = isLoading;
        loginBtn.textContent = isLoading ? 'Cargando...' : 'Entrar';
        signupBtn.textContent = isLoading ? 'Cargando...' : 'Crear cuenta';
      }

      // --- Funciones de Autenticación ---
      async function login() {
        setLoading(true);
        showMessage('', false); // Limpia mensajes anteriores

        const email = emailInput.value;
        const password = passwordInput.value;
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          showMessage('Error al iniciar sesión: ' + error.message);
        } else {
          showMessage('Inicio de sesión exitoso. ¡Bienvenido!', false);
          // Aquí puedes redirigir a otra página si lo deseas
          // window.location.href = '/dashboard.html';
        }
        setLoading(false);
      }

      async function signup() {
        setLoading(true);
        showMessage('', false); // Limpia mensajes anteriores

        const email = emailInput.value;
        const password = passwordInput.value;
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
          showMessage('Error al crear cuenta: ' + error.message);
        } else {
          showMessage('Cuenta creada. Revisa tu correo para confirmar.', false);
        }
        setLoading(false);
      }

      // --- Asignación de Eventos ---
      // Usamos addEventListener en lugar de 'onclick' en el HTML.
      // Esto es más limpio y funciona mejor con módulos.
      loginBtn.addEventListener('click', login);
      signupBtn.addEventListener('click', signup);
    });
    
  </script>
  
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
  
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #f5f6fa;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      padding: 1rem;
      box-sizing: border-box;
    }
    .card {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      box-sizing: border-box;
    }
    .card h1 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      color: #1e293b;
    }
    p {
      color: #475569;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      box-sizing: border-box; /* Añadido para consistencia */
    }
    
    /* --- Estilos para el cuadro de mensajes --- */
    .message {
      font-size: 0.9rem;
      padding: 0.75rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      display: block;
      opacity: 0;
      transition: opacity 0.3s ease;
      word-wrap: break-word; /* Para errores largos */
    }
    .message.error {
      background-color: #fee2e2;
      color: #b91c1c;
      opacity: 1;
    }
    .message.success {
      background-color: #dcfce7;
      color: #166534;
      opacity: 1;
    }
    /* Oculta el contenedor si no tiene texto */
    .message:empty {
      display: none;
    }
    
    .actions {
      display: flex;
      justify-content: space-between;
      gap: 1rem; /* Añadido espacio entre botones */
    }
    button {
      flex: 1; /* Hace que los botones compartan el espacio */
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #2563eb;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #1d4ed8;
    }
    button.secondary {
      background-color: #e2e8f0;
      color: #1e293b;
    }
    button.secondary:hover {
      background-color: #cbd5e1;
    }
    button:disabled {
      background-color: #94a3b8;
      color: #e2e8f0;
      cursor: not-allowed;
    }
    /* Estilo para el botón secundario cuando está deshabilitado */
    button.secondary:disabled {
      background-color: #e2e8f0;
      color: #94a3b8;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Seguimiento de reuniones</h1>
    <p>Inicia sesión con tu correo y contraseña para acceder al tablero.</p>
    
    <input type="email" id="email" placeholder="tucorreo@ejemplo.com" />
    <input type="password" id="password" placeholder="Contraseña" />
    
    <!-- Contenedor para mostrar mensajes de error o éxito -->
    <div id="message-box" class="message"></div>
    
    <div class="actions">
      <!-- IDs añadidos para seleccionarlos en JS -->
      <button id="login-btn">Entrar</button>
      <button class="secondary" id="signup-btn">Crear cuenta</button>
    </div>
    
    <p style="font-size: 0.8rem; margin-top: 1rem;">Esta sesión se cierra automáticamente al cerrar la pestaña o recargar la página.</p>
  </div>
</body>
</html>
