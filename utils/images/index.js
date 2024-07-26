import sharp from 'sharp';
import fs from 'fs';
const sprite = {
    base: 48
}
const subfolder = 'outfits';
fs.readdir(`files/${subfolder}`, (e, files) => {
    files.forEach(async (f, i) => {
        const file = `files/${subfolder}/${f}`;
        const image = sharp(file);

        const right = await image.clone().extract({ left: 0, top: sprite.base * 2, width: sprite.base * 6, height: sprite.base * 2 }).toBuffer()
        const up = await image.clone().extract({ left: sprite.base * 6, top: sprite.base * 2, width: sprite.base * 6, height: sprite.base * 2 }).toBuffer()
        const left = await image.clone().extract({ left: sprite.base * 12, top: sprite.base * 2, width: sprite.base * 6, height: sprite.base * 2 }).toBuffer()
        const down = await image.clone().extract({ left: sprite.base * 18, top: sprite.base * 2, width: sprite.base * 6, height: sprite.base * 2 }).toBuffer()

        const rightW = await image.clone().extract({ left: 0, top: sprite.base * 4, width: sprite.base * 6, height: sprite.base * 2 }).toBuffer()
        const upW = await image.clone().extract({ left: sprite.base * 6, top: sprite.base * 4, width: sprite.base * 6, height: sprite.base * 2 }).toBuffer()
        const leftW = await image.clone().extract({ left: sprite.base * 12, top: sprite.base * 4, width: sprite.base * 6, height: sprite.base * 2 }).toBuffer()
        const downW = await image.clone().extract({ left: sprite.base * 18, top: sprite.base * 4, width: sprite.base * 6, height: sprite.base * 2 }).toBuffer()

        await sharp({ create: { width: sprite.base * 6, height: sprite.base * 16, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } } })
            .png()
            .composite([
                //Base sprite
                { input: down, left: 0, top: 0 },
                { input: up, left: 0, top: sprite.base * 2 },
                { input: left, left: 0, top: sprite.base * 4 },
                { input: right, left: 0, top: sprite.base * 6 },
                //Walking animation
                { input: downW, left: 0, top: sprite.base * 8 },
                { input: upW, left: 0, top: sprite.base * 10 },
                { input: leftW, left: 0, top: sprite.base * 12 },
                { input: rightW, left: 0, top: sprite.base * 14 }
            ]).toFile(`out/${subfolder}/${i}.png`);
    });
});