import path from "path";
import fs from 'fs';

export default function getImage(caminho: string): string | null {
    try {
        const filePath = path.join(__dirname, '..', '..', 'uploads', caminho)
        console.log(__dirname);
        const f = fs.readFileSync(filePath, { encoding: 'base64' });
        return f ?? null;
    } catch {
        return null
    }
}