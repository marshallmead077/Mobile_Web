$(document).ready(function() {
    var rssFeedUrl = "https://moxie.foxweather.com/google-publisher/extreme-weather.xml";
  
     // Function to fetch and display RSS feed
     function fetchAndDisplayRSSFeed() {
        $.ajax({
          url: rssFeedUrl,
          dataType: "xml",
          success: function(data) {
            var $xml = $(data);
            var items = $xml.find("item");
    
            // Clear existing news items
            $("#fox-weather-news").empty();
    
            // Display each news item
            items.each(function() {
              var title = $(this).find("title").text();
              var link = $(this).find("link").text();
    
              var newsItem = $("<div>").addClass("news-item");
              var titleElement = $("<h2>").text(title);
              var linkElement = $("<a>").attr("href", link).attr("target", "_blank").text("Read more");
    
              newsItem.append(titleElement).append(linkElement);
              $("#fox-weather-news").append(newsItem);
            });
          },
          error: function(xhr, status, error) {
            console.error("Error fetching RSS feed:", error);
          }
        });
      }
    
      // Fetch and display RSS feed initially
      fetchAndDisplayRSSFeed();
    
      // Update RSS feed every 5 minutes
      setInterval(fetchAndDisplayRSSFeed, 5 * 60 * 1000); // 5 minutes in milliseconds
    });