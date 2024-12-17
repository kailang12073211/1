// 删除原有的聊天相关代码，添加图片查看功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取模态框元素
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close-modal')[0];
    
    // 缩放相关变量
    let scale = 1;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    
    // 为所有照片添加双击事件监听
    document.querySelectorAll('.photo-item img').forEach(img => {
        img.addEventListener('dblclick', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            // 重置缩放和位置
            resetZoom();
        });
    });
    
    // 缩放功能
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const resetZoomBtn = document.getElementById('resetZoom');
    
    zoomIn.addEventListener('click', () => {
        scale *= 1.2;
        updateTransform();
    });
    
    zoomOut.addEventListener('click', () => {
        scale *= 0.8;
        if (scale < 0.5) scale = 0.5;
        updateTransform();
    });
    
    resetZoomBtn.addEventListener('click', resetZoom);
    
    // 鼠标滚轮缩放
    modalImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY;
        if (delta > 0) {
            scale *= 0.9;
            if (scale < 0.5) scale = 0.5;
        } else {
            scale *= 1.1;
        }
        updateTransform();
    });
    
    // 拖动功能
    modalImg.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
    
    function startDragging(e) {
        if (scale > 1) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            modalImg.style.cursor = 'grabbing';
        }
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    }
    
    function stopDragging() {
        isDragging = false;
        modalImg.style.cursor = 'grab';
    }
    
    function updateTransform() {
        modalImg.style.transform = `translate(calc(-50% + ${translateX}px), calc(-50% + ${translateY}px)) scale(${scale})`;
    }
    
    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        modalImg.style.transform = 'translate(-50%, -50%) scale(1)';
    }
    
    // 关闭模态框
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}); 