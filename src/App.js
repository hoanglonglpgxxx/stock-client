import React, { useState } from "react";
import axios from "axios";

function App() {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState("");

  const fetchStockData = async () => {
    setError("");
    try {
      const response = await axios.get(`http://localhost:5000/api/stock/${symbol}`);
      setStockData(response.data);
    } catch (error) {
      setError("Không tìm thấy mã cổ phiếu hoặc có lỗi xảy ra.");
      setStockData(null);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Đánh Giá Cổ Phiếu Việt Nam</h2>
      <input
        type="text"
        placeholder="Nhập mã cổ phiếu (VD: VNM)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        style={{ padding: "10px", fontSize: "16px" }}
      />
      <button onClick={fetchStockData} style={{ padding: "10px", fontSize: "16px", marginLeft: "10px" }}>
        Tìm kiếm
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {stockData && (
        <div style={{ marginTop: "20px" }}>
          <h3>{stockData.name}</h3>
          <p><strong>Giá hiện tại:</strong> {stockData.price}</p>
          <p><strong>P/E Ratio:</strong> {stockData.peRatio}</p>
          <p><strong>EPS:</strong> {stockData.eps}</p>
          <p><strong>Vốn hóa thị trường:</strong> {stockData.marketCap}</p>
          <h4>Đánh giá: {evaluateStock(stockData.peRatio, stockData.eps, stockData.marketCap)}</h4>
        </div>
      )}
    </div>
  );
}

function evaluateStock(peRatio, eps, marketCap) {
  if (peRatio < 15 && eps > 0 && marketCap > 50000) return "Tốt";
  if (peRatio > 25 || eps < 0) return "Kém";
  return "Trung bình";
}

export default App;
