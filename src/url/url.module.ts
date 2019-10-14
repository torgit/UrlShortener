import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { CodeModule } from '../code/code.module';
import { UrlService } from './url.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlRepository } from './url.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UrlRepository]),
        CodeModule
    ],
    providers: [UrlService],
    controllers: [UrlController],
})
export class UrlModule {}
