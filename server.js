const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
app.use(require('cors')());

app.get('/avatar/:username', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(`https://www.tiktok.com/@${req.params.username}`);
    const avatar = await page.$eval('img[class*="Avatar"]', img => img.src).catch(() => null);
    await browser.close();
    res.json({ avatar: avatar || 'Not found' });
  } catch (e) {
    res.json({ avatar: 'Error' });
  }
});

app.listen(process.env.PORT || 3000);