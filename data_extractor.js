/**
 * DATA EXTRACTOR
 * Targets specific summary boxes and the footer totals.
 */
const DataExtractor = {
    extract(ocrText) {
        return {
            // Find the 2nd shift summary block
            secondShift: {
                retests: this.findValueNextTo(ocrText, "2nd Shift Retests"),
                failures: this.findValueNextTo(ocrText, "2nd Shift Failures"),
                passing: this.findValueNextTo(ocrText, "2nd Shift Pass"),
                total: this.findValueNextTo(ocrText, "2nd Shift Total")
            },
            // Find the absolute totals at the bottom
            grandTotals: {
                leakFails: this.findValueNextTo(ocrText, "Total Leak"),
                flowFails: this.findValueNextTo(ocrText, "Total Flow"),
                grandTotalParts: this.findValueNextTo(ocrText, "Grand Total")
            }
        };
    },

    /**
     * Helper to find a number following a specific label
     */
    findValueNextTo(text, label) {
        // This Regex looks for the label, ignores case, 
        // skips any symbols/spaces, and grabs the number.
        const regex = new RegExp(`${label}[\\s\\W]+(\\d+)`, 'i');
        const match = text.match(regex);
        return match ? parseInt(match[1]) : 0;
    }
};
