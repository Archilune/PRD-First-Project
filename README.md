# Smart Canteen Locator & Capacity Management System

This system provides a seamless dining experience by leveraging **Geospatial QR-Tagging** to optimize canteen utilization. Instead of complex hardware sensors, the system uses physical QR Code checkpoints as IoT nodes to determine user proximity and automate crowd telemetry.

### How It Works
1. **Geospatial Identification**: Users scan a unique QR Code at specific campus locations. The system identifies the user's current "Geosphere" based on the QR ID.
2. **Proximity Sorting**: The web interface automatically sorts and displays a list of canteens (Kantin A - F) based on their proximity to the scanned QR location.
3. **Capacity Tracking (Self-Reporting Telemetry)**: Upon selecting a payment method, the system registers a "Seat Occupied" event. This data is aggregated in real-time to generate a "Busyness Dashboard," allowing users to see which canteens are full or available.
4. **Data Integration**: All interactions are synced with the backend to provide a transparent, live map of campus facility utilization.