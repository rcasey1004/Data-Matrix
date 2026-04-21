/**
 * INTEGRITY CHECKER
 * Compares the sum of the tallies to the written totals.
 */
const IntegrityChecker = {
    verify(hourlyData, summaryTotal) {
        const tallySum = hourlyData.reduce((sum, row) => sum + row.count, 0);
        
        if (tallySum === summaryTotal) {
            return { status: "PASS", message: "Data matches perfectly." };
        } else {
            return { 
                status: "FAIL", 
                message: `Discrepancy found! Tallies = ${tallySum}, Summary = ${summaryTotal}`,
                diff: tallySum - summaryTotal
            };
        }
    }
};
