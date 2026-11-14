// La versión y el enlace de descarga salen del latest.json publicado con cada release.
(async () => {
    const boton = document.getElementById("DescargarBTN");
    const estado = document.getElementById("EstadoDeDescarga");

    try {
        const respuesta = await fetch("latest.json", { cache: "no-store" });
        if (!respuesta.ok)
            throw new Error(`HTTP ${respuesta.status}`);

        const datos = await respuesta.json();
        if (!datos.version || !datos.url)
            throw new Error("latest.json incompleto");

        boton.href = datos.url;
        boton.target = "_blank";
        boton.rel = "noopener";
        boton.hidden = false;
        estado.textContent = `Última versión: ${datos.version}`;
        if (datos.notes)
            estado.title = datos.notes;
    } catch {
        // Sin latest.json, en GitHub Pages se puede ofrecer la página de releases del repositorio.
        const segmentos = location.pathname.split("/").filter(Boolean);
        if (location.hostname.endsWith(".github.io") && segmentos.length > 0) {
            const propietario = location.hostname.split(".")[0];
            boton.href = `https://github.com/${propietario}/${segmentos[0]}/releases`;
            boton.hidden = false;
            estado.textContent = "No se pudo consultar la versión. Descarga desde la página de releases.";
        } else {
            estado.textContent = "No se pudo consultar la última versión. Inténtalo de nuevo más tarde.";
        }
    }
})();
