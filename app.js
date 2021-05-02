document.getElementById('loan-form').addEventListener('submit', function(e){
    document.getElementById('results').style.display = 'none';

    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResult, 2000);

    e.preventDefault();
});

function calculateResult(){
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const roi = parseFloat(interest.value) /100 /12;
    const totalyears = parseFloat(years.value) * 12;

    const x = Math.pow(1+roi, totalyears);
    const monthly = (principal * x * roi) / (x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = monthly * totalyears.toFixed(2);
        totalInterest.value = ((monthly*totalyears) - principal).toFixed(2);

        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
    }

    else{
        showError('Please check your numbers');
        document.getElementById('loading').style.display = 'none';
        document.getElementById('hide').style.display = 'none';
    }
}

function showError(error){
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error))

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}