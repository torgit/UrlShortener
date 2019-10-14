import { Module, Provider } from '@nestjs/common';
import { CodeService } from './code.service';

const codeServiceProvider: Provider = {
    provide: CodeService,
    useValue: new CodeService('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')
}
@Module({
    providers: [codeServiceProvider],
    exports: [codeServiceProvider]
})
export class CodeModule {}
