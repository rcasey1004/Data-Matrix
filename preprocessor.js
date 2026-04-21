/**
 * THE PREPROCESSOR
 * Goal: Transform a messy photo into a "digital-ready" print.
 */
const Preprocessor = {
    async process(imageSource) {
        const img = await this.loadImage(imageSource);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            // Calculate brightness (Luminance)
            const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
            
            // Apply Threshold: If it's darker than 128 (mid-gray), make it black.
            // Otherwise, make it pure white (255).
            const contrast = brightness < 128 ? 0 : 255;
            
            data[i] = data[i+1] = data[i+2] = contrast; 
        }

        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL(); // This is the "Printed" version
    },

    loadImage(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
        });
    }
};
