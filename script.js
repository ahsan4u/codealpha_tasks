// function calculateAge() {
//     const birthdate = document.getElementById('birthdate').value;
//     if (!birthdate) {
//         alert("Please enter your birthdate");
//         return;
//     }

//     const todayDate = new Date();
//     const birthDate = new Date(birthdate);

//     let years = todayDate.getFullYear() - birthDate.getFullYear();
//     let months = todayDate.getMonth() - birthDate.getMonth();
//     let days = todayDate.getDate() - birthDate.getDate();

//     if (days < 0) {
//         months--;
//         days += new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate();
//     }

//     if (months < 0) {
//         years -= 1;
//         months += 12;
//     }

//     document.querySelector('.ans1').textContent = years;
//     document.querySelector('.ans2').textContent = months;
//     document.querySelector('.ans3').textContent = days;

//     const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
//     document.querySelector('.third-row').textContent =`On ${dayName[birthDate.getDay()]}`;
//     console.log(birthDate.getDate());
//     document.querySelector('.third-row').style.opacity = 1;
// }



function calculateNetPnL(buyPrice, sellPrice, lots = 1, lotSize = 50) {
    const totalQty = lotSize * lots;
    const turnover = (buyPrice + sellPrice) * totalQty;
    const grossPnL = (sellPrice - buyPrice) * totalQty;
  
    // Zerodha Charges
    const brokerage = (20 + 20) * lots; // ₹20 per leg per lot
    const stt = 0.000625 * sellPrice * totalQty; // On sell side only
    const exchangeCharges = 0.00053 * turnover;
    const sebiCharges = 10 / 1e7 * turnover; // ₹10 per crore
    const stampDuty = 0.00003 * buyPrice * totalQty; // On buy side only
    const gst = 0.18 * (brokerage + exchangeCharges); // On brokerage + exchange charges
  
    const totalCharges = brokerage + stt + exchangeCharges + sebiCharges + stampDuty + gst;
    const netPnL = grossPnL - totalCharges;
  
    return {
      lots,
      lotSize,
      totalQty,
      grossPnL: grossPnL.toFixed(2),
      totalCharges: totalCharges.toFixed(2),
      netPnL: netPnL.toFixed(2),
      result: netPnL >= 0 ? "Profit" : "Loss"
    };
  }

  function getCharge() {
    const lotSize = document.getElementById('lot');
    const lots = document.getElementById('lots');
    const buyPrice = document.getElementById('cp');
    const sellPrice = document.getElementById('sp');

    const data = calculateNetPnL(Number(buyPrice.value), Number(sellPrice.value), Number(lots.value), Number(lotSize.value));

    document.getElementById('totalCharge').textContent = data.totalCharges;
    document.getElementById('netPnL').textContent = data.netPnL;
    document.getElementById('result').textContent = data.result;
  }