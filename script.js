body {
    background-color: #0d0f1a;
    color: #fff;
    font-family: 'Arial', sans-serif;
    text-align: center;
    margin: 0;
    padding: 0;
}

/* Block Style Status Bar */
.status-bar {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin: 20px;
}

.status-block {
    background: linear-gradient(45deg, #4a148c, #512da8);
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 8px;
    width: 200px;
    text-align: center;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
}

.win { color: #4caf50; }
.loss { color: #f44336; }
.accuracy { color: #ffeb3b; }

/* Game Container */
.game-container {
    margin: 30px auto;
    padding: 20px;
    background: #1e1f29;
    border-radius: 10px;
    width: 50%;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
}

.prediction-box {
    background: linear-gradient(90deg, #673ab7, #512da8);
    padding: 10px;
    font-size: 22px;
    border-radius: 8px;
    margin-top: 10px;
}

/* History Container */
.history-container {
    margin-top: 30px;
}

#history {
    max-height: 300px;
    overflow-y: auto;
    padding: 10px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
}

.history-item {
    background: #222;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    font-size: 18px;
}

.history-item.win { border-left: 5px solid #4caf50; }
.history-item.loss { border-left: 5px solid #f44336; }
.history-item.pending { border-left: 5px solid #ffeb3b; }
