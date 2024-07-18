function calculateAge() {
    const birthdate = document.getElementById('birthdate').value;
    if (!birthdate) {
        alert("Please enter your birthdate");
        return;
    }

    const todayDate = new Date();
    const birthDate = new Date(birthdate);

    let years = todayDate.getFullYear() - birthDate.getFullYear();
    let months = todayDate.getMonth() - birthDate.getMonth();
    let days = todayDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    document.querySelector('.ans1').textContent = years;
    document.querySelector('.ans2').textContent = months;
    document.querySelector('.ans3').textContent = days;

    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    document.querySelector('.third-row').textContent =`On ${dayName[birthDate.getDay()]}`;
    console.log(birthDate.getDate());
    document.querySelector('.third-row').style.opacity = 1;
}