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
        
        // 尋找最接近的顏色並標記
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

    // 點擊顏色方塊
    colorBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const colorCode = this.querySelector('.color-code').textContent;
            colorPicker.value = colorCode;
            selectedColorDisplay.textContent = colorCode;
            
            colorBoxes.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});

// 輔助函數
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