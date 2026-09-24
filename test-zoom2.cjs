const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/profile.html', { waitUntil: 'networkidle0' });

        await page.evaluate(() => {
            const testTsv = '測点\\tターゲット\\t方位角\\t高低角\\t斜距離\\n1\\t2\\t90\\t0\\t100';
            localStorage.setItem('compassProfileData', testTsv);
        });
        await page.reload({ waitUntil: 'networkidle0' });
        
        // Wait 1 second to ensure processing is done
        await page.waitForTimeout(1000);

        await page.evaluate(() => {
            console.log('Clicking button...');
            document.getElementById('btnZoomIn').click();
            console.log('Button clicked.');
            setTimeout(() => {
                const el = document.getElementById('debugInfo');
                if (el) console.log('DEBUG TEXT:', el.innerText);
                else console.log('NO DEBUG INFO');
            }, 100);
        });

        await page.waitForTimeout(1000);
        await browser.close();
    } catch (e) {
        console.error("SCRIPT ERROR:", e);
    }
})();
