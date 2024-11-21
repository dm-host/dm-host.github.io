document.addEventListener('DOMContentLoaded', function() {
    const colorSearch = document.getElementById('colorSearch');
    const colorPicker = document.getElementById('colorPicker');
    const selectedColorDisplay = document.getElementById('selectedColor');
    const colorBoxes = document.querySelectorAll('.color-box');

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
        const tooltip = document.createElement('div');
        tooltip.className = 'copy-tooltip';
        tooltip.textContent = '已複製！';
        box.appendChild(tooltip);

        box.addEventListener('click', async function() {
            const colorCode = this.querySelector('.color-code').textContent;
            let copyText = colorCode;
            
            // 如果包含 " / "，只複製短代碼
            if (colorCode.includes('/')) {
                copyText = colorCode.split('/')[0].trim();
            }
            
            try {
                await navigator.clipboard.writeText(copyText);
                tooltip.classList.add('show');
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 1000);
                
                colorPicker.value = colorCode.includes('/') ? 
                    colorCode.split('/')[1].trim() : colorCode;
                selectedColorDisplay.textContent = copyText;
                
                colorBoxes.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
            } catch (err) {
                console.error('複製失敗:', err);
            }
        });

        // 添加懸停效果
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