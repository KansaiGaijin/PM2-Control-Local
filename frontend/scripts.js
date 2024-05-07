document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const statusMessage = document.getElementById('statusMessage');

    // Function to handle starting the Foundry server
    startButton.addEventListener('click', function() {
        fetch('/startFoundry', { method: 'POST' })
            .then(response => response.text())
            .then(message => {
                statusMessage.textContent = message;
            })
            .catch(error => {
                console.error('Error:', error);
                statusMessage.textContent = 'Error starting Foundry server';
            });
    });

    // Function to handle stopping the Foundry server
    stopButton.addEventListener('click', function() {
        fetch('/stopFoundry', { method: 'POST' })
            .then(response => response.text())
            .then(message => {
                statusMessage.textContent = message;
            })
            .catch(error => {
                console.error('Error:', error);
                statusMessage.textContent = 'Error stopping Foundry server';
            });
    });
});
