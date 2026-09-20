const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    
    await page.goto('http://localhost:4174/');
    await new Promise(r => setTimeout(r, 1000));
    
    console.log('Switching to Map View...');
    await page.click('#btnToggleMap');
    await new Promise(r => setTimeout(r, 1000));
    
    console.log('Injecting dummy line...');
    await page.evaluate(() => {
        const app = window.app;
        app.state.annotations.lines.push({
            type: 'line',
            points: [
                {x: 0, y: 0, baseX: 0, baseY: 0},
                {x: 10, y: 10, baseX: 10, baseY: 10}
            ],
            color: '#000',
            lineWidth: 3
        });
        app.updateMapDrawing(false);
    });
    
    await new Promise(r => setTimeout(r, 500));
    
    console.log('Switching to select mode...');
    await page.click('#btnSelect');
    await new Promise(r => setTimeout(r, 500));
    
    const center = await page.evaluate(() => {
        const line = window.app.state.annotations.lines[0];
        const cx = 5; const cy = 5;
        const latLng = window.app._getRotLatLng({x: cx, y: cy}, cx, cy, 0);
        const pt = window.app.map.latLngToContainerPoint(latLng);
        const rect = window.app.els.mapContainer.getBoundingClientRect();
        return { x: pt.x + rect.left, y: pt.y + rect.top };
    });
    
    console.log('Clicking on the line at', center);
    await page.mouse.move(center.x, center.y);
    await page.mouse.down();
    await new Promise(r => setTimeout(r, 100));
    
    console.log('Dragging...');
    await page.mouse.move(center.x + 50, center.y + 50, { steps: 10 });
    await new Promise(r => setTimeout(r, 100));
    
    console.log('Mouse up...');
    await page.mouse.up();
    
    const newCoords = await page.evaluate(() => {
        return window.app.state.annotations.lines[0].points;
    });
    console.log('New coords:', JSON.stringify(newCoords));
    
    console.log('Testing scale handle...');
    const handleCoords = await page.evaluate(() => {
        const handle = document.querySelector('.map-scale-handle');
        if (!handle) return null;
        const rect = handle.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });
    
    if (handleCoords) {
        console.log('Clicking scale handle at', handleCoords);
        await page.mouse.move(handleCoords.x, handleCoords.y);
        await page.mouse.down();
        await new Promise(r => setTimeout(r, 100));
        
        console.log('Dragging scale handle...');
        await page.mouse.move(handleCoords.x + 50, handleCoords.y + 50, { steps: 10 });
        await page.mouse.up();
        
        const scaledCoords = await page.evaluate(() => {
            return window.app.state.annotations.lines[0].points;
        });
        console.log('Scaled coords:', JSON.stringify(scaledCoords));
    } else {
        console.log('Scale handle not found!');
    }
    
    await browser.close();
})();
