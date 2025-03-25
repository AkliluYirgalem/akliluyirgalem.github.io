
document.addEventListener('DOMContentLoaded', function() {
    const size = 4;
    const originalMatrix = createMatrix('originalmatrix', size, true);
    const quantizedMatrix = createMatrix('quantizedmatrix', size, false);
    const dequantizedMatrix  = createMatrix('dequantizedmatrix', size, false);
    let absMax = -Infinity;
    let min = Infinity;
    let max = -Infinity;
    
    initializeMatrices(0);
    applyTransformation("absmax", false);
    let dropdown = document.getElementById('quanttype');
    
    document.getElementById('randomize').addEventListener('click', function() {
        let value = dropdown.options[dropdown.selectedIndex].value;
        applyTransformation(value, true);
    });
    
    document.getElementById('quanttype').addEventListener('change', function() {
        let type = dropdown.options[dropdown.selectedIndex].value;
        applyTransformation(type, false);
    });
    
    function createMatrix(id, size, isInput) {
        const table = document.getElementById(id);
        table.innerHTML = '';
        
        for (let i = 0; i < size; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < size; j++) {
                const cell = document.createElement('td');
                if (isInput) {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.step = "0.01";
                    input.dataset.row = i;
                    input.dataset.col = j;
                    input.addEventListener('input', function() {
                        applyTransformation("absmax", false);
                    });
                    cell.appendChild(input);
                } else {
                    cell.classList.add('result-cell');
                    cell.dataset.row = i;
                    cell.dataset.col = j;
                }
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        return table;
    }
    
    function initializeMatrices(mode) {
        const originalInputs = originalMatrix.querySelectorAll('input');
        originalInputs.forEach(input => {
            input.value = mode === 0 ? 0 : (Math.random() * 200 - 100).toFixed(2); //[-100, 100]            
        });
        updateResultMatrix(0);
    }

    function applyTransformation(type, randomize) {
        if(randomize)
            initializeMatrices(1);
        const originalMatrixValue = getMatrixValues(originalMatrix);
        const [quantizedValue, dequantizedValue]  = quantDequant(originalMatrixValue, type);
        updateResultMatrix(quantizedValue, dequantizedValue);
        calculateError(originalMatrixValue, dequantizedValue);
    }

    function getMatrixValues(matrixElement) {
        absMax = -Infinity;
        min = Infinity;
        max = -Infinity;
        const values = [];
        for (let i = 0; i < size; i++) {
            values[i] = [];
            for (let j = 0; j < size; j++) {
                const input = matrixElement.querySelector(`input[data-row="${i}"][data-col="${j}"]`);
                values[i][j] = parseFloat(input.value) || 0;
                absMax = parseFloat(Math.abs(values[i][j])) > parseFloat(absMax) ?  Math.abs(values[i][j]): absMax;
                max = values[i][j] > max ? values[i][j]: max;
                min = values[i][j] < min ? values[i][j]: min;
            }
        }
        return values;
    }
    
    function quantDequant(originalMatrix, type) {
        const result = [[], []];
        for (let i = 0; i < size; i++) {
            result[0][i] = [];
            result[1][i] = [];
            for (let j = 0; j < size; j++) {
                if(type == "absmax"){
                    let scale = 127/(absMax+1e-06);
                    result[0][i][j] = Math.round(scale * originalMatrix[i][j]); //quantization
                    result[1][i][j] = result[0][i][j] / scale; //dequantization
                }else{
                    let range = max === min ? 1: max-min;
                    let scale = 255 / range;
                    let zeropoint = -Math.round(scale * min) - 128;
                    result[0][i][j] = Math.round(scale * originalMatrix[i][j] + zeropoint); //quantization
                    result[1][i][j] = (result[0][i][j] - zeropoint)/scale; //dequantization
                }
            }
        }
        return [result[0], result[1]];
    }
            
    function updateResultMatrix(quantizedValue, dequantizedValue) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = quantizedMatrix.querySelector(`td[data-row="${i}"][data-col="${j}"]`);
                cell.textContent = quantizedValue === 0 ? 0 : quantizedValue[i][j].toFixed(1).replace(/\.0$/, '');

                const cell2 = dequantizedMatrix.querySelector(`td[data-row="${i}"][data-col="${j}"]`);
                cell2.textContent = quantizedValue === 0 ? 0 : dequantizedValue[i][j].toFixed(2).replace(/\.0$/, '');
            }
        }
    }

    function calculateError(originalMatrixValue, dequantizedValue){
        let error = 0;
        for (const [rowIndex, oRow] of originalMatrixValue.entries()){
            const dqRow = dequantizedValue[rowIndex];
            for (const [colIndex, oValue] of oRow.entries()) {
                const dqValue = dqRow[colIndex]
                error += (oValue - dqValue) * (oValue - dqValue);
            }
        }
        error = error/16;
        document.getElementById('mse').textContent = error.toFixed(4);
    }
});