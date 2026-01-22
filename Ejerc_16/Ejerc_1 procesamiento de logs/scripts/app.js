function bytesToMB(bytes) {
    return (bytes / (1024 * 1024)).toFixed(2);
}

async function cargarLogs() {
    try {
        const response = await fetch('../data/logs.txt');
        const logs = await response.text();
        
        const lineas = logs.split('\n');
        let consumoTotal = 0;
        let tablaHtml = '';

        lineas.forEach(linea => {
            linea = linea.trim();
            if (!linea) return;

            const idSesion = linea.slice(linea.indexOf('ID:') + 3, linea.indexOf('-'));
            const usuario = linea.match(/user: (\S+)/)[1].toLowerCase();
            const consumoBytes = parseFloat(linea.match(/consumo: (\S+)/)[1]);
            const consumoMB = bytesToMB(consumoBytes);
            const estado = linea.includes('ERROR') ? 'ERROR' : 'SUCCESS';

            consumoTotal += parseFloat(consumoMB);

            const claseFila = estado === 'ERROR' ? 'error' : 'success';
            tablaHtml += `
                <tr class="${claseFila}">
                    <td>${idSesion}</td>
                    <td>${usuario}</td>
                    <td>${consumoMB} MB</td>
                    <td>${estado}</td>
                </tr>
            `;
        });

        document.getElementById('logs-table').innerHTML = tablaHtml;
        document.getElementById('total-consumo').innerText = 'Consumo Total detectado: ' + consumoTotal.toFixed(2) + ' MB';

    } catch (error) {
        console.error('Error cargando los logs:', error);
    }
}

window.onload = cargarLogs;
