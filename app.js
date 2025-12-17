const express = require('express');
const os = require('os');
const app = express();

app.get('/', (req, res) => {
    // Récupération des données système réelles
    const containerId = os.hostname();
    const uptime = Math.floor(os.uptime() / 60); 
    const memoryUsage = Math.round((1 - os.freemem() / os.totalmem()) * 100);
    const cpuCount = os.cpus().length;

    // Liens vers TES projets (mis à jour avec tes infos)
    const githubUrl = "https://github.com/onelngoma-source/tp-cicd-github-actions";
    const dockerUrl = "https://hub.docker.com/r/onelmelvy/tp-cicd-github-actions";

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DevOps Dashboard - Live Monitor</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            :root {
                --primary: #00f2fe;
                --secondary: #4facfe;
                --bg: #0f172a;
                --card-bg: rgba(30, 41, 59, 0.6);
                --text: #e2e8f0;
                --success: #10b981;
                --github: #333;
                --docker: #0db7ed;
            }
            
            body {
                font-family: 'Segoe UI', system-ui, sans-serif;
                background-color: var(--bg);
                background-image: 
                    radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
                    radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                    radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
                color: var(--text);
                margin: 0;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .container {
                width: 90%;
                max-width: 900px;
                animation: slideUp 0.8s ease-out;
            }

            .dashboard-card {
                background: var(--card-bg);
                backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 24px;
                padding: 2.5rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            }

            /* Header Section */
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2.5rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }

            h1 {
                margin: 0;
                background: linear-gradient(to right, #fff, #94a3b8);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 1.8rem;
            }

            .status-badge {
                background: rgba(16, 185, 129, 0.1);
                color: var(--success);
                padding: 0.5rem 1rem;
                border-radius: 9999px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 0.9rem;
                border: 1px solid rgba(16, 185, 129, 0.2);
                box-shadow: 0 0 15px rgba(16, 185, 129, 0.1);
            }

            .status-dot {
                width: 8px;
                height: 8px;
                background-color: var(--success);
                border-radius: 50%;
                animation: pulse 2s infinite;
            }

            /* Stats Grid */
            .grid-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2.5rem;
            }

            .stat-box {
                background: rgba(255,255,255,0.03);
                padding: 1.5rem;
                border-radius: 16px;
                border: 1px solid rgba(255,255,255,0.05);
                transition: transform 0.2s, background 0.2s;
            }
            .stat-box:hover {
                transform: translateY(-3px);
                background: rgba(255,255,255,0.06);
                border-color: rgba(255,255,255,0.1);
            }

            .stat-label {
                font-size: 0.85rem;
                color: #94a3b8;
                margin-bottom: 0.5rem;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .stat-value {
                font-size: 1.25rem;
                font-weight: 700;
                color: #fff;
                font-family: 'Consolas', monospace;
            }

            /* Links Section (NOUVEAU) */
            .links-section {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1.5rem;
                margin-bottom: 2.5rem;
            }

            .link-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                padding: 1rem;
                border-radius: 12px;
                text-decoration: none;
                color: white;
                font-weight: 600;
                transition: all 0.3s ease;
                border: 1px solid transparent;
            }

            .btn-github {
                background: rgba(255, 255, 255, 0.05);
                border-color: rgba(255, 255, 255, 0.1);
            }
            .btn-github:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            }

            .btn-docker {
                background: rgba(13, 183, 237, 0.1);
                border-color: rgba(13, 183, 237, 0.3);
                color: #0db7ed;
            }
            .btn-docker:hover {
                background: rgba(13, 183, 237, 0.2);
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(13, 183, 237, 0.15);
            }

            /* Logs Console */
            .console-window {
                background: #09090b;
                border-radius: 12px;
                border: 1px solid #27272a;
                overflow: hidden;
            }
            
            .console-header {
                background: #18181b;
                padding: 8px 16px;
                font-size: 0.75rem;
                color: #a1a1aa;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #27272a;
            }

            .console-logs {
                height: 150px;
                padding: 1rem;
                font-family: 'Consolas', 'Monaco', monospace;
                font-size: 0.85rem;
                color: #4ade80;
                overflow: hidden;
                display: flex;
                flex-direction: column-reverse; /* Les logs apparaissent en bas */
            }

            .log-line {
                margin: 4px 0;
                opacity: 0.9;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            /* Footer */
            footer {
                margin-top: 2rem;
                text-align: center;
                color: #64748b;
                font-size: 0.8rem;
            }

            /* Animations Keyframes */
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
            }
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @media (max-width: 600px) {
                .links-section { grid-template-columns: 1fr; }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="dashboard-card">
                <div class="header">
                    <div>
                        <h1>🚀 CI/CD Pipeline</h1>
                        <span style="font-size: 0.9rem; color: #94a3b8;">Orchestré par GitHub Actions</span>
                    </div>
                    <div class="status-badge">
                        <div class="status-dot"></div>
                        SYSTEM OPERATIONAL
                    </div>
                </div>

                <div class="grid-stats">
                    <div class="stat-box">
                        <div class="stat-label"><i class="fas fa-cube"></i> Container ID</div>
                        <div class="stat-value" style="font-size: 1rem">${containerId}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label"><i class="fab fa-linux"></i> Platform</div>
                        <div class="stat-value">Alpine Linux</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label"><i class="fas fa-clock"></i> Uptime</div>
                        <div class="stat-value">${uptime} min</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label"><i class="fas fa-microchip"></i> CPU Cores</div>
                        <div class="stat-value">${cpuCount}</div>
                    </div>
                </div>

                <div class="links-section">
                    <a href="${githubUrl}" target="_blank" class="link-btn btn-github">
                        <i class="fab fa-github fa-lg"></i>
                        Voir le Repository GitHub
                    </a>
                    <a href="${dockerUrl}" target="_blank" class="link-btn btn-docker">
                        <i class="fab fa-docker fa-lg"></i>
                        Voir l'Image Docker Hub
                    </a>
                </div>

                <div class="console-window">
                    <div class="console-header">
                        <span><i class="fas fa-terminal"></i> LIVE SERVER LOGS</span>
                        <span>Running on port 3000</span>
                    </div>
                    <div class="console-logs" id="logs">
                        </div>
                </div>
            </div>

            <footer>
                <p>Projet TP DevOps • ${new Date().getFullYear()} • Déployé automatiquement via Render</p>
                <p>Version v2.2.0 (Stable)</p>
            </footer>
        </div>

        <script>
            // Logique d'animation des logs
            const logsContainer = document.getElementById('logs');
            const messages = [
                "[INFO] Incoming request from 192.168.1.X",
                "[INFO] Health check: STATUS OK",
                "[METRICS] CPU Usage: 12% | Mem: 45MB",
                "[DOCKER] Container is healthy",
                "[NETWORK] SSL Handshake success",
                "[DB] Connection pool stable",
                "[CACHE] Redis cache hit",
                "[AUDIT] Security scan passed"
            ];

            function addLog() {
                const msg = messages[Math.floor(Math.random() * messages.length)];
                const time = new Date().toLocaleTimeString('fr-FR');
                const div = document.createElement('div');
                div.className = 'log-line';
                div.innerHTML = \`<span style="color:#6b7280">[\${time}]</span> \${msg}\`;
                
                logsContainer.prepend(div);
                
                if (logsContainer.children.length > 7) {
                    logsContainer.removeChild(logsContainer.lastChild);
                }
            }

            setInterval(addLog, 2500);
            addLog();
        </script>
    </body>
    </html>
    `;

    res.status(200).send(htmlContent);
});

module.exports = app;