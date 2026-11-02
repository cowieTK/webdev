"use strict";
const testId = 1;
async function fetchDataAndDisplay() {
    try {
        const response = await fetch(`http://localhost:3000/test/${testId}`);
        const data = await response.json();
        console.log('Data get:', data);
        document.getElementById('display').textContent = data.title;
    }
    catch (error) {
        console.error('front shit itself:', error);
    }
}
fetchDataAndDisplay();
