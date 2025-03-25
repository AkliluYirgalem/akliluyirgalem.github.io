---
title: "Live Quantization"
date: '2025-03-16'
---

{{< css "project/live-quantization/live-quantization.css" >}}
{{< js "project/live-quantization/live-quantization.js" >}}

<div class="description">
    <h2>Live Quantization: 
        <a href="https://github.com/AkliluYirgalem/live-quantization" target="_blank" rel="noopener">~source code</a>
    </h2> 
</div>

<div class="matrix-container">
    <div class="matrix">
        <div class="matrix-title">Original(float32)</div>
        <div class="type"> <button id="randomize">Randomize Matrices</button> </div>
        <table id="originalmatrix"></table>
    </div>  
    <div class="separator">→</div>
    <div class="matrix">
        <div class="matrix-title">Quantized(int8)</div>
        <div class="type">
            <select id="quanttype">
                <option value="absmax">Absolute Maximum Quantization</option>
                <option value="zeropoint">Zero-Point Quantization</option>
            </select>
        </div>
        <table id="quantizedmatrix"></table>
    </div>
    <div class="separator">→</div>
    <div class="matrix">
        <div class="matrix-title">Dequantized</div>
        <div class="error">Error(MSE): <span id="mse">0.0000</span></div>
        <table id="dequantizedmatrix"></table>
    </div>
</div>

<div class="explanation">
    <h3> What is Quantization? </h3>
    <p>
        Quantization is basically the process of reducing the number of bits used to represent a number, usually from float32 to int8.
    </p> 
    <h3> Formulas used </h3>
    <p>
        Absolute Maximum Quantization
        <div class="math">
        \begin{align*}
        \mathbf{X}_{\text{quant}} &= \text{round}\Biggl ( \frac{127}{\max|\mathbf{X}| + ε} \cdot \mathbf{X} \Biggr ) \\
        \mathbf{X}_{\text{dequant}} &= \frac{\max|\mathbf{X}|}{127} \cdot \mathbf{X}_{\text{quant}} \\
        \end{align*}
        </div>
        Zero-Point Quantization
        <div class="math">
        \begin{align*}
        \mathbf{X}_{\text{quant}} &= \text{round}\Biggl ( \frac{127}{\max|\mathbf{X}|} \cdot \mathbf{X} \Biggr ) \\
        \mathbf{X}_{\text{dequant}} &= \frac{\max|\mathbf{X}|}{127} \cdot \mathbf{X}_{\text{quant}} \\
        \end{align*}
        </div>
    </p>
    <div class="ref">
        <h3><p>Reference</p></h3>
        <ul>
            <li>
             <p>
                Labonne, Maxime. "<a href="https://mlabonne.github.io/blog/posts/Introduction_to_Weight_Quantization.html" target="_blank">Introduction to Weight Quantization</a>." <em>Maxime Labonne's Blog</em>, July 6, 2023.
            </p>
            </li>
        </ul>
    </div>
</div>
