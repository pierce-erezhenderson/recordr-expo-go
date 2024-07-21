const output = JSON.stringify({ date: "YYYY-MM-DD", hours: "X.XX", client: "ClientName", details: "TaskDetails" });

console.log("stringify output:", output);
console.log("parse output:", JSON.parse(output));