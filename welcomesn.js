document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the player's name from the form
    const playerName = document.getElementById('playerName').value;

    // Store the player's name in localStorage
    localStorage.setItem('playerName', playerName);

    // Redirect to the game page
    window.location.href = 'Snakebite.html';
});
