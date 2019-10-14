import { Controller, Post, Body, Inject, Get, Param, Res } from "@nestjs/common";
import { ShorteningUrlDto } from "./dtos/shortening-url.dto";
import { UrlService, IUrlService } from "./url.service";
import * as express from 'express';
import { Url } from "./url.entity";

@Controller('urls')
export class UrlController {
    constructor(
        @Inject(UrlService)
        private readonly urlService: IUrlService
    ) {}

    @Get()
    async getUrls() {
        const urls = await this.urlService.getUrls()
        return {
            data: urls.map(this.includeShortenedUrl)
        }
    }

    @Get(':shortenedUrl')
    async getUrl(@Param('shortenedUrl') shortenedUrl, @Res() response: express.Response) {
        const urlParts = shortenedUrl.split('/');
        const { url } = await this.urlService.getUrl(urlParts[urlParts.length - 1]);
        return response.redirect(this.createRedirectUrl(url));
    }

    @Post()
    async shortening(@Body() shorteningUrlDto: ShorteningUrlDto) {
        const shortenedUrl = await this.urlService.shorteningUrl(shorteningUrlDto);
        return {
            data: shortenedUrl
        };
    }

    private createRedirectUrl(url: string): string {
        if (url.includes('http://') || url.includes('https://')) return url
        else return `http://${url}`
    }

    private includeShortenedUrl(url: Url) {
        return {
            ...url,
            shortenedUrl: `${process.env.HOST}/urls/${url.id}`
        }
    }
}