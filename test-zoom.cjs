const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

        await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/profile.html', { waitUntil: 'networkidle0' });

        await page.evaluate(() => {
            const testTsv = '測点\\tターゲット\\t方位角\\t高低角\\t斜距離\\n1\\t2\\t90\\t0\\t100';
            localStorage.setItem('compassProfileData', testTsv);
        });
        await page.reload({ waitUntil: 'networkidle0' });

        await page.click('#btnZoomIn');
        
        const debugText = await page.$eval('#debugInfo', el => el.innerText);
        console.log('Debug text after zoom in:', debugText);
        
        await browser.close();
    } catch (e) {
        console.error("SCRIPT ERROR:", e);
    }
})();
