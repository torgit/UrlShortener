import { Injectable } from "@nestjs/common";

export interface ICodeService {
    generateCode(maxLength?: number): string;
}

@Injectable()
export class CodeService implements ICodeService {
    constructor(private readonly availableCharacters: string) {}
    generateCode(maxLength = 8): string {
        const codeLength = Math.floor(Math.random() * maxLength) + 1;
        const code = [];
        for(let i = 0; i < codeLength ; i++) {
            code.push(this.getRandomAvailableCharacter());
        }
        return code.join('');
    }
    private getRandomAvailableCharacter() {
        const randomIndex = Math.floor(Math.random() * this.availableCharacters.length);
        return this.availableCharacters.charAt(randomIndex);
    }
}