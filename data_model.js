/**
 * DATA_MODEL.JS
 * Purpose: Manages the cumulative state of the scanning session.
 */

const ShiftReport = {
    // Session metadata
    sheetsScanned: 0,
    maxSheets: 3,
    shiftName: "Second Shift",

    // This object holds the SUM of all scanned sheets
    totals: {
        leaks: 0,
        flowFails: 0,
        passed: 0,
        hoursWorked: 0
    },

    /**
     * Adds data from a single sheet to the session totals.
     * @param {Object} newData - The object containing data from one scan.
     */
    addSheetData(newData) {
        if (this.sheetsScanned < this.maxSheets) {
            // Summing the production metrics
            this.totals.leaks += parseInt(newData.leaks) || 0;
            this.totals.flowFails += parseInt(newData.flowFails) || 0;
            this.totals.passed += parseInt(newData.passed) || 0;
            
            // Adding the calculated active hours from this specific document
            this.totals.hoursWorked += parseInt(newData.hoursThisSheet) || 0;

            // Increment the counter
            this.sheetsScanned++;
            
            console.log(`Sheet ${this.sheetsScanned} added successfully.`);
            return true;
        } else {
            console.error("Session Limit Reached: Cannot add more than 3 sheets.");
            return false;
        }
    },

    /**
     * Resets the model for a brand new shift.
     */
    reset() {
        this.sheetsScanned = 0;
        this.totals = {
            leaks: 0,
            flowFails: 0,
            passed: 0,
            hoursWorked: 0
        };
        console.log("Session reset. Ready for new scans.");
    },

    /**
     * Prepares the final data for export or display.
     */
    getFinalReport() {
        return {
            title: `${this.shiftName} - Final Production Report`,
            date: new Date().toLocaleDateString(),
            totalSheets: this.sheetsScanned,
            data: this.totals
        };
    }
};

// If using this in a browser environment, ShiftReport is now globally available.
