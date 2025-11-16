import "./supabase.js";

async function protegerTablero() {
    const { data } = await supabaseClient.auth.getSession();

    if (!data.session) {
        // No hay sesión → regresar al login
        window.location.href = "index.html";
    }
}

protegerTablero();

// Cerrar sesión
document.getElementById("logout").addEventListener("click", async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "index.html";
});
