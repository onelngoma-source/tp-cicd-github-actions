const express = require('express');
const os = require('os'); // Module pour récupérer les infos du système (Container ID)
const app = express();

app.get('/', (req, res) => {
    // Récupération des infos dynamiques du serveur
    const containerId = os.hostname();
    const uptime = Math.floor(os.uptime() / 60); // Uptime en minutes
    const memoryUsage = Math.round((os.freemem() / os.totalmem()) * 100);
    const platform = os.type() + ' ' + os.release();

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DevOps Monitor - Status Live</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        <style>
            :root {
                --primary: #00f2fe;
                --secondary: #4facfe;
                --bg: #0f172a;
                --card-bg: rgba(30, 41, 59, 0.7);
                --text: #e2e8f0;
                --success: #10b981;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: var(--bg);
                background-image: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
                color: var(--text);
                margin: 0;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                overflow: hidden;
            }
            
            /* Animations */
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
            }
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }

            .container {
                width: 90%;
                max-width: 800px;
                animation: slideUp 0.8s ease-out;
            }

            .dashboard-card {
                background: var(--card-bg);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 20px;
                padding: 2rem;
                box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                position: relative;
                overflow: hidden;
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                padding-bottom: 1rem;
            }

            .status-badge {
                background: rgba(16, 185, 129, 0.2);
                color: var(--success);
                padding: 0.5rem 1rem;
                border-radius: 50px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 8px;
                border: 1px solid var(--success);
            }

            .status-dot {
                width: 10px;
                height: 10px;
                background-color: var(--success);
                border-radius: 50%;
                animation: pulse 2s infinite;
            }

            .grid-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .stat-box {
                background: rgba(0,0,0,0.2);
                padding: 1.5rem;
                border-radius: 15px;
                border: 1px solid rgba(255,255,255,0.05);
                transition: transform 0.3s ease;
            }
            .stat-box:hover {
                transform: translateY(-5px);
                background: rgba(255,255,255,0.05);
            }

            .stat-label {
                font-size: 0.9rem;
                color: #94a3b8;
                margin-bottom: 0.5rem;
            }
            .stat-value {
                font-size: 1.5rem;
                font-weight: bold;
                background: linear-gradient(to right, var(--primary), var(--secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .console-logs {
                background: #000;
                color: #0f0;
                font-family: 'Consolas', monospace;
                padding: 1rem;
                border-radius: 10px;
                height: 150px;
                overflow: hidden;
                font-size: 0.9rem;
                opacity: 0.8;
                border: 1px solid #333;
                position: relative;
            }
            .console-logs::before {
                content: "LIVE LOGS >";
                position: absolute;
                top: 0;
                left: 0;
                background: #333;
                color: #fff;
                padding: 2px 8px;
                font-size: 0.7rem;
            }
            
            .log-line {
                margin: 2px 0;
                white-space: nowrap;
                overflow: hidden;
                animation: type 3s steps(60, end); 
            }

            footer {
                margin-top: 2rem;
                text-align: center;
                font-size: 0.8rem;
                color: #64748b;
            }

        </style>
    </head>
    <body>
        <div class="container">
            <div class="dashboard-card">
                <div class="header">
                    <div>
                        <h1 style="margin:0">🚀 CI/CD Pipeline</h1>
                        <span style="font-size: 0.9rem; color: #94a3b8;">Déploiement Automatisé via GitHub Actions</span>
                    </div>
                    <div class="status-badge">
                        <div class="status-dot"></div>
                        SYSTEM OPERATIONAL
                    </div>
                </div>

                <div class="grid-stats">
                    <div class="stat-box">
                        <div class="stat-label"><i class="fas fa-box"></i> Container ID</div>
                        <div class="stat-value">${containerId}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label"><i class="fas fa-server"></i> Platform</div>
                        <div class="stat-value">Linux Alpine</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label"><i class="fas fa-clock"></i> Uptime</div>
                        <div class="stat-value">${uptime} min</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label"><i class="fab fa-docker"></i> Environment</div>
                        <div class="stat-value">Production</div>
                    </div>
                </div>

                <div class="console-logs" id="logs">
                    </div>
            </div>
            
            <footer>
                <p>Développé avec ❤️ par Onel | Propulsé par Render & Docker Hub</p>
                <p>Version: 2.1.0 (Live)</p>
            </footer>
        </div>

        <script>
            // Simulation de logs pour l'effet "Matrix/DevOps"
            const logsContainer = document.getElementById('logs');
            const messages = [
                "[INFO] Server started on port 3000",
                "[INFO] Connected to Docker Registry",
                "[SUCCESS] CI/CD Pipeline validated",
                "[CHECK] Health check passed: 200 OK",
                "[METRICS] Memory usage stable",
                "[NETWORK] Incoming request from load balancer...",
                "[INFO] Serving static assets",
                "[SECURITY] SSL Certificate valid"
            ];

            function addLog() {
                const msg = messages[Math.floor(Math.random() * messages.length)];
                const time = new Date().toLocaleTimeString();
                const div = document.createElement('div');
                div.className = 'log-line';
                div.textContent = \`[\${time}] \${msg}\`;
                logsContainer.prepend(div);
                
                if (logsContainer.children.length > 8) {
                    logsContainer.removeChild(logsContainer.lastChild);
                }
            }

            setInterval(addLog, 2000);
            addLog(); // Premier log direct
        </script>
    </body>
    </html>
    `;

    res.status(200).send(htmlContent);
});

module.exports = app;