import { Injectable, NotFoundException, Inject, Logger, ForbiddenException } from "@nestjs/common";
import { ShorteningUrlDto } from "./dtos/shortening-url.dto";
import { Url } from "./url.entity";
import {UrlRepository} from './url.repository';
import { ICodeService, CodeService } from "../code/code.service";

export interface IUrlService {
    shorteningUrl(shorteningUrlDto: ShorteningUrlDto): Promise<Url>
    getUrl(id: string): Promise<Url>
    getUrls(): Promise<Url[]>
}

@Injectable()
export class UrlService implements IUrlService {
    constructor(
        private readonly urlRepository: UrlRepository,
        @Inject(CodeService)
        private readonly codeService: ICodeService,
    ) {}

    async shorteningUrl(shorteningUrlDto: ShorteningUrlDto): Promise<Url> {
        const id = shorteningUrlDto.requestedUrl 
            ? shorteningUrlDto.requestedUrl 
            : this.codeService.generateCode();
        const url = this.urlRepository.create({id, url: shorteningUrlDto.url});
        const saved = await this.urlRepository.save(url)
            .catch(e => {
                console.error(e);
                if (shorteningUrlDto.requestedUrl) 
                    throw new ForbiddenException(`Duplicate requestedUrl = ${shorteningUrlDto.requestedUrl}`);
                return this.shorteningUrl(shorteningUrlDto);
            });
        return saved;
    }
    async getUrl(id: string): Promise<Url> {
        const url = await this.urlRepository.findOne({ id });
        if (!url) throw new NotFoundException()
        return url;
    }
    async getUrls(): Promise<Url[]> {
        return this.urlRepository.find();
    }
}