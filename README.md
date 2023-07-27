# leaflet-challenge
![alt text](images/1-Logo.png)
### Dashboard
The leaflet-challenge dashboard can be found at: 
### Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations on issues facing our planet.

Solution Files Submitted:
- /images/1-Logo.png
- /images/2-BasicMap.png
- /images/3-Data.png
- /images/4-JSON.png
- /images/5-Advanced.png
- /images/6-Time_Keeps_On_Ticking.gif
- /images/Cluster.png
- /images/Heat.png
- /static/css/style.css
- /static/js/logic.js
  
Earthquake Visualization Map: 
The USGS provides earthquake data in a number of different formats, updated every 5 minutes.  The "All Earthquakes from the Past 7 Days" gives a JSON representation of that data. The URL used of this JSON to pull in the data for the visualization is: [https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

Using Leaflet, a map was created that plots all the earthquakes from the dataset based on their longitude and latitude.

- The data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color.
- Earthquakes with higher magnitudes are larger, and earthquakes with greater depth are darker in color.
- Popups are included that provide additional information about the earthquake when its associated marker is clicked.
- A legend was created that will provide context for your map data.

The visualization appears as follows:

![alt text](images/2-BasicMap.png)

### Part 2: Gather and Plot More Data

Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualize it alongside your original data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplatesLinks to an external site..

This part is completely optional; you can complete this part as a way to challenge yourself and boost your new skills.

The following image is an example screenshot of what you should produce:

5-Advanced

Perform the following tasks:

Plot the tectonic plates dataset on the map in addition to the earthquakes.

Add other base maps to choose from.

Put each dataset into separate overlays that can be turned on and off independently.

Add layer controls to your map.

Requirements
These requirements apply only to "Part 1: Create the Earthquake Visualization" as "Part 2" is optional with no extra points earning.

Map (60 points)
TileLayer loads without error (20 points)

Connects to geojson API using D3 without error (20 points)

Markers with size corresponding to earthquake magnitude (10 points)

A legend showing the depth and their corresponding color (10 points)

Data Points (40 points)
Data points scale with magnitude level (10 points)

Data points colors change with depth level (10 points)

Each point has a tooltip with the Magnitude, the location and depth (10 points)

All data points load in the correct locations (10 points)
