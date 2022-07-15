import path from "path";
import fs from 'fs';

export default function getImage(caminho: string): string {
    try {
        const filePath = path.join(__dirname, '..', '..', 'uploads', caminho)
        console.log(__dirname);
        const f = fs.readFileSync(filePath, { encoding: 'base64' });
        return `data:image/png;base64, ${f}` ?? '';
    } catch {
        return ''
    }
}