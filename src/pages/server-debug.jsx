import React, { useState } from "react";

const ServerDebug = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testUrls = [
    "https://media.trendingimportbd.com/uploads/2025/07/20/media-1752971160005-991728723.png",
    "https://media.trendingimportbd.com/uploads/2025/07/20/media-1752971186966-580953790.jpg",
    "https://media.trendingimportbd.com/uploads/",
    "https://media.trendingimportbd.com/",
  ];

  const testUrl = async (url) => {
    try {
      const response = await fetch(url);
      const contentType = response.headers.get("content-type");
      const text = await response.text();

      return {
        url,
        status: response.status,
        contentType,
        isHtml: contentType?.includes("text/html"),
        content: text.substring(0, 1000), // First 1000 chars
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (error) {
      return {
        url,
        error: error.message,
      };
    }
  };

  const runTests = async () => {
    setLoading(true);
    setTestResults({});

    for (const url of testUrls) {
      const result = await testUrl(url);
      setTestResults((prev) => ({ ...prev, [url]: result }));
    }

    setLoading(false);
  };

  return (
    <div
      style={{ padding: "20px", fontFamily: "monospace", maxWidth: "1200px" }}
    >
      <h1>Server Debug - What is the server actually returning?</h1>

      <button
        onClick={runTests}
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Testing..." : "Test Server Responses"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {Object.entries(testResults).map(([url, result]) => (
          <div
            key={url}
            style={{
              marginBottom: "30px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: result.isHtml ? "#ffe6e6" : "#e6ffe6",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                color: result.isHtml ? "#d00" : "#0a0",
              }}
            >
              {url}
            </h3>

            {result.error ? (
              <p style={{ color: "red" }}>Error: {result.error}</p>
            ) : (
              <>
                <p>
                  <strong>Status:</strong> {result.status}
                </p>
                <p>
                  <strong>Content-Type:</strong> {result.contentType}
                </p>
                <p>
                  <strong>Is HTML:</strong> {result.isHtml ? "YES ❌" : "NO ✅"}
                </p>

                {result.isHtml && (
                  <div style={{ marginTop: "10px" }}>
                    <h4>HTML Content (first 1000 chars):</h4>
                    <pre
                      style={{
                        backgroundColor: "#f5f5f5",
                        padding: "10px",
                        overflow: "auto",
                        fontSize: "12px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                    >
                      {result.content}
                    </pre>
                  </div>
                )}

                <details style={{ marginTop: "10px" }}>
                  <summary>Response Headers</summary>
                  <pre
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "10px",
                      fontSize: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    {JSON.stringify(result.headers, null, 2)}
                  </pre>
                </details>
              </>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f0f8ff",
          borderRadius: "8px",
        }}
      >
        <h3>Expected Behavior:</h3>
        <ul>
          <li>
            Image URLs should return <code>Content-Type: image/png</code> or{" "}
            <code>image/jpeg</code>
          </li>
          <li>
            They should NOT return <code>text/html</code>
          </li>
          <li>
            If they return HTML, your Express server has a routing or static
            file serving issue
          </li>
        </ul>

        <h3>Common Server Issues:</h3>
        <ul>
          <li>
            <strong>Files don't exist:</strong> Check if files actually exist on
            server
          </li>
          <li>
            <strong>Wrong static path:</strong> Express static middleware might
            be misconfigured
          </li>
          <li>
            <strong>Route conflict:</strong> Another route might be catching
            these requests
          </li>
          <li>
            <strong>CORS issues:</strong> Server might be blocking the requests
          </li>
          <li>
            <strong>File permissions:</strong> Server can't read the files
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ServerDebug;
