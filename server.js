const http = require('http');

// 1. DATA: This would usually come from a database
const salesData = [
  { id: 1, item: "Keyboard", price: "$50", status: "Shipped" },
  { id: 2, item: "Monitor", price: "$200", status: "Pending" },
  { id: 3, item: "Mouse", price: "$25", status: "Delivered" }
];

// 2. SERVER LOGIC: Creating the server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // 3. HTML SYNTAX: Building the table rows dynamically from the data
  let tableRows = salesData.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.item}</td>
      <td>${order.price}</td>
      <td style="color: ${order.status === 'Pending' ? 'red' : 'green'}">${order.status}</td>
    </tr>
  `).join('');

  // 4. RESPONSE: Sending the full HTML page to the browser
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Server-Generated Table</title>
      <style>
        body { font-family: sans-serif; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #007bff; color: white; }
        tr:hover { background-color: #f5f5f5; }
      </style>
    </head>
    <body>
      <h1>Live Order Tracking</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Item</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </body>
    </html>
  `);
});

// 5. START: Listen on port 3000
server.listen(3000, () => {
  console.log('Server is live! View it at: http://localhost:3000');
});
