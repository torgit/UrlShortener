import {IsUrl, IsOptional} from 'class-validator'
export class ShorteningUrlDto {
    @IsUrl()
    url: string;

    @IsOptional()
    requestedUrl?: string;
}