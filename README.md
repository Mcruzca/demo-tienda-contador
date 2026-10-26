# contador

Microfrontend JavaScript con repositorio Git independiente.

Editar src/, index.html y remoteEntry.json directamente. Vercel publica la raiz del proyecto segun vercel.json. No necesita package.json ni serve.mjs.

La API se consume por /api; vercel.json redirige a https://demo-tienda-api.onrender.com.
Los cambios llegan a internet al hacer push a main (Vercel despliega solo).
