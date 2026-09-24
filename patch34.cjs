const fs = require('fs');
let html = fs.readFileSync('profile.html', 'utf8');

const targetInteractions = `    // ドラッグでパン
    container.addEventListener('pointerdown', (e) => {
        isDragging = true;
        startDragX = e.clientX - translateX;
        startDragY = e.clientY - translateY;
    });
    window.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startDragX;
        translateY = e.clientY - startDragY;
        applySvgTransform();
    });
    window.addEventListener('pointerup', () => { isDragging = false; });
    window.addEventListener('pointerleave', () => { isDragging = false; });`;

const replacementInteractions = `    // タッチ＆マウス操作（パン＆ピンチズーム）
    let activePointers = new Map();
    let initialPinchDist = 0;
    let initialPinchZoom = 1;
    let initialPinchCenter = { x: 0, y: 0 };

    container.addEventListener('pointerdown', (e) => {
        activePointers.set(e.pointerId, e);
        if (activePointers.size === 2) {
            isDragging = false;
            isUserZoomed = true;
            const pts = Array.from(activePointers.values());
            initialPinchDist = Math.hypot(pts[0].clientX - pts[1].clientX, pts[0].clientY - pts[1].clientY);
            initialPinchZoom = currentZoom;
            const rect = container.getBoundingClientRect();
            initialPinchCenter = {
                x: ((pts[0].clientX + pts[1].clientX) / 2) - rect.left,
                y: ((pts[0].clientY + pts[1].clientY) / 2) - rect.top
            };
        } else if (activePointers.size === 1) {
            isDragging = true;
            startDragX = e.clientX - translateX;
            startDragY = e.clientY - translateY;
        }
    });

    window.addEventListener('pointermove', (e) => {
        if (activePointers.has(e.pointerId)) {
            activePointers.set(e.pointerId, e);
        }
        if (activePointers.size === 2) {
            e.preventDefault(); // ピンチ中のスクロール防止
            const pts = Array.from(activePointers.values());
            const newDist = Math.hypot(pts[0].clientX - pts[1].clientX, pts[0].clientY - pts[1].clientY);
            if (initialPinchDist > 0) {
                const oldZoom = currentZoom;
                currentZoom = initialPinchZoom * (newDist / initialPinchDist);
                currentZoom = Math.max(0.0001, Math.min(currentZoom, 10000));
                
                translateX = initialPinchCenter.x - (initialPinchCenter.x - translateX) * (currentZoom / oldZoom);
                translateY = initialPinchCenter.y - (initialPinchCenter.y - translateY) * (currentZoom / oldZoom);
                applySvgTransform();
            }
        } else if (isDragging && activePointers.size === 1) {
            e.preventDefault(); // ドラッグ中のスクロール防止
            translateX = e.clientX - startDragX;
            translateY = e.clientY - startDragY;
            applySvgTransform();
        }
    }, { passive: false });

    const handlePointerUp = (e) => {
        activePointers.delete(e.pointerId);
        if (activePointers.size < 2) {
            initialPinchDist = 0;
        }
        if (activePointers.size === 1) {
            const pt = Array.from(activePointers.values())[0];
            startDragX = pt.clientX - translateX;
            startDragY = pt.clientY - translateY;
            isDragging = true;
        } else if (activePointers.size === 0) {
            isDragging = false;
        }
    };

    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    window.addEventListener('pointerleave', handlePointerUp);`;

html = html.replace(targetInteractions, replacementInteractions);
fs.writeFileSync('profile.html', html);
console.log('Added pinch to zoom');
