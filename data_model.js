/**
 * THE DATA MODEL
 * This object will hold the final results for your shift report.
 */
const dailyReport = {
    shift: "Second",
    hoursWorked: 0,
    metrics: {
        leaks: 0,      // Summed from Zone 3
        flowFails: 0,  // Summed from Zone 4
        retests: 0,    // From Summary Box
        passed: 0      // From Summary Box
    },
    grandTotals: {
        dailyLeaks: 0, // From Page Footer
        dailyFlows: 0  // From Page Footer
    }
};
