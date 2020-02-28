import 'colors';
import { append } from 'fs-jetpack';

export function Log(log: string, file: string, toConsole: boolean = true) {
    if (toConsole) {
        console.log(log);
    }
    append(file, log);
}
