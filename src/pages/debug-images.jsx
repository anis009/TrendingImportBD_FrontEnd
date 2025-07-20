import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/utils/common";

const DebugImages = () => {
  const [testResults, setTestResults] = useState([]);

  // Test different URL formats
  const testUrls = [
    "/uploads/2025/07/20/media-1752971160005-991728723.png",
    "uploads/2025/07/20/media-1752971160005-991728723.png",
    "https://media.trendingimportbd.com/uploads/2025/07/20/media-1752971160005-991728723.png",
    "",
    null,
    undefined,
  ];

  useEffect(() => {
    const results = testUrls.map((url) => ({
      input: url,
      output: getImageUrl(url),
      displayValue:
        url === null
          ? "null"
          : url === undefined
          ? "undefined"
          : url === ""
          ? "empty string"
          : url,
    }));
    setTestResults(results);
  }, []);

  const testImageLoad = async (url) => {
    try {
      const response = await fetch(url, { method: "GET" });
      const contentType = response.headers.get("content-type");
      const contentLength = response.headers.get("content-length");

      // If it's returning HTML instead of an image, get the HTML content
      let content = null;
      if (contentType && contentType.includes("text/html")) {
        content = await response.text();
        content = content.substring(0, 500); // First 500 chars
      }

      return {
        status: response.status,
        contentType,
        contentLength,
        isHtml: contentType && contentType.includes("text/html"),
        htmlContent: content,
      };
    } catch (error) {
      return { error: error.message };
    }
  };

  const [imageTests, setImageTests] = useState({});

  const handleTestImage = async (url) => {
    setImageTests((prev) => ({ ...prev, [url]: "testing..." }));
    const result = await testImageLoad(url);
    setImageTests((prev) => ({ ...prev, [url]: result }));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Image URL Debug Page</h1>

      <h2>URL Construction Tests</h2>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ padding: "8px" }}>Input</th>
            <th style={{ padding: "8px" }}>Output (getImageUrl)</th>
            <th style={{ padding: "8px" }}>Test Load</th>
            <th style={{ padding: "8px" }}>Result</th>
          </tr>
        </thead>
        <tbody>
          {testResults.map((test, index) => (
            <tr key={index}>
              <td style={{ padding: "8px" }}>{test.displayValue}</td>
              <td style={{ padding: "8px", wordBreak: "break-all" }}>
                {test.output}
              </td>
              <td style={{ padding: "8px" }}>
                <button onClick={() => handleTestImage(test.output)}>
                  Test
                </button>
              </td>
              <td style={{ padding: "8px" }}>
                {imageTests[test.output] && (
                  <pre style={{ fontSize: "12px", margin: 0 }}>
                    {typeof imageTests[test.output] === "string"
                      ? imageTests[test.output]
                      : JSON.stringify(imageTests[test.output], null, 2)}
                  </pre>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Image Display Test</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {testResults
          .filter(
            (test) =>
              test.output &&
              test.output !== "/assets/img/product/product-placeholder.svg"
          )
          .map((test, index) => (
            <div
              key={index}
              style={{ border: "1px solid #ccc", padding: "10px" }}
            >
              <h3>Input: {test.displayValue}</h3>
              <p>
                <strong>URL:</strong> {test.output}
              </p>
              <div
                style={{
                  position: "relative",
                  height: "200px",
                  border: "1px solid #eee",
                }}
              >
                <img
                  src={test.output}
                  alt={`Test image ${index}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    backgroundColor: "#f5f5f5",
                  }}
                  onError={(e) => {
                    console.log("Image load error:", test.output);
                    e.target.style.backgroundColor = "#ffcccc";
                    e.target.alt = "Failed to load";
                  }}
                  onLoad={() => {
                    console.log("Image loaded successfully:", test.output);
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DebugImages;
