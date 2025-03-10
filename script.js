let historyData = [];
let lastFetchedPeriod = null;

// Function to fetch game result
async function fetchGameResult() {
    try {
        const payload = {
            pageSize: 10,
            pageNo: 1,
            typeId: 1,
            language: 0,
            random: "4a0522c6ecd8410496260e686be2a57c",
            signature: "334B5E70A0C9B8918B0B15E517E2069C",
            timestamp: Math.floor(Date.now() / 1000)
        };

        let response = await fetch("https://api.bdg88zf.com/api/webapi/GetNoaverageEmerdList", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        let data = await response.json();
        let latestResult = data?.data?.list?.[0];

        if (latestResult) {
            return { period: latestResult.issueNumber, result: latestResult.number };
        } else {
            throw new Error("No data found in the API response");
        }
    } catch (error) {
        console.error("Error fetching game result:", error);
        return null;
    }
}

// Algorithm for prediction
function trendAnalysis(history) {
    let bigCount = history.filter(item => item.result >= 5).length;
    let smallCount = history.filter(item => item.result < 5).length;
    return bigCount > smallCount ? "BIG" : "SMALL";
}

// Auto-predict function
function autoPredict() {
    return { type: trendAnalysis(historyData) };
}

// Function to update prediction
async function updatePrediction() {
    let apiResult = await fetchGameResult();

    if (apiResult && apiResult.period !== lastFetchedPeriod) {
        lastFetchedPeriod = apiResult.period;
        let currentPeriod = (BigInt(apiResult.period) + 1n).toString();

        let prediction = autoPredict();

        document.getElementById("currentPeriod").innerText = currentPeriod;
        document.getElementById("prediction").innerText = prediction.type;

        historyData.unshift({ period: currentPeriod, prediction: prediction.type, resultStatus: "Pending" });
        updateHistory();
        checkWinLoss(apiResult);
    }
}

// Function to check win/loss
function checkWinLoss(apiResult) {
    historyData.forEach(item => {
        if (item.period === apiResult.period) {
            let actualResult = apiResult.result >= 5 ? "BIG" : "SMALL";
            item.resultStatus = item.prediction === actualResult ? "WIN" : "LOSS";
        }
    });

    updateStats();
    updateHistory();
}

// Function to update stats
function updateStats() {
    document.getElementById("totalBets").innerText = historyData.length;
    document.getElementById("totalWins").innerText = historyData.filter(item => item.resultStatus === "WIN").length;
    document.getElementById("totalLosses").innerText = historyData.filter(item => item.resultStatus === "LOSS").length;

    let accuracy = ((historyData.filter(item => item.resultStatus === "WIN").length / historyData.length) * 100).toFixed(2) || 0;
    document.getElementById("accuracy").innerText = accuracy + "%";
}

// Function to update history
function updateHistory() {
    let historyDiv = document.getElementById("history");
    historyDiv.innerHTML = historyData.map(item =>
        `<div class="history-item ${item.resultStatus.toLowerCase()}">
            Period: ${item.period} <br>
            Prediction: ${item.prediction} <br>
            Status: ${item.resultStatus}
        </div>`
    ).join("");
}

// Fetch new result every 30 seconds
setInterval(updatePrediction, 30000);
