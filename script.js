document.addEventListener('DOMContentLoaded', function() {
    const colorSearch = document.getElementById('colorSearch');
    const colorPicker = document.getElementById('colorPicker');
    const selectedColorDisplay = document.getElementById('selectedColor');
    const colorBoxes = document.querySelectorAll('.color-box');

    // 創建全局提示元素
    const globalTooltip = document.createElement('div');
    globalTooltip.className = 'global-tooltip';
    globalTooltip.textContent = '複製成功';
    document.body.appendChild(globalTooltip);

    // 搜尋功能
    colorSearch.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        colorBoxes.forEach(box => {
            const colorName = box.querySelector('.color-name').textContent.toLowerCase();
            const colorCode = box.querySelector('.color-code').textContent.toLowerCase();
            
            if (colorName.includes(searchTerm) || colorCode.includes(searchTerm)) {
                box.style.display = '';
            } else {
                box.style.display = 'none';
            }
        });
    });

    // 顏色選擇器功能
    colorPicker.addEventListener('input', function(e) {
        const selectedColor = e.target.value;
        selectedColorDisplay.textContent = selectedColor.toUpperCase();
        
        let closestBox = null;
        let minDifference = Infinity;
        
        colorBoxes.forEach(box => {
            const boxColor = box.querySelector('.color-preview').style.backgroundColor;
            const difference = compareColors(selectedColor, rgbToHex(boxColor));
            
            if (difference < minDifference) {
                minDifference = difference;
                closestBox = box;
            }
            box.classList.remove('selected');
        });
        
        if (closestBox) {
            closestBox.classList.add('selected');
            closestBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // 複製功能
    colorBoxes.forEach(box => {
        box.addEventListener('click', async function() {
            const colorCode = this.querySelector('.color-code').textContent;
            let copyText = colorCode;
            
            if (colorCode.includes('/')) {
                copyText = colorCode.split('/')[0].trim();
            }
            
            try {
                await navigator.clipboard.writeText(copyText);
                
                // 重置任何現有的動畫
                globalTooltip.classList.remove('show');
                void globalTooltip.offsetWidth; // 強制重繪
                
                // 顯示提示
                globalTooltip.classList.add('show');
                
                // 設定定時器移除提示
                setTimeout(() => {
                    globalTooltip.classList.remove('show');
                }, 1500);
                
                // 更新選擇器顯示
                colorPicker.value = colorCode.includes('/') ? 
                    colorCode.split('/')[1].trim() : colorCode;
                selectedColorDisplay.textContent = copyText;
                
                // 更新選中狀態
                colorBoxes.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
            } catch (err) {
                console.error('複製失敗:', err);
            }
        });

        // 保持懸停效果
        box.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        box.addEventListener('mouseout', function() {
            this.style.transform = '';
        });
    });
});

function rgbToHex(rgb) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;
    
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(match[1]) + hex(match[2]) + hex(match[3]);
}

function compareColors(color1, color2) {
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);
    return Math.abs(c1 - c2);
} 