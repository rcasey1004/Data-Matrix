/**
 * DATA MODEL
 * Now supports multi-sheet accumulation.
 */
const ShiftReport = {
    sheetsScanned: 0,
    maxSheets: 3,
    
    // Running totals
    totals: {
        leaks: 0,
        flowFails: 0,
        retests: 0,
        passed: 0,
        hoursWorked: 0
    },

    // Method to add data from a new scan
    addSheetData(newData) {
        if (this.sheetsScanned < this.maxSheets) {
            this.totals.leaks += newData.leaks;
            this.totals.flowFails += newData.flowFails;
            this.totals.retests += newData.retests;
            this.totals.passed += newData.passed;
            this.totals.hoursWorked += newData.hoursWorked;
            
            this.sheetsScanned++;
            return true;
        }
        return false; // Limit reached
    },

    reset() {
        this.sheetsScanned = 0;
        this.totals = { leaks: 0, flowFails: 0, retests: 0, passed: 0, hoursWorked: 0 };
    }
};
