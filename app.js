const express = require('express');
const app = express();

// On définit une page HTML simple avec du CSS intégré dans une chaîne de caractères
const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projet DevOps CI/CD</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 3rem;
            border-radius: 15px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        p {
            font-size: 1.2rem;
            opacity: 0.8;
        }
        .badge {
            display: inline-block;
            padding: 0.5rem 1rem;
            margin-top: 1.5rem;
            border-radius: 50px;
            background-color: #4CAF50;
            color: white;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .stack-icons {
            margin-top: 2rem;
            font-size: 1.5rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Application DevOps Live !</h1>
        <p>Ce projet a été déployé automatiquement via un pipeline CI/CD.</p>
        
        <div class="badge">
            ✅ Version Stable en Production
        </div>

        <div class="stack-icons">
            Node.js • Docker • GitHub Actions • Render
        </div>
    </div>
</body>
</html>
`;

app.get('/', (req, res) => {
  // On envoie le contenu HTML au lieu du texte brut
  res.status(200).send(htmlContent);
});

module.exports = app;