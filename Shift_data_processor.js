/**
 * SHIFT_DATA_PROCESSOR.JS
 * Purpose: Separates shift-specific metrics from 24-hour grand totals.
 */

const ShiftDataProcessor = {
    // 2nd Shift is Row 16 (3pm) to Row 23 (10pm)
    shiftRange: { start: 16, end: 23 },

    processSheet(ocrResults) {
        let shiftLeaks = 0;
        let shiftFlows = 0;
        let shiftHours = 0;

        // 1. Loop through all 24 rows, but only collect data for 2nd Shift
        ocrResults.rows.forEach((row, index) => {
            const isSecondShift = index >= this.shiftRange.start && index <= this.shiftRange.end;

            if (isSecondShift) {
                // Sum tallies for 2nd shift only
                shiftLeaks += row.leakTallies || 0;
                shiftFlows += row.flowTallies || 0;

                // If there is any production ink in this row, count the hour
                if (row.hasAnyData) {
                    shiftHours++;
                }
            }
        });

        // 2. Grab the 24-hour total for parts passed (Global)
        // This looks at the specific "Grand Total" coordinate identified by DataExtractor
        const totalPartsPassed24h = ocrResults.grandTotals.passed;

        return {
            leaks: shiftLeaks,
            flowFails: shiftFlows,
            hoursThisSheet: shiftHours,
            passed: totalPartsPassed24h // This is the 24hr number
        };
    }
};
