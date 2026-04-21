/**
 * TALLY COUNTER MODULE
 * Analyzes a "slice" of the image to count hash marks.
 */
const TallyCounter = {
    countMarks(cellImage) {
        // 1. Detect individual 'blobs' (the lines)
        const blobs = this.detectBlobs(cellImage);
        
        let total = 0;
        blobs.forEach(blob => {
            // If the blob is wide and slanted, it's likely the "5" diagonal
            if (this.isDiagonal(blob)) {
                total += 5; 
            } else {
                // Otherwise, it's a single tally mark
                total += 1;
            }
        });
        
        // Note: Some systems count the 4 vertical lines + 1 diagonal 
        // We need to ensure we don't double-count the 4 lines 'under' the diagonal.
        return total;
    },

    isDiagonal(blob) {
        const ratio = blob.width / blob.height;
        // A diagonal line across 4 tallies will be much wider than a single mark
        return ratio > 1.2; 
    }
};
