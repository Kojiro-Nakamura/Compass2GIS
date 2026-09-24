const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewport({ width: 1000, height: 800 });
        
        await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/zoom-test.html', { waitUntil: 'networkidle0' });
        
        await page.screenshot({ path: 'zoom-before.png' });
        
        await page.click('#btnZoomIn');
        await page.click('#btnZoomIn');
        await page.click('#btnZoomIn');
        
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: 'zoom-after.png' });
        
        console.log('Screenshots taken');
        await browser.close();
    } catch (e) {
        console.error("SCRIPT ERROR:", e);
    }
})();
