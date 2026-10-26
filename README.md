# contador

Microfrontend JavaScript con repositorio Git independiente.

Vercel publica public-deploy, segun vercel.json. No necesita package.json ni serve.mjs.

Despues de editar src, index.html o remoteEntry.json, sincronizar la carpeta publicada desde este directorio con PowerShell:

```powershell
Copy-Item .\src\* .\public-deploy\src\ -Recurse -Force
Copy-Item .\index.html,.\remoteEntry.json .\public-deploy\ -Force
```

La API se consume por /api; vercel.json redirige a https://demo-tienda-api.onrender.com.
Los cambios locales requieren un nuevo despliegue para aparecer en internet.
