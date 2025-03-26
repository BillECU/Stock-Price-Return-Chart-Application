# Stock Price/Return Chart Application

This React application displays stock price or return data from a CSV file in an interactive line chart. Users can select a stock ticker and choose to view either price or return data. The chart is zoomable and displays data chronologically.

## Framework and Libraries

* **React:** Used for building the user interface.
* **Create React App:** Used to bootstrap the React project.
* **Chart.js and react-chartjs-2:** Used for rendering the line chart.
* **chartjs-plugin-zoom:** Used for enabling zoom functionality on the chart.
* **chartjs-adapter-date-fns:** Used for parsing and formatting date data in the chart.
* **date-fns:** Used as the date adapter for Chart.js.
* **papaparse:** Used for parsing CSV data.

**Total Time Spent:** Approximately 3 hours.

**Time Breakdown:**

* **1 hour:** Basic setup, CSV parsing, and chart rendering.
* **30 minutes:** Adding zoom functionality and date sorting.
* **45 minutes:** Implementing scroll wheel zooming and refactoring.
* **15 minutes:** Adding styling, and documentation.
* **30 minutes:** Testing and bug fixes.

## Setup and Commands

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Place CSV file:**
    * Place your CSV file named `data.csv` inside the `src/data` folder. The CSV file should have the following columns: `date`, `ticker`, `ret`, `price`.
3.  **Run the application:**
    ```bash
    npm start
    ```
4. **Install chartjs-plugin-zoom: (Needed for zoom in/out)**
    ```bash
    npm install chartjs-plugin-zoom
    ```
5. **Install date-fns and chartjs-adapter-date-fns: (Needed for zoom in/out)**
    ```bash
    npm install date-fns chartjs-adapter-date-fns
    ```

## Assumptions

* The CSV file is named `data.csv` and is located in the `src/data` folder.
* The CSV file has the following columns: `date`, `ticker`, `ret`, `price`.
* The `date` column contains dates in a format that `date-fns` can parse (ISO 8601, or a format specified in chart options).

## Extra Features and Technical Decisions

* Implemented date sorting for the chart data to ensure chronological display.
* Used `date-fns` and `chartjs-adapter-date-fns` for robust date handling in Chart.js.
* Used flexbox to make the chart expand to the full screen.
* Implemented scroll wheel zooming for intuitive chart interaction.

