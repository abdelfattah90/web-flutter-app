const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000

// Serve static files with correct MIME types
app.use(
  express.static(__dirname, {
    index: false,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      } else if (filePath.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm')
      } else if (filePath.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
      }
    },
  })
)

// Serve index.html for all routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'index.html')

  // Check if file exists
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath)
  } else {
    res.status(404).send('index.html not found')
  }
})

// For Vercel serverless
if (process.env.VERCEL) {
  module.exports = app
} else {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}
