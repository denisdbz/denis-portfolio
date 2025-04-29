async function executarTeste(play) {
     const barra = document.getElementById('barra');
     const logs = document.getElementById('logs');
     const btn = document.getElementById('run-btn');
-    // ocultar/display...
+    let logsArray = [];
     // ...
     try {
         const resposta = await fetch(`/executar`, { /*…*/ });
         // …
         // ao ler linhas:
         linhas.forEach(linha => {
-            logs.innerHTML += formatada + '<br>';
+            logs.innerHTML += formatada + '<br>';
+            logsArray.push(linha.trim());
         });
     } finally {
         btn.disabled = false;
         barra.classList.add('hidden');
+        // grava no histórico
+        const hist = JSON.parse(localStorage.getItem('runsHistory')||'[]');
+        hist.push({ play, date: new Date().toISOString(), logs: logsArray });
+        localStorage.setItem('runsHistory', JSON.stringify(hist));
+        // habilita export
+        document.getElementById('export-btn').disabled = false;
     }
 }

+// no final do arquivo, adiciona:
 document.getElementById('export-btn').onclick = () => {
   const last = JSON.parse(localStorage.getItem('runsHistory')).pop();
   const blob = new Blob([JSON.stringify(last, null,2)], { type: 'application/json'});
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = `report-${last.play}.json`;
   a.click();
   URL.revokeObjectURL(url);
 };