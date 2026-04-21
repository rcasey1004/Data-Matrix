/**
 * SHIFT DATA PROCESSOR
 * Logic to determine if an hour was actually worked.
 */
const ShiftDataProcessor = {
    calculateActiveHours(rows) {
        let activeCount = 0;

        rows.forEach(row => {
            // Check if any of the columns have data > 0
            const hasData = row.leaks > 0 || 
                            row.flowFails > 0 || 
                            row.retests > 0 || 
                            row.passed > 0;

            if (hasData) {
                activeCount++;
            }
        });

        return activeCount;
    },

    processSheet(ocrData) {
        // This is called for each individual sheet
        return {
            leaks: ocrData.totalLeaks,
            flowFails: ocrData.totalFlows,
            retests: ocrData.totalRetests,
            passed: ocrData.totalPassed,
            hoursThisSheet: this.calculateActiveHours(ocrData.rows)
        };
    }
};
