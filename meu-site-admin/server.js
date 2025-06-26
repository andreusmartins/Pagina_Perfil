const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Configuração do Multer (upload de imagens)
const upload = multer({
    dest: path.join(__dirname, 'public', 'uploads')
});

// Configurações gerais do Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'Imagens')));
app.use(bodyParser.urlencoded({ extended: true }));

const DATA_FILE = path.join(__dirname, 'data', 'site-data.json');

// Funções utilitárias
function getData() {
    const raw = fs.readFileSync(DATA_FILE);
    return JSON.parse(raw);
}

function saveData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Rota GET /admin (formulário de admin)
app.get('/admin', (req, res) => {
    const data = getData();
    res.render('admin', { data });
});

// Rota POST /admin (receber form e upload de imagem)
app.post('/admin', upload.single('imagem_perfil'), (req, res) => {
    let data = req.body;

    // Se uma nova imagem foi enviada, atualiza o caminho da imagem
    if (req.file) {
        data.imagem_perfil = '/uploads/' + req.file.filename;
    } else {
        // Se não enviou imagem nova, mantém a imagem antiga
        const atual = getData();
        data.imagem_perfil = atual.imagem_perfil;
    }

    saveData(data);
    res.redirect('./site');
});

// Rota GET /site (exibição do site)
app.get('/site', (req, res) => {
    const data = getData();
    res.render('site', { data });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}`);
});
