import "./supabase.js";

document.getElementById("btnEntrar").addEventListener("click", async () => {
    const email = document.getElementById("correo").value.trim();
    const password = document.getElementById("contrasena").value.trim();

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("❌ Error al iniciar sesión: " + error.message);
        return;
    }

    // Redirigir al tablero
    window.location.href = "tablero.html";
});

document.getElementById("btnCrearCuenta").addEventListener("click", async () => {
    const email = document.getElementById("correo").value.trim();
    const password = document.getElementById("contrasena").value.trim();

    const { error } = await supabaseClient.auth.signUp({
        email,
        password
    });

    if (error) {
        alert("❌ Error al crear cuenta: " + error.message);
        return;
    }

    alert("✔ Cuenta creada. Revisa tu correo para confirmar.");
});
