/**
 * SHIFT DATA PROCESSOR
 * Specifically handles the 2nd shift hourly breakdown.
 */
const ShiftProcessor = {
    // Indices for 2nd shift (assuming 11pm is index 0)
    // 3pm-4pm is index 16, through 10pm-11pm at index 23
    secondShiftRange: { start: 16, end: 23 },

    calculateDetailedFails(allRows) {
        let totalLeak = 0;
        let totalFlow = 0;
        let hoursWorked = 0;

        for (let i = this.secondShiftRange.start; i <= this.secondShiftRange.end; i++) {
            const rowData = allRows[i];
            
            if (rowData) {
                // If any data exists in this row, count it as an hour worked
                if (rowData.hasEntries) hoursWorked++;
                
                // Add the specific segment fails
                totalLeak += parseInt(rowData.leakCol) || 0;
                totalFlow += parseInt(rowData.flowCol) || 0;
            }
        }

        return { totalLeak, totalFlow, hoursWorked };
    }
};
