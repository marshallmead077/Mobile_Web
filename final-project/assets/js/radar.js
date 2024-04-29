document.getElementById('locationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    fetchRadar(location);
  });

  function fetchRadar(location) {
    // Use a geocoding service or weather API to fetch latitude and longitude coordinates for the location
    // Here, I'm assuming you have a function called getCoordinates(location) that returns an object with 'latitude' and 'longitude'

    // Once you have the coordinates, fetch the radar code from the NWS API
    const { latitude, longitude } = getCoordinates(location);
    const nwsApiUrl = `https://api.weather.gov/points/${latitude},${longitude}/`;
    fetch(nwsApiUrl)
      .then(response => response.json())
      .then(data => {
        const radarCode = data.properties.radarStation;
        const radarUrl = `https://radar.weather.gov/ridge/radar_lite.php?rid=${radarCode}&product=N0R&loop=yes`;
        displayRadar(radarUrl);
      })
      .catch(error => {
        console.error('Error fetching radar code:', error);
      });
  }

  function displayRadar(radarUrl) {
    const radarContainer = document.getElementById('radarContainer');
    radarContainer.innerHTML = `<iframe src="${radarUrl}" width="800" height="600" frameborder="0"></iframe>`;
  }

  function getCoordinates(location) {
    // Simulated function to get coordinates for the location
    // In real implementation, you would use a geocoding service or another weather API
    return {
      latitude: 'LATITUDE',
      longitude: 'LONGITUDE'
    };
  }