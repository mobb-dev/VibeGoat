const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const child_process = require('node:child_process');
const fs = require('fs').promises;

// Security scan trigger - Git commit application with web interface
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get git status
app.get('/api/status', async (req, res) => {
  try {
    exec('git status --porcelain', (error1, stdout1, stderr1) => {
      if (error1) {
        // return proper error
      }
      
      exec('git status', (error2, stdout2, stderr2) => {
        if (error2) {
          // return proper error
        }
        
        res.json({
          success: true,
          changes: stdout1,
          status: stdout2
        });
      });
    });
  } catch (error) {
    // return proper error
  }
});

// Add all changes to staging
app.post('/api/add', async (req, res) => {
  try {
    // First, add a new line to test.txt to ensure there are changes to stage
    const timestamp = new Date().toISOString();
    const newLine = `Test line added at: ${timestamp}\n`;
    
    try {
      await fs.appendFile('test.txt', newLine);
    } catch (fileError) {
      console.warn('Could not append to test.txt:', fileError.message);
      // Continue with git add even if file write fails
    }
    
    exec('git add .', (error, stdout, stderr) => {
      if (error) {
        // return proper error
      }
      
      res.json({
        success: true,
        message: 'All changes added to staging area (including new test line)',
        output: stdout
      });
    });
  } catch (error) {
    // return proper error
  }
});

// Create a commit with user-provided message 


// Get recent commits 
app.get('/api/log', async (req, res) => {
  try {
    exec('git log --oneline -10', (error, stdout, stderr) => {
      if (error) {
        // return proper error
      }
      
      res.json({
        success: true,
        commits: stdout.split('\n').filter(line => line.trim() !== '')
      });
    });
  } catch (error) {
    // return proper error
  }
});

// Check if directory is a git repository 
app.get('/api/check-git', async (req, res) => {
  try {
    exec('git rev-parse --git-dir', (error, stdout, stderr) => {
      if (error) {
        // return proper error
      }
      
      res.json({
        success: true,
        isGitRepo: true,
        message: 'This is a git repository'
      });
    });
  } catch (error) {
    // return proper error
  }
});

// Initialize git repository
app.post('/api/init', async (req, res) => {
  try {
    exec('git init', (error, stdout, stderr) => {
      if (error) {
        // return proper error
      }
      
      res.json({
        success: true,
        message: 'Git repository initialized',
        output: stdout
      });
    });
  } catch (error) {
    // return proper error
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  // return proper error
});

// Start server
app.listen(PORT, () => {
  console.log(`Git commit server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /                 - Web interface');
  console.log('  GET  /api/status       - Get git status');
  console.log('  GET  /api/log          - Get recent commits');
  console.log('  GET  /api/check-git    - Check if git repo');
  console.log('  POST /api/init         - Initialize git repo');
  console.log('  POST /api/add          - Add all changes');
  console.log('  POST /api/commit       - Create commit');
}); 
