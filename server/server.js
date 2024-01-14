const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// 使用 CORS 中间件允许跨域请求
app.use(cors());

// 使用 body-parser 中间件解析 JSON 请求体
app.use(bodyParser.json());

// 获取分数的路由
app.get('/scores', (req, res) => {
    fs.readFile('scores.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading scores.json');
            return;
        }
        res.send(data);
    });
});

app.post('/scores', (req, res) => {
    const { level, score } = req.body; // 接收级别和分数

    fs.readFile('scores.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading scores.json');
            return;
        }

        let scores = JSON.parse(data);
        scores[level.toString()] = score; // 确保键是字符串
        
        fs.writeFile('scores.json', JSON.stringify(scores, null, 2), 'utf8', (err) => {
            if (err) {
                res.status(500).send('Error writing to scores.json');
                return;
            }
            res.send('Score updated successfully');
        });
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});